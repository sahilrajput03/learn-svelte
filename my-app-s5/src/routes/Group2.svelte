<!-- 6-9/45 -->
<!-- https://svelte.dev/tutorial/svelte/state -->

<script lang="ts">
	// Rune
	let count = $state(0);
	function increment() {
		count++;
	}

	let numbers = $state([1, 2, 3, 4]);
	let total = $derived(numbers.reduce((t, n) => t + n, 0));

	let users = $state([
		{ name: 'Alice', age: '27' },
		{ name: 'Bob', age: '33' }
	]);

	function addNumber() {
		// numbers[numbers.length] = numbers.length + 1; // state reacts to `reassignments`
		count++; // to test multiple state printing with `$state.snapshot(...)`

		numbers.push(numbers.length + 1); // state also reacts to  `deep reactivity`
		// console.log('numbers?', numbers); //* prints but with warning to avoid using it

		//* Docs - https://svelte.dev/docs/svelte/$state#$state.snapshot
		// ^ Will log `[ ... ]` rather than `Proxy [ ... ]`
		//! Note: `$state.snapshot()` requires exactly one argument.
		// console.log('numbers?', $state.snapshot(numbers)); //& snapshot is awesome but `$inspect` is love.
		// console.log('numbers,total,count?', $state.snapshot({ count, numbers, total })); //~ also works with multiple states

		// console.log('numbers[0]?', numbers[0]); // primitive, thus it is is okay and svelte doesn't throw any warning in console
		// console.log('users[0]?', users[0]); // proxy, thus svelte throws warning to either use `$inspect()` or `$state.snapshot(..)` inside console.log
		console.log('users[0]?', $state.snapshot(users[0])); // * pefectly fine
	}

	//* Docs - https://svelte.dev/docs/svelte/$inspect
	//& Way to log to console whenever `numbers` change.
	// $inspect('numbers?', numbers);
	//^ Note: we can add multiple states in here as well.
	// $inspect('numbers?', numbers, "count?", count); //~ awesome
	// $inspect({numbers, count}); //~ awesome

	//& To customize log style of `$inspect`
	// $inspect('numbers?', numbers).with((type, a1, a2) => {
	// 	console.log('a,b,c?', type, a1, a2); // 'type' is always 'init' or 'update'
	// });
</script>

<button class="btn-primary" onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<hr />

<p>{numbers.join(' + ')} = {total}</p>

<button class="btn-primary" onclick={addNumber}> Add a number & increase click count </button>

<pre>
{JSON.stringify(numbers, null, 2)}
</pre>

<style>
	hr {
		margin: 50px;
	}
</style>
