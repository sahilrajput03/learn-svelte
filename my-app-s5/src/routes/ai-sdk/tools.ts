import { tool } from "ai";
import { z } from "zod";
import axios from "axios";

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


const isAppleMachine = process.env.USER === 'apple' // 🚀🚀🚀🚀🚀🚀
const apiUrl = isAppleMachine ? 'http://localhost:8080' : 'http://xiaomi-22031116ai.tail23f445.ts.net:8080'
export const axiosInstance = axios.create({ baseURL: apiUrl })
export const createReminder = async (payload) => {
    const response = await axiosInstance.post('/api/v1/reminder', payload)
    return response.data
}
export const createReminderTool = tool({
    description: 'Create a reminder',
    parameters: z.object({
        text: z.string().describe('The text or description of the reminder.'),
        scheduledTime: z.string().describe('The date and time when the reminder should be triggered.'),
        priority: z.number().describe('The priority level of the reminder, with 0 being low, 1 being medium, and 2 being high.').default(1),
    }),
    execute: async ({ text, scheduledTime, priority }) => {
        // create reminder
        // const secondsFromNow = 0;
        // const scheduledTime = new Date(Date.now() + secondsFromNow * 1000);
        console.log('▶️ createReminder tool call executed!', { text, scheduledTime, priority })
        await createReminder({
            title: text,
            scheduledTime,
            priority,
        })
        console.log('✅ createReminder tool call SUCESSFUL')
        return {
            message: "Success"
        };
    },
})


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