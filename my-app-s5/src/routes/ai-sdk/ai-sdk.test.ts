import { describe, it, expect, afterEach, vi } from 'vitest'
import { generateTextViaAiSDK } from './test-utils'
import { createReminder } from './tools'

describe('ai-sdk tests', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('test1', { timeout: 10_000 }, async () => {
        const messages = [{ role: 'user', content: 'Create a reminder to go meet Alice at 11:34pm' }] as any

        const result = await generateTextViaAiSDK(messages)
        expect(createReminder).toHaveBeenCalledTimes(1)
        expect(createReminder).toHaveBeenCalledWith(
            {
                "priority": 1,
                "scheduledTime": "2025-04-07T23:34:00",
                "title": expect.any(String),
            },
        )

        // const received = 1
        // const expected = 1
        // expect(received).toBe(expected)
    })

    it.skip('test1', { timeout: 10_000 }, async () => {
        const messages = [{ role: 'user', content: 'Set a reminder in two mins to go meet Alice' }] as any

        const result = await generateTextViaAiSDK(messages)
        expect(createReminder).toHaveBeenCalledTimes(1)
        expect(createReminder).toHaveBeenCalledWith(
            {
                "priority": 1,
                "scheduledTime": "2025-04-07T23:34:00",
                "title": expect.any(String),
            },
        )

        // const received = 1
        // const expected = 1
        // expect(received).toBe(expected)
    })
})