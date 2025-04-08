import { describe, it, expect, afterEach, vi } from 'vitest'
import { generateTextViaAiSDKForTesting } from './test-utils'
import { createReminderEXECUTE, getCurrentTimeForCreatingReminderEXECUTE } from './toolExecutes'
import { createReminderRequest } from './requests'
import util from 'util'


// & Confirmed from Groq's Admin Logs - that when mocked the function calls doesn't cause to serialize all functions which increases the input token usage because of all the sideeffects helper methods that vitest put for mocking usage.
vi.mock('./toolExecutes', { spy: true }) // ✅
vi.mock('./requests', { spy: true }) // ✅

// Docs:
// - https://vitest.dev/api/vi.html
// - https://vitest.dev/guide/mocking.html#modules

// * LEARN: Below two tests runs good if run alone individually but they probably make some infinite loop if i'm not wrong because it takes forever or groq reports that too many tokens used like 5 lakh tokens consumed - LIMIT REACHED FOR THE DAY.

describe('ai-sdk tests', { concurrent: false }, () => {
    afterEach(() => {
        // Learn: Restoring a mock from vi.fn(impl) will restore implementation to impl.
        // vi.restoreAllMocks() // ❌ (This gives me method is not a mock function in the second test --- Time taken to debug this - 2 hours.)

        // Learn: resetAllMocks method calls .mockReset() on all spies. This will clear mock history and reset each mock's implementation to its original.
        vi.resetAllMocks() // ✅ (This resets the mocks the correct way).
    })

    it('relative time case', { timeout: 30_000 }, async () => {
        const mins = 5
        const messages = [{ role: 'user', content: `Set a reminder in ${mins} mins to go meet Alice` }] as any

        const result = await generateTextViaAiSDKForTesting(messages)
        // & Learn Having tool calls mocked does not cause to create higher token usage. Though using toollcalls itself increases the input tokens alone.
        // console.log("🚀 ~ it.only ~ result.text:", result.text)
        // console.log("🚀 ~ it.only ~ result.response:", result.response)
        // console.log("🚀 ~ it.only ~ result.response.messages:", util.inspect(result.response.messages, { depth: null, colors: true }))
        // console.log("🚀 ~ it.only ~ result.toolCalls:", util.inspect(result.toolCalls, { depth: null, colors: true }))
        // console.log("🚀 ~ it.only ~ result.toolResults,:", util.inspect(result.toolResults, { depth: null, colors: true }))

        expect(getCurrentTimeForCreatingReminderEXECUTE).toHaveBeenCalledTimes(1)
        expect(createReminderEXECUTE).toHaveBeenCalledTimes(1)

        expect(createReminderRequest).toHaveBeenCalledTimes(1)
        const currentTimeResult = await (getCurrentTimeForCreatingReminderEXECUTE as any).mock.results[0].value
        const date = new Date(currentTimeResult.currentTime)
        // Add 5 minutes (5 * 60 * 1000 ms)
        const reminderDate = new Date(date.getTime() + mins * 60 * 1000)
        const reminderISO = reminderDate.toISOString().slice(0, -5); // (remove last 5 chars example - 2025-04-07T20:00:30.000Z" > 2025-04-07T20:00:30"
        expect(createReminderRequest).toHaveBeenCalledWith(
            {
                "priority": 1,
                "scheduledTime": expect.stringContaining(reminderISO),
                "title": expect.any(String),
            },
        )
    })


    it('absolut time case', { timeout: 30_000 }, async () => {
        const messages = [{ role: 'user', content: 'Create a reminder to go meet Alice at 11:34pm' }] as any

        const result = await generateTextViaAiSDKForTesting(messages)
        expect(createReminderRequest).toHaveBeenCalledTimes(1)
        expect(createReminderRequest).toHaveBeenCalledWith(
            {
                "priority": 1,
                "scheduledTime": expect.stringContaining("2025-04-08T23:34:00"),
                "title": expect.any(String),
            },
        )

        const expectedTime = '23:34:00'
        expect(getCurrentTimeForCreatingReminderEXECUTE).toHaveBeenCalledTimes(1)
        expect(createReminderEXECUTE).toHaveBeenCalledTimes(1)
        // expect(received).toBe(expected)
        console.log('❤️❤️❤️️ Test completed successfully!!')
    })
})