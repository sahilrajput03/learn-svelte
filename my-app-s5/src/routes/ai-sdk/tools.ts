import { tool } from "ai";
import { z } from "zod";

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