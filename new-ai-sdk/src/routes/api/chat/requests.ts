import { axiosInstance } from "./tools";
import { dumbSimpleReadableTime } from "$lib/time-utils";
import { env } from '$env/dynamic/private';

export const isTestEnvironment = env.NODE_ENV === 'test'
console.log("🚀 ~ isTestEnvironment:", isTestEnvironment)

// Mocking Pitfalls in Vitest Docs - https://vitest.dev/guide/mocking.html#mocking-pitfalls

// This function can not be put in and thus I restructued to put this function in this different file from the originial tools.ts file because mocking doesn't work if you utilise same function in same file as its consumed. Also it is said very clearly in the docs of vitest here - *Mocking Pitfalls* - https://vitest.dev/guide/mocking.html#mocking-pitfalls
export const createReminderRequest = async (payload) => {
    // * LEARN: We do not call api in test environment to prevent abuse of production
    if (isTestEnvironment) return;
    const response = await axiosInstance.post('/api/v1/reminder', payload)
    return response.data
}