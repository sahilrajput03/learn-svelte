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

export async function POST({ request }) {
    const { messages } = await request.json();

    const result = streamText({
        // model: openai('gpt-4o'),
        model: _groq('gemma2-9b-it'), // & Using Groq, Models: "llama-3.1-8b-instant", "gemma2-9b-it", "mixtral-8x7b-32768", etc
        messages,
        tools: {
            weatherTool: weatherTool,
        }
    });

    return result.toDataStreamResponse();
}