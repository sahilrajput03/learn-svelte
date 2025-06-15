// 😇😇 Source (DONE): https://sdk.vercel.ai/docs/getting-started/svelte

// Todo ❤️: Fix the terminal's warning - https://github.com/sveltejs/kit/issues/13743#issuecomment-2918248837
// Todo: https://sdk.vercel.ai/docs/foundations/prompts
// Todo: Read ai-sdk 4.0: https://vercel.com/blog/ai-sdk-4-0#new-xai-grok-provider

// Frontend in file: src/routes/ai-sdk/+page.svelte
// Visit chat assitant at: http://localhost:5173/ai-sdk


// Models provided by groq: https://sdk.vercel.ai/providers/ai-sdk-providers/groq#model-capabilities

import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
// TODO (make notes in readme of this: Adv.SvelteKit/EnvironmentVarables) read the values of environment variables when the app runs, as opposed to when the app is built,
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import { convertFarenheitToCelsius, createReminderTool, getCurrentTimeForCreatingReminderTool, getHumanReadableTimeTool, weatherTool } from './tools';
import { createGroq } from '@ai-sdk/groq';
import type { RequestEvent, RequestHandler } from './$types';
import { humanReadableTodayDayAndDate } from '$lib/time-utils';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

// MCP (https://ai-sdk.dev/cookbook/node/mcp-tools)
import { experimental_createMCPClient, generateText } from 'ai';
import { Experimental_StdioMCPTransport } from 'ai/mcp-stdio';
import { readPromptFromFileAtxt } from './systemPrompts';
import { directoryForMcp, isAppleSystem, mcpDirectoryOnAppleSystem, mcpDirectoryOnLinodeSystem } from '$lib/config';

// * Comment on models (via ChatGPT):
// - llama-3.1-8b-instant: Good balance of performance and speed.
// - gemma2-9b-it: Strong in Italian language tasks.
// - mixtral-8x7b-32768: Excellent performance across various tasks.
// - If you need a versatile model with good performance,
//      llama-3.1-70b-versatile is a good choice. If you prioritize
//      speed and resource efficiency, llama-3.1-8b-instant is a
//      better option. If you need a model specifically for Italian
//      language tasks, gemma2-9b-it is the best choice. If you need a
//      high-performing model across various tasks, mixtral-8x7b-32768
//      is the best choice.

// OPENAI
const openai = createOpenAI({
    apiKey: env.OPEN_AI_API_KEY ?? '',
});

// ! Learn: GROQ doesn't perform well because they offer quantized models - https://www.reddit.com/r/LocalLLaMA/comments/1d6egfk/lets_discuss_about_groq_which_model_you_use_and/
// GROQ: https://sdk.vercel.ai/providers/ai-sdk-providers/groq
export const _groq = createGroq({
    apiKey: env.GROQ_API_KEY ?? ""
});


// ❤️GOOGLE
//      -  Gemini Developer API Pricing: https://ai.google.dev/gemini-api/docs/pricing
//          - In free tier we have only - "Gemini 2.5 Flash Preview" MODEL
//      - AI SDK Docs - https://aistudio.google.com/apikey
const google = createGoogleGenerativeAI({
    apiKey: env.GOOGLE_API_KEY,
});


const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString()
}

// Note: I have explicitly stated below that before calling createReminderTool you must get current
//          time via `getCurrentTimeTool`.

export const POST = (async ({ request }: RequestEvent) => {
    // console.log('POST: /ai-sdk')
    const { messages, text } = await request.json();

    // TODO: ❤️I can make use ️extra body object to be sent with the
    //          API request to select tool calls as set by dynamically in
    //          +page.svelte file.
    console.log("🚀 ~ POST ~ text:", text)

    // & Using MCP with ai-sdk - https://ai-sdk.dev/cookbook/node/mcp-tools
    const toolSetOne = await getToolSetFromMcpServers()
    const systemPromptForFileSystemMcpServer = await readPromptFromFileAtxt()
    // console.log("🚀 ~ POST ~ systemPromptForFileSystemMcpServer:", systemPromptForFileSystemMcpServer)
    // console.log("🚀 ~ POST ~ systemPromptForFileSystemMcpServer:", systemPromptForFileSystemMcpServer)

    // console.log("🚀 ~ POST ~ messages:", messages)
    console.log('messages?.[1]?.toolInvocations?', messages?.[1]?.toolInvocations)
    // Tool calls work with openai and groq (tested for gemma-2-9b-it) both very well.
    const result = streamText({
        model: google('gemini-2.5-flash-preview-04-17'), // ✅❤️ (I got this model name from the link mentioned above in the ai-sdk-docs-link).
        // model: openai('gpt-4o-mini'), // & Using OpenAI
        // model: _groq('gemma2-9b-it'), // & ✅ Using Groq, Models: "llama-3.1-8b-instant", "gemma2-9b-it" ✅, "mixtral-8x7b-32768", "llama3-70b-8192" (bad for tool call), ✅ 'deepseek-r1-distill-llama-70b', ✅'deepseek-r1-distill-qwen-32b', ❌ "llama3-groq-8b-8192-tool-use-preview", ❌ "llama3-groq-70b-8192-tool-use-preview"
        // system: _systemPrompt, // System instruction/prompt/message (src: https://sdk.vercel.ai/docs/foundations/prompts#system-messages)
        system: systemPromptForFileSystemMcpServer,
        messages,
        // Learn: Having explicit definition of below keys helps
        //         vscode's cmd+click feature to work.
        // & Learn: Confirmed from Groq's Admin Logs that input tokens usage decreased from 1400 upto(1700) tokens for prompt "Hi" to 127 tokens for (prompt: Hi) when I had all three tools below vs. having them commented.
        tools: {
            // 
            // weatherTool: weatherTool,
            // convertFarenheitToCelsius: convertFarenheitToCelsius,
            // 
            // createReminderTool: createReminderTool,
            // getCurrentTimeForCreatingReminderTool: getCurrentTimeForCreatingReminderTool,
            // getHumanReadableTimeTool: getHumanReadableTimeTool
            //// sendSmsTool: sendSmsTool // dummy function to send sms to anybody, present in file `./tools.ts` file
            // 
            // & MCP
            ...toolSetOne
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

// * Note: Please uncomment the `...toolSetOne` in the list of tools attached to chat-completion to enable tool calls.
async function getToolSetFromMcpServers() {
    const client1 = await connectMcpServerViaStdio()
    const toolsSet1 = await client1.tools();
    return toolsSet1

    // const client2 = await connectToMcpServerViaSseEvents()
    // const toolsSet2 = client2.tools()
    // return toolsSet2

    // return [...(toolsSet1 as any), ...(toolsSet2 as any)]
}

// Below function run command the following command on its own: npx -y @modelcontextprotocol/server-filesystem /Users/apple/Documents/test/mcp-filesystem-test1/p1
async function connectMcpServerViaStdio() {
    // Initialize an MCP client to connect to a `stdio` MCP server:

    const transport = new Experimental_StdioMCPTransport({
        command: isAppleSystem ? "/Users/apple/.nvm/versions/node/v22.13.0/bin/npx" : "/home/user1/.nvm/versions/node/v22.13.0/bin/npx",
        args: [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            directoryForMcp,
            // "/Users/apple/Documents/test/mcp-filesystem-test1/p2"
        ]
    });
    const client = await experimental_createMCPClient({
        transport,
    });
    return client
}

//  - Filesystem over sse:
//      - https://github.com/ysthink/Filesystem-MCP-Server-SSE
//      - https://github.com/QuantGeekDev/mcp-filesystem/tree/main
async function connectToMcpServerViaSseEvents() {
    // 💡 You can connect to a Server-Sent Events (SSE) MCP server:
    const client = await experimental_createMCPClient({
        transport: {
            type: 'sse',
            url: 'http://localhost:3000/sse',
        },
    });
    return client
}