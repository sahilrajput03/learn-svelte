import { describe, it, expect, afterEach, vi } from 'vitest'
import { generateTextViaAiSDK } from './test-utils'
import { createReminderRequest, createReminderEXECUTE, getCurrentTimeForCreatingReminderEXECUTE } from './tools'

describe('ai-sdk tests', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it.only('absolut time case', { timeout: 10_000 }, async () => {
        const messages = [{ role: 'user', content: 'Create a reminder to go meet Alice at 11:34pm' }] as any

        const result = await generateTextViaAiSDK(messages)
        expect(createReminderRequest).toHaveBeenCalledTimes(1)
        expect(createReminderRequest).toHaveBeenCalledWith(
            {
                "priority": 1,
                "scheduledTime": "2025-04-07T23:34:00",
                "title": expect.any(String),
            },
        )

        const expectedTime = '23:34:00'
        // TODO: Test these later after I have fixed above mock function issue so that vite dev server doesn't fuck up!
        // expect(getCurrentTimeForCreatingReminderExecute).toHaveBeenCalledTimes(1)
        // expect(createReminderExecute).toHaveBeenCalledTimes(1)
        // expect(received).toBe(expected)
    })

    it('relative time case', { timeout: 10_000 }, async () => {
        const mins = 5
        const messages = [{ role: 'user', content: `Set a reminder in ${mins} mins to go meet Alice` }] as any

        const result = await generateTextViaAiSDK(messages)
        expect(getCurrentTimeForCreatingReminderEXECUTE).toHaveBeenCalledTimes(1)
        expect(createReminderEXECUTE).toHaveBeenCalledTimes(1)

        expect(createReminderRequest).toHaveBeenCalledTimes(1)
        const currentTimeResult = await getCurrentTimeForCreatingReminderEXECUTE.mock.results[0].value
        const date = new Date(currentTimeResult.currentTime)
        // Add 5 minutes (5 * 60 * 1000 ms)
        const reminderDate = new Date(date.getTime() + mins * 60 * 1000)
        const reminderISO = reminderDate.toISOString()
        expect(createReminderRequest).toHaveBeenCalledWith(
            {
                "priority": 1,
                "scheduledTime": reminderISO,
                "title": expect.any(String),
            },
        )
    })
})