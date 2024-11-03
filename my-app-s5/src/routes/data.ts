/* This file is consumed in file://./Group38.svelte */
let previous = 50;
let data: number[] = [];

function next() {
    // `value` here would be mostly greater but sometimes smaller than `previous` because of `-0.4` here
    const value = previous + Math.random() - 0.4;
    previous = value; // we update `previous` whenever new value is created

    return value;
}

for (let i = 0; i < 100; i += 1) {
    data.push(next()); // we create sample 100 initial values
}

export function poll() {
    // data.slice(1) will contain all elements of data starting from the second element
    return data = [...data.slice(1), next()];
}
