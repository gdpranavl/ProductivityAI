import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function GET() {
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),  // specify your desired Gemini variant
    prompt: "Explain Next.js routing",
  });
  return new Response(text);
}

export async function POST(req: Request) {
  const { content } = await req.json();
  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt: `Summarize the following content:\n\n${content}`,
  });
  return new Response(JSON.stringify({ summary: text }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
