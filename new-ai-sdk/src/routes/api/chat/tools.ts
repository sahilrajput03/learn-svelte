import { tool } from "ai";
import { z } from "zod";
import axios from "axios";
import { dumbSimpleReadableTime } from "$lib/time-utils";
import { createReminderEXECUTE, getCurrentTimeForCreatingReminderEXECUTE } from "./toolExecutes";

// & LEARN: In tools (function calling), the name of parameters matter higherr than the description given of the parameter in the functionCall definition. (checked with ChatGPT too).

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
 * - "Set a reminder for listening music tomorrow at 10:00 a.m."
 * ! Do not use phrases like below because they are hallucinatory:
 *  - "Set reminder to drink in 5mins." -- 
 */


const apiUrl = 'http://localhost:8080'
let car = 20
export const axiosInstance = axios.create({ baseURL: apiUrl })

export const createReminderTool = tool({
    description: 'Create a reminder',
    parameters: z.object({
        // * Learn: Parameter name are on more priority than description (src: https://chatgpt.com/c/67f13768-3b28-8007-a721-531a6c22e1a3)
        text: z.string().describe('The text or description of the reminder.'),
        scheduledTime: z.string().describe('The date and time when the reminder should be triggered.'),
        priority: z.number().describe('The priority level of the reminder, with 0 being low, 1 being medium, and 2 being high.').default(1),
    }),
    execute: createReminderEXECUTE
})

export const getCurrentTimeForCreatingReminderTool = tool({
    description: 'Fetches the current date and time and returns it in ISO format.',
    parameters: z.object({}), // no input needed
    execute: getCurrentTimeForCreatingReminderEXECUTE,
});

export const getHumanReadableTimeTool = tool({
    description: 'Human readable current time and date.',
    parameters: z.object({}), // no input needed
    execute: async () => {
        const now = new Date();
        console.log('❤️️️️️❤️Calling getHumanReadableTimeTool:', dumbSimpleReadableTime(now))
        return { time: dumbSimpleReadableTime(now) };
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