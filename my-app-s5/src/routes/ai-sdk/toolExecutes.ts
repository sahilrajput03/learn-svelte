import { dumbSimpleReadableTime } from "$lib/time-utils"
import { log } from "console";
import { createReminderRequest } from "./requests"

// Mocking Pitfalls in Vitest Docs - https://vitest.dev/guide/mocking.html#mocking-pitfalls

export async function getCurrentTimeForCreatingReminderEXECUTE() {
    const now = new Date();
    log('1️⃣️ Calling getCurrentTimeForCreatingReminderTool:', dumbSimpleReadableTime(now));
    return { currentTime: now.toISOString() };
}

export const createReminderEXECUTE = async ({ text, scheduledTime, priority }) => {
    // create reminder
    // const secondsFromNow = 0;
    // const scheduledTime = new Date(Date.now() + secondsFromNow * 1000);
    const humanReadableTime = dumbSimpleReadableTime(new Date(scheduledTime))
    console.log('2️⃣️ createReminder tool call initiated.', {
        text,
        scheduledTime: humanReadableTime,
        priority
    })
    let result = null as any
    try {
        await createReminderRequest({
            title: text,
            scheduledTime,
            priority,
        })
        result = { message: 'Your reminder is set for ' + humanReadableTime }
        console.log('✅Reminder added to database🎉🎉\n')
    } catch (error: any) {
        result = { message: 'failed', error }
        console.log('❌ Error @ createReminder tool call while calling api.')
        console.log({ name: error.name, message: error.message, responseData: error.response?.data })
    }
    return result;
}