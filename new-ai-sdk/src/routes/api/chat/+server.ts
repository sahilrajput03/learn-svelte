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

// MCP (https://ai-sdk.dev/cookbook/node/mcp-tools)
import { experimental_createMCPClient, generateText } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';

// OPENAI
const openai = createOpenAI({
    apiKey: env.OPEN_AI_API_KEY ?? '',
});

// GROQ: https://sdk.vercel.ai/providers/ai-sdk-providers/groq
export const _groq = createGroq({
    apiKey: env.GROQ_API_KEY ?? ""
});


const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString()
}

// TODO: Check if this helps to improve system instruction - https://chatgpt.com/c/67f18bef-96fc-8007-87fe-3ead1a2ce3d4

// Note: I have explicitly stated below that before calling createReminderTool you must get current
//          time via `getCurrentTimeTool`.

// ! Learn: Below prompt didn't work well in testing because it caused infinite looping while trying to create reminders) [Src: https://chatgpt.com/c/67f4b78c-29dc-8007-aace-fc81b8c46faf]
export const _systemPromptTest1 = `
Prompt:
- Always be extremely concise in all responses.
- Always address me as Sáhil.
- Never mention that you are an AI, a machine, or disclose any information about the model or its source.

Reminder Handling Instructions:
- Whenever I ask to set a reminder:
    1. First, call getCurrentTimeForCreatingReminderTool to fetch the latest time.
    2. Then, call createReminderTool using the time retrieved.
- In your response, always mention the time and date at which the reminder is set.
    - If the reminder is for today, display only the time followed by "today" (e.g., "3:00 PM today").
    - If the reminder is for any other day, display the full time and date (e.g., "3:00 PM on April 10, 2025").

Date and Time Reference:
- For any question related to the date, use: ${humanReadableTodayDayAndDate()}.
- For any question related to the time, call: getHumanReadableTimeTool.
`

// NOTE TO SAHIL: When using this prompt you should comment all tools
//          so that it doesn't confuse with the tools.
const _systemPromptTest2 = `
You're a recipe making assistant please ask me questions one by one based on below data:

Choose your Dal (select one):

Toor Dal (Arhar)

Moong Dal

Masoor Dal

Chana Dal

Urad Dal

Rajma

Lobia

Moth Dal

Kulthi Dal (Horse Gram)

Panchmel Dal

Oil Preference (select one):

Rice Bran Oil

Sunflower Oil

Mustard Oil (Sarson)

Ghee

Preparation Style (select one):

Dal Fry

Dal Tadka

Custom Recipe (please describe below)

Your Custom Recipe (if selected above):
[Type your instructions here]
`

// TODO: I need to this text to below prompt and test if this works properly too:
//      "In your response clearly mention the time and date at which the reminder is set and if the reminder is set for today, then display only the time followed by the word "today" (e.g., "3:00 PM today")."
export const _systemPrompt = `
Be extremely concise in all responses. Always address me as Sáhil.

Never mention that you are an AI, machine, or disclose anything about the model or its source company.

Whenever I ask to set a reminder, always call the getCurrentTimeForCreatingReminderTool first, before calling createReminderTool every time so that you get the latest time in everytime. 

For any questions related to date, remember todays date is ${humanReadableTodayDayAndDate()}

For any questions related to time you can call getHumanReadableTimeTool to get current time.
`

export const POST = (async ({ request }: RequestEvent) => {
    // console.log('POST: /ai-sdk')
    const { messages } = await request.json();


    // ! Learn: GROQ doesn't perform well because they offer quantized models - https://www.reddit.com/r/LocalLLaMA/comments/1d6egfk/lets_discuss_about_groq_which_model_you_use_and/
    // & Using MCP with ai-sdk - https://ai-sdk.dev/cookbook/node/mcp-tools
    let clientOne;
    // Initialize an MCP client to connect to a `stdio` MCP server:
    const transport = new Experimental_StdioMCPTransport({
        // command: 'node',
        // args: ['src/stdio/dist/server.js'],
        command: "/Users/apple/.nvm/versions/node/v22.13.0/bin/npx",
        args: [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            "/Users/apple/Documents/test/mcp-filesystem-test1/p1",
            // "/Users/apple/Documents/test/mcp-filesystem-test1/p2"
        ]
    });
    clientOne = await experimental_createMCPClient({
        transport,
    });
    const toolSetOne = await clientOne.tools(); // * Please uncomment the `...toolSetOne` in the list of tools attached to chat-completion to enable tool calls.
    // console.log("🚀 toolSetOne:", toolSetOne)
    // 
    // 💡 MCP: Alternatively, you can connect to a Server-Sent Events (SSE) MCP server:
    // clientTwo = await experimental_createMCPClient({
    //     transport: {
    //         type: 'sse',
    //         url: 'http://localhost:3000/sse',
    //     },
    // });

    // console.log("🚀 ~ POST ~ messages:", messages)
    console.log('messages?.[1]?.toolInvocations?', messages?.[1]?.toolInvocations)
    // Tool calls work with openai and groq (tested for gemma-2-9b-it) both very well.
    const result = streamText({
        // model: openai('gpt-4o-mini'), // & Using OpenAI
        model: _groq('gemma2-9b-it'), // & Using Groq, Models: "llama-3.1-8b-instant", "gemma2-9b-it" ✅, "mixtral-8x7b-32768", "llama3-70b-8192" (bad for tool call) etc
        // model: _groq('llama3-groq-8b-8192-tool-use-preview'), // ❌ (didn't work at all)
        // model: _groq('llama3-groq-70b-8192-tool-use-preview'), // ❌ (didn't work at all)
        // model: groq('deepseek-r1-distill-qwen-32b'),
        // model: groq('deepseek-r1-distill-llama-70b'),
        system: _systemPrompt, // System instruction/prompt/message (src: https://sdk.vercel.ai/docs/foundations/prompts#system-messages)
        messages,
        // Learn: Having explicit definition of below keys helps
        //         vscode's cmd+click feature to work.
        // & Learn: Confirmed from Groq's Admin Logs that input tokens usage decreased from 1400 upto(1700) tokens for prompt "Hi" to 127 tokens for (prompt: Hi) when I had all three tools below vs. having them commented.
        tools: {
            // 
            // weatherTool: weatherTool,
            // convertFarenheitToCelsius: convertFarenheitToCelsius,
            // 
            createReminderTool: createReminderTool,
            getCurrentTimeForCreatingReminderTool: getCurrentTimeForCreatingReminderTool,
            getHumanReadableTimeTool: getHumanReadableTimeTool
            //// sendSmsTool: sendSmsTool // dummy function to send sms to anybody, present in file `./tools.ts` file
            // 
            // & MCP
            // ...toolSetOne
        },
    });

    // 🚀 Docs: https://sdk.vercel.ai/docs/ai-sdk-core/generating-text#streamtext
    // example: use textStream as an async iterable
    // for await (const textPart of result.textStream) {
    //   console.log(textPart);
    // }

    return result.toDataStreamResponse();

    // * [Tested] Calling `client.close` when streaming finishes to close MCP server (ChatGPT):
    // const originalResponse = result.toDataStreamResponse();
    // const { body, headers } = originalResponse;
    // const stream = new ReadableStream({
    //     async start(controller) {
    //         const reader = body?.getReader();
    //         try {
    //             while (true) {
    //                 const { done, value } = await reader!.read();
    //                 if (done) break;
    //                 controller.enqueue(value);
    //             }
    //         } finally {
    //             controller.close();
    //             await clientOne.close();
    //         }
    //     }
    // });
    // return new Response(stream, { headers });
});


// GROQ
// ====
// llama-3.1-8b-instant: Good balance of performance and speed.
// gemma2-9b-it: Strong in Italian language tasks.
// mixtral-8x7b-32768: Excellent performance across various tasks.
// ! // (NO LONGER Exists =>>>) // ! llama-3.1-70b-versatile: Powerful but resource-intensive.
// If you need a versatile model with good performance, llama-3.1-70b-versatile is a good choice. If you prioritize speed and resource efficiency, llama-3.1-8b-instant is a better option. If you need a model specifically for Italian language tasks, gemma2-9b-it is the best choice. If you need a high-performing model across various tasks, mixtral-8x7b-32768 is the best choice.
