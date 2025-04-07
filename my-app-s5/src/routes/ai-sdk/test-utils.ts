import { vi } from 'vitest'
import { generateText, streamText } from 'ai'
import { createReminderTool, getCurrentTimeForCreatingReminderTool, getHumanReadableTimeTool } from './tools'
import { _systemPrompt, _groq } from './+server'

export const generateTextViaAiSDK = async (messages) => {
    // ❤️ generateText Docs: https://sdk.vercel.ai/docs/ai-sdk-core/generating-text
    const result = await generateText({
        // model: openai('gpt-4o-mini'), // & Using OpenAI
        model: _groq('gemma2-9b-it'), // & Using Groq
        // model: groq('deepseek-r1-distill-qwen-32b'),
        // model: groq('deepseek-r1-distill-llama-70b'),
        system: _systemPrompt, // System instruction/prompt/message (src: https://sdk.vercel.ai/docs/foundations/prompts#system-messages)
        messages,
        // Learn: Having explicit definition of below keys helps
        //         vscode's cmd+click feature to work.

        /**
        *  ? TEMPERATURE (May be its actually good to set temperature=0 (Totally Deterministic 🤔 to be more predictable about results?)
        *  ? ===========
        - Temperature setting. This is a number between 0 (almost no randomness) and 1 (very random).
        - It is recommended to set either temperature or topP, but not both.
        Temperature	Behavior
        ====================
            0.0	        Fully deterministic — same input = same output every time.
            0.2 - 0.5	Slight creativity, but still fairly controlled.
            0.7 - 1.0	More randomness, more creative.
            >1.0	    High randomness — output can get wild, sometimes incoherent.
         */
        // temperature: 0.5, // default value is 0
        temperature: 0, // default value is 0
        tools: {
            // weatherTool: weatherTool,
            // convertFarenheitToCelsius: convertFarenheitToCelsius,
            createReminderTool: createReminderTool,
            getCurrentTimeForCreatingReminderTool: getCurrentTimeForCreatingReminderTool,
            getHumanReadableTimeTool: getHumanReadableTimeTool
            // sendSmsTool: sendSmsTool // dummy function to send sms to anybody, present in file `./tools.ts` file
        },
        maxSteps: 10, // 🎉🎉🎉🎉
        // experimental_continueSteps: true, // (I didn't need this for now)
    });
    return result
}