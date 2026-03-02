
const { createGroq } = require("@ai-sdk/groq");
const { generateText } = require("ai");
require("dotenv").config({ path: ".env.local" });

const INITIAL_SYSTEM_PROMPT = `You are a world-class prompt engineer...`; // Simplified for now

async function test() {
    const apiKey = process.env.GROQ_API_KEY;
    console.log("Using API Key:", apiKey ? apiKey.slice(0, 10) + "..." : "undefined");
    
    if (!apiKey) {
        console.error("GROQ_API_KEY is missing!");
        return;
    }

    try {
        const groq = createGroq({ apiKey });
        const { text } = await generateText({
            model: groq("llama-3.3-70b-versatile"),
            system: INITIAL_SYSTEM_PROMPT,
            prompt: `Here is the live website content:\n\n# Google\n\n[Search](https://google.com)`,
        });
        console.log("Success! Generated text length:", text.length);
    } catch (error) {
        console.error("Caught error:", error);
    }
}

test();
