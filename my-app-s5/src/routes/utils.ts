// This file is consumed in file://./Group12.svelte
export async function roll() {
    // Fetch a random number between 0 and 6
    // (with a delay, so that we can see it)
    return new Promise((fulfil, reject) => {
        setTimeout(() => {
            // simulate a flaky network
            if (Math.random() < 0.3) {
                reject(new Error('Request failed'));
                return;
            }

            fulfil(Math.ceil(Math.random() * 6));
        }, 1000);
    });
}


// Below functions are consumed in file - `Group38.svelte`
export function scale(domain: number[], range: number[]) {
    const m = (range[1] - range[0]) / (domain[1] - domain[0]);
    return (value: any) => range[0] + m * (value - domain[0]);
}
export function getTicks(min: number, max: number) {
    const ticks = [];
    let n = 10 * Math.ceil(min / 10);

    while (n < max) {
        ticks.push(n);
        n += 10;
    }

    return ticks;
}
