import { describe, it, expect } from 'vitest'
import { _groq, _systemPrompt } from './+server'
import { log } from 'console'
import { generateText, streamText } from 'ai'
import { getHumanReadableTimeTool } from './tools'

describe('ai-sdk tests', () => {
    it('test1', async () => {
        // const messages = [{ role: 'user', content: 'What is color of sky?' }] as any
        // const messages = [{ role: 'user', content: 'How are you?' }] as any
        const messages = [{ role: 'user', content: 'Tell me a 1 line poem?' }] as any
        // const messages = [{ role: 'user', content: 'What is 1 + 2?' }] as any

        const result = await generateText({
            // model: openai('gpt-4o-mini'), // & Using OpenAI
            model: _groq('gemma2-9b-it'), // & Using Groq
            // model: groq('deepseek-r1-distill-qwen-32b'),
            // model: groq('deepseek-r1-distill-llama-70b'),
            system: _systemPrompt, // System instruction/prompt/message (src: https://sdk.vercel.ai/docs/foundations/prompts#system-messages)
            messages,
            // Learn: Having explicit definition of below keys helps
            //         vscode's cmd+click feature to work.
            tools: {
                // weatherTool: weatherTool,
                // convertFarenheitToCelsius: convertFarenheitToCelsius,
                // createReminderTool: createReminderTool,
                // getCurrentTimeForCreatingReminderTool: getCurrentTimeForCreatingReminderTool,
                getHumanReadableTimeTool: getHumanReadableTimeTool
                // sendSmsTool: sendSmsTool // dummy function to send sms to anybody, present in file `./tools.ts` file
            },
        });

        console.log("🚀 result.text", result.text)
        console.log("🚀 result", result)

        const received = 1
        const expected = 1

        expect(received).toBe(expected)
    })
})