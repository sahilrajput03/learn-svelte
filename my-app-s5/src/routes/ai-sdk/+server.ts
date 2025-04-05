// 😇😇 Source (DONE): https://sdk.vercel.ai/docs/getting-started/svelte
// TODO: https://sdk.vercel.ai/docs/foundations/prompts

// Frontend in file: src/routes/ai-sdk/+page.svelte
// Visit chat assitant at: http://localhost:5173/ai-sdk

// TODO: Read ai-sdk 4.0: https://vercel.com/blog/ai-sdk-4-0#new-xai-grok-provider

// Models provided by groq: https://sdk.vercel.ai/providers/ai-sdk-providers/groq#model-capabilities

import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';


import { env } from '$env/dynamic/private'; // TODO (make notes in readme of this: Adv.SvelteKit/EnvironmentVarables) read the values of environment variables when the app runs, as opposed to when the app is built,
import { z } from 'zod';
import { convertFarenheitToCelsius, createReminderTool, getCurrentTimeForCreatingReminderTool, getHumanReadableTimeTool, weatherTool } from './tools';
import { createGroq } from '@ai-sdk/groq';
import type { RequestEvent, RequestHandler } from './$types';
import { humanReadableTodayDayAndDate } from '$lib/time-utils';

// OPENAI
const openai = createOpenAI({
    apiKey: env.OPEN_AI_API_KEY ?? '',
});

// GROQ: https://sdk.vercel.ai/providers/ai-sdk-providers/groq
const groq = createGroq({
    apiKey: env.GROQ_API_KEY ?? ""
});


const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString()
}

// Note: I have explicitly stated below that before calling createReminderTool you must get current
//          time via `getCurrentTimeTool`.
const systemPrompt = `
Be extremely concise in all responses. Always address me as Sáhil.

Never mention that you are an AI, machine, or disclose anything about the model or its source company.

Whenever I ask to set a reminder, always call the getCurrentTimeForCreatingReminderTool first, before calling createReminderTool every time so that you get the latest time in everytime.

For any questions related to date, remember todays date is ${humanReadableTodayDayAndDate()}

For any questions related to time you can call getHumanReadableTimeTool to get current time.
`
// Todays date is: ${getCurrentDate()}

export const POST = (async ({ request }: RequestEvent) => {
    // console.log('POST: /ai-sdk')
    const { messages } = await request.json();

    // Tool calls work with openai and groq (tested for gemma-2-9b-it) both very well.
    const result = streamText({
        // model: openai('gpt-4o-mini'), // & Using OpenAI
        model: groq('gemma2-9b-it'), // & Using Groq, Models: "llama-3.1-8b-instant", "gemma2-9b-it", "mixtral-8x7b-32768", etc
        // model: groq('deepseek-r1-distill-qwen-32b'),
        // model: groq('deepseek-r1-distill-llama-70b'),
        system: systemPrompt, // System instruction/prompt/message (src: https://sdk.vercel.ai/docs/foundations/prompts#system-messages)
        messages,
        // Learn: Having explicit definition of below keys helps
        //         vscode's cmd+click feature to work.
        tools: {
            // weatherTool: weatherTool,
            // convertFarenheitToCelsius: convertFarenheitToCelsius,
            createReminderTool: createReminderTool,
            getCurrentTimeForCreatingReminderTool: getCurrentTimeForCreatingReminderTool,
            getHumanReadableTimeTool: getHumanReadableTimeTool
            // sendSmsTool: sendSmsTool // dummy function to send sms to anybody, present in file `./tools.ts` file
        },
    });

    return result.toDataStreamResponse();
}) satisfies RequestHandler;


// GROQ
// ====
// llama-3.1-8b-instant: Good balance of performance and speed.
// gemma2-9b-it: Strong in Italian language tasks.
// mixtral-8x7b-32768: Excellent performance across various tasks.
// ! // (NO LONGER Exists =>>>) // ! llama-3.1-70b-versatile: Powerful but resource-intensive.
// If you need a versatile model with good performance, llama-3.1-70b-versatile is a good choice. If you prioritize speed and resource efficiency, llama-3.1-8b-instant is a better option. If you need a model specifically for Italian language tasks, gemma2-9b-it is the best choice. If you need a high-performing model across various tasks, mixtral-8x7b-32768 is the best choice.
