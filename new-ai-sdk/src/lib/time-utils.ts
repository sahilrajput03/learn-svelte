
// Usage: `getHumanReadableIndianTimeFromDate(new Date())`
export const getHumanReadableIndianTimeFromDate = (date) => date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) // Output: 20/2/2025, 9:07:18 pm

// 20/2/2025, 9:07:18 pm
export const getHumanReadableIndianTime = () => getHumanReadableIndianTimeFromDate(new Date())

export const dumbSimpleReadableTime = (date: Date) => {
    const isSecondsZero = date.getSeconds() === 0

    // Time format
    const time = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        // & 🚀 We do not return seconds in time if seconds is zero
        second: isSecondsZero ? undefined : '2-digit',
        hour12: true,
    });

    // Date format
    const formattedDate = date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    // Combine time and date
    const result = `${time}, ${formattedDate}`;
    // console.log(result); // 11:20:40 PM, 5 April 2025
    return result
}

export const humanReadableTodayDayAndDate = () => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const humanReadableDate = today.toLocaleDateString('en-US', options as any);

    // console.log(humanReadableDate); // Saturday, April 5, 2025
    return humanReadableDate
}