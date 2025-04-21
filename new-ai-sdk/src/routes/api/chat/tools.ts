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