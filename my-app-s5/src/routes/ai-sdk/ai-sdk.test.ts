import { describe, it, expect, afterEach, vi } from 'vitest'
import { generateTextViaAiSDK } from './test-utils'
import { createReminderRequest, createReminderExecute, getCurrentTimeForCreatingReminderExecute } from './tools'

describe('ai-sdk tests', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('absolut time case', { timeout: 10_000 }, async () => {
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
        expect(getCurrentTimeForCreatingReminderExecute).toHaveBeenCalledTimes(1)
        expect(createReminderExecute).toHaveBeenCalledTimes(1)
        // expect(received).toBe(expected)
    })

    it('relative time case', { timeout: 10_000 }, async () => {
        const mins = 5
        const messages = [{ role: 'user', content: `Set a reminder in ${mins} mins to go meet Alice` }] as any

        const result = await generateTextViaAiSDK(messages)
        expect(getCurrentTimeForCreatingReminderExecute).toHaveBeenCalledTimes(1)
        expect(createReminderExecute).toHaveBeenCalledTimes(1)

        expect(createReminderRequest).toHaveBeenCalledTimes(1)
        const currentTimeResult = await getCurrentTimeForCreatingReminderExecute.mock.results[0].value
        const original = new Date(currentTimeResult.currentTime)
        // Add 5 minutes (5 * 60 * 1000 ms)
        const updated = new Date(original.getTime() + mins * 60 * 1000)
        const updatedIso = updated.toISOString()
        expect(createReminderRequest).toHaveBeenCalledWith(
            {
                "priority": 1,
                "scheduledTime": updatedIso,
                "title": expect.any(String),
            },
        )
    })
})