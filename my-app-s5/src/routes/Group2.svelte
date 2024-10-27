<!-- 6-9/45 -->
<script>
	// Rune
	let count = $state(0);
	function increment() {
		count++;
	}

	let numbers = $state([1, 2, 3, 4]);
	let total = $derived(numbers.reduce((t, n) => t + n, 0));

	function addNumber() {
		// numbers[numbers.length] = numbers.length + 1; // state reacts to `reassignments`

		numbers.push(numbers.length + 1); // state also reacts to  `deep reactivity`
		// console.log('numbers?', $state.snapshot(numbers)); // log whenever numbers change.
	}

	// Docs - https://svelte.dev/docs/svelte/$inspect
	// Way to log to console whenever `numbers` change.
	// Note: we can add multiple states in here as well.
	// $inspect('numbers?', numbers);

	// To customize log style of `$inspect`
	$inspect('numbers?', numbers).with((type, a1, a2) => {
		console.log('a,b,c?', type, a1, a2); // 'type' is always 'init' or 'update'
	});
</script>

<button onclick={increment}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>

<p>{numbers.join(' + ')} = {total}</p>

<button onclick={addNumber}> Add a number </button>
