/**
 * /api/refine — Streaming chat refinement endpoint.
 *
 * Accepts the current prompt + user messages (UIMessage format),
 * converts them to model messages, injects the refine system prompt,
 * and streams the AI response back via UI message stream.
 */

import { createGroq } from "@ai-sdk/groq";
import { streamText, UIMessage, convertToModelMessages } from "ai";
import { REFINE_SYSTEM_PROMPT } from "@/lib/system-prompts";

// Initialize the Groq provider
const groq = createGroq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(request: Request) {
    try {
        const { messages, currentPrompt } = await request.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(
                JSON.stringify({ error: "Messages are required." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Extract text from the last user message (UIMessage format uses parts)
        const lastUserMsg = [...messages]
            .reverse()
            .find((m: UIMessage) => m.role === "user");

        const lastUserText = lastUserMsg?.parts
            ?.filter((p: { type: string }) => p.type === "text")
            .map((p: { type: string; text: string }) => p.text)
            .join("") || "";

        // Build the system prompt with current context injected
        const systemPrompt = REFINE_SYSTEM_PROMPT
            .replace("{{CURRENT_PROMPT}}", currentPrompt || "")
            .replace("{{USER_MESSAGE}}", lastUserText);

        // Convert UIMessages to model messages for the AI SDK
        const modelMessages = await convertToModelMessages(messages);

        // Stream the response using Vercel AI SDK
        const result = streamText({
            model: groq("llama-3.3-70b-versatile"),
            system: systemPrompt,
            messages: modelMessages,
        });

        // Return as a UIMessage stream response (compatible with useChat)
        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.error("[/api/refine] Error:", error);
        return new Response(
            JSON.stringify({ error: "An unexpected error occurred during refinement." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
