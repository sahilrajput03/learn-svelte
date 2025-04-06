import { dumbSimpleReadableTime } from "./time-utils"
import { describe, it, expect } from 'vitest'

describe('dumbSimpleReadableTime function', () => {
    it('return time should show seconds if seconds are non zero', () => {
        const testDate = new Date();
        testDate.setDate(6)
        testDate.setFullYear(2025)
        testDate.setMonth(3)
        testDate.setHours(20); // 8 PM
        testDate.setMinutes(5);
        testDate.setSeconds(43);

        const received = dumbSimpleReadableTime(testDate)
        const expected = "08:05:43 pm, 6 April 2025"

        expect(received).toBe(expected)
    })

    it('return time should not include zero seconds if it has zero seconds', () => {
        const testDate = new Date();
        testDate.setDate(6)
        testDate.setFullYear(2025)
        testDate.setMonth(3)
        testDate.setHours(20); // 8 PM
        testDate.setMinutes(5);
        testDate.setSeconds(0);

        const received = dumbSimpleReadableTime(testDate)
        const expected = "08:05 pm, 6 April 2025"

        expect(received).toBe(expected)
    })
})