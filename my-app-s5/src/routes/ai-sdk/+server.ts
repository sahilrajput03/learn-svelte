// 😇😇 Source (DONE): https://sdk.vercel.ai/docs/getting-started/svelte
// TODO: https://sdk.vercel.ai/docs/foundations/prompts

// Frontend in file: src/routes/ai-sdk/+page.svelte
// Visit chat assitant at: http://localhost:5173/ai-sdk

// TODO: Read ai-sdk 4.0: https://vercel.com/blog/ai-sdk-4-0#new-xai-grok-provider

// Models provided by groq: https://sdk.vercel.ai/providers/ai-sdk-providers/groq#model-capabilities

import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';


import { env } from '$env/dynamic/private';
import { z } from 'zod';
import { convertFarenheitToCelsius, weatherTool } from './tools';
import { createGroq } from '@ai-sdk/groq';
import type { RequestEvent, RequestHandler } from './$types';

// OPENAI
const openai = createOpenAI({
    apiKey: env.VITE_OPEN_AI_API_KEY ?? '',
});

// GROQ: https://sdk.vercel.ai/providers/ai-sdk-providers/groq
const groq = createGroq({
    apiKey: env.VITE_GROQ ?? ""
});

export const POST = (async ({ request }: RequestEvent) => {
    const { messages } = await request.json();

    // Tool calls work with openai and groq (tested for gemma-2-9b-it) both very well.
    const result = streamText({
        // model: openai('gpt-4o-mini'), // & Using OpenAI
        model: groq('gemma2-9b-it'), // & Using Groq
        system: 'Be concise and use my name Sahil to address me in your reponses. Please never remind me that you are machine.', // System instruction (src: https://sdk.vercel.ai/docs/foundations/prompts#system-messages)
        messages,
        tools: {
            weatherTool,
            convertFarenheitToCelsius
        },
    });

    return result.toDataStreamResponse();
}) satisfies RequestHandler;
