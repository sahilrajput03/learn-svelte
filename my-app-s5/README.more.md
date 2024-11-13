## Errors to be reported on svelte github repository

**Date: 2:33PM, 7 November, 2024**

_TLDR: Always use `$state<type>` syntax to define types._

Note: This issues happens only with `Array<T1>` or `T1[]` but working with simple types like string, number works fine e.g., `let name1: string = $state(1) // Type 'number' is not assignable to type 'string'`.

```ts
type T1 = { name: string };
let person1: T1 = $state({ name: 'jack', gender: 'male' }); // does not throw error
let person2 = $state<T1>({ name: 'jack', gender: 'male' }); // throws error - "'gender' does not exist in type 'T1'"

let personList1: Array<T1> = $state([{ name: 'jack', gender: 'male' }]); // does not throw error
let personList1 = $state<Array<T1>>([{ name: 'jack', gender: 'male' }]); // throws error - "'gender' does not exist in type 'T1'"
```
