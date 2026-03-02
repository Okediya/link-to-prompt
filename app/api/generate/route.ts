/**
 * /api/generate — Initial prompt generation endpoint.
 *
 * Flow:
 *  1. Accept a URL from the client
 *  2. Scrape clean markdown via Jina Reader (https://r.jina.ai/{url})
 *  3. Call Groq Llama 3.3 70B with the scraped content + INITIAL_SYSTEM_PROMPT
 *  4. Return the generated coding-agent prompt
 */

import { createGroq } from "@ai-sdk/groq";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { INITIAL_SYSTEM_PROMPT } from "@/lib/system-prompts";

// Initialize the Groq provider (moved inside handler to handle missing API key gracefully)

export async function POST(request: Request) {
    try {
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            console.error("[/api/generate] Missing GROQ_API_KEY environment variable.");
            return NextResponse.json(
                { error: "Groq API key is not configured. Please add GROQ_API_KEY to your environment variables." },
                { status: 500 }
            );
        }

        const { url } = await request.json();

        if (!url || typeof url !== "string") {
            return NextResponse.json(
                { error: "A valid URL is required." },
                { status: 400 }
            );
        }

        // --- Step 1: Scrape website content via Jina Reader ---
        const jinaUrl = `https://r.jina.ai/${url}`;
        const scrapeResponse = await fetch(jinaUrl, {
            headers: { Accept: "text/markdown" },
        });

        if (!scrapeResponse.ok) {
            return NextResponse.json(
                { error: `Failed to scrape the website. Jina returned status ${scrapeResponse.status}.` },
                { status: 502 }
            );
        }

        const markdown = await scrapeResponse.text();

        // Truncate extremely large pages to stay within context limits
        const MAX_CHARS = 30_000;
        const truncatedMarkdown =
            markdown.length > MAX_CHARS
                ? markdown.slice(0, MAX_CHARS) + "\n\n[Content truncated for length]"
                : markdown;

        // --- Step 2: Generate prompt via Groq ---
        const groq = createGroq({ apiKey });
        const { text } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            system: INITIAL_SYSTEM_PROMPT,
            prompt: `Here is the live website content:\n\n${truncatedMarkdown}`,
        });

        return NextResponse.json({ prompt: text });
    } catch (error: any) {
        console.error("[/api/generate] Error:", error);

        // Return a more descriptive error if it's from the AI SDK or common issues
        const errorMessage = error?.message || "An unexpected error occurred while generating the prompt.";

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
