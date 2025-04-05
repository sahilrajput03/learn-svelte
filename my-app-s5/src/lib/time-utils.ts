
// Usage: `getHumanReadableIndianTimeFromDate(new Date())`
export const getHumanReadableIndianTimeFromDate = (date) => date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) // Output: 20/2/2025, 9:07:18 pm

// 20/2/2025, 9:07:18 pm
export const getHumanReadableIndianTime = () => getHumanReadableIndianTimeFromDate(new Date())