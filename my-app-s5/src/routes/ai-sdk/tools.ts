import { tool } from "ai";
import { z } from "zod";
import axios from "axios";
import { log } from "console";
import { dumbSimpleReadableTime, getHumanReadableIndianTimeFromDate } from "$lib/time-utils";

export const weatherTool = tool({
    description: 'Get the weather in a location (farenheit)',
    parameters: z.object({
        location: z.string().describe('The location to get the weather for'),
    }),
    execute: async ({ location }) => {
        const temperature = Math.round(Math.random() * (90 - 32) + 32);
        console.log('weather tool call executed!', { location, temperature, })
        return {
            location,
            temperature,
        };
    },
})

export const convertFarenheitToCelsius = tool({
    description: 'Convert a temperature in farenheit to celsius',
    parameters: z.object({
        temperature: z
            .number()
            .describe('The temperature in farenheit to convert'),
    }),
    execute: async ({ temperature }) => {
        const celsius = Math.round((temperature - 32) * (5 / 9));
        return {
            celsius,
        };
    },
})

/**
 * & ❤️️️️️️️️❤️️️️️️️️❤️️️️️️️️️️️️️️️️ The best way to create reminder is to say 
 * - "Set reminder to drink water at 7:15pm."
 * - "Set a reminder for releasing music tomorrow at 10:00 a.m."
 * ! Do not use phrases like below because they are hallucinatory:
 *  - "Set reminder to drink in 5mins." -- 
 */


const apiUrl = 'http://localhost:8080'
let car = 20
export const axiosInstance = axios.create({ baseURL: apiUrl })
export const createReminder = async (payload) => {
    const response = await axiosInstance.post('/api/v1/reminder', payload)
    return response.data
}
export const createReminderTool = tool({
    description: 'Create a reminder',
    parameters: z.object({
        // * Learn: Parameter name are on more priority than description (src: https://chatgpt.com/c/67f13768-3b28-8007-a721-531a6c22e1a3)
        text: z.string().describe('The text or description of the reminder.'),
        scheduledTime: z.string().describe('The date and time when the reminder should be triggered.'),
        priority: z.number().describe('The priority level of the reminder, with 0 being low, 1 being medium, and 2 being high.').default(1),
    }),
    execute: async ({ text, scheduledTime, priority }) => {
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
            await createReminder({
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
    },
})

export const getCurrentTimeForCreatingReminderTool = tool({
    description: 'Fetches the current date and time and returns it in ISO format.',
    parameters: z.object({}), // no input needed
    execute: async () => {
        const now = new Date();
        log('1️⃣️ Calling getCurrentTimeTool:', getHumanReadableIndianTimeFromDate(now))
        return { currentTime: now.toISOString() };
    },
});

export const getHumanReadableTimeTool = tool({
    description: 'Human readable current time and date.',
    parameters: z.object({}), // no input needed
    execute: async () => {
        const now = new Date();
        log('❤️️️️️❤️Calling getHumanReadableTimeTool:', getHumanReadableIndianTimeFromDate(now))
        return { time: getHumanReadableIndianTimeFromDate(now) };
    },
});
// export const sendSmsTool = tool({
//     description: 'this function send sms/message to people',
//     parameters: z.object({
//         phoneNumber: z.number().describe('phone number'),
//     }),
//     execute: async ({ phoneNumber }) => {
//         console.log('sms sent to?', phoneNumber)
//         return {
//             message: "message sent!"
//         }
//     },
// })