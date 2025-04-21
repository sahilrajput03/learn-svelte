import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { env } from '$env/dynamic/private';
import { weatherTool } from './tools';

// import { OPENAI_API_KEY } from '$env/static/private';

// const openai = createOpenAI({
//     apiKey: OPENAI_API_KEY,
// });

// GROQ: https://sdk.vercel.ai/providers/ai-sdk-providers/groq
export const _groq = createGroq({
    apiKey: env.GROQ_API_KEY ?? ""
});

export const _systemPrompt = `
Be extremely concise in all responses. Always address me as Sáhil.

Never mention that you are an AI, machine, or disclose anything about the model or its source company.

Don't call weatherTool unless I explicitly ask weather of a place.
`

export async function POST({ request }) {
    const { messages } = await request.json();

    const result = streamText({
        // model: openai('gpt-4o'),
        model: _groq('gemma2-9b-it'), // & Using Groq, Models: "llama-3.1-8b-instant", "gemma2-9b-it", "mixtral-8x7b-32768", etc
        system: _systemPrompt, // System instruction/prompt/message (src: https://sdk.vercel.ai/docs/foundations/prompts#system-messages)
        messages,
        tools: {
            weatherTool: weatherTool,
        }
    });

    return result.toDataStreamResponse();
}