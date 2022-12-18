<script>
	let numbers = [1, 2, 3, 4];

	// Updating Arrays and Objects
	// ===========================

	// LEARN: Svelte's reactivity is triggered by assignments. Methods that mutate arrays or objects will not trigger updates by themselves. So you *must* have below statement i.e, `numbers = numbers` to trigger DOM update.
	// NOTE: The same rule applies to array methods such as pop, shift, and splice and to objects methods such as Map.set, Set.add, etc.
	// way 1 - Assign numbers to itself to tell the compiler it has changed:
	function addNumber() {
		numbers.push(numbers.length + 1);
		numbers = numbers;
	}

	// way 2 - ES6 spread syntax:
	function addNumber2() {
		numbers = [...numbers, numbers.length + 1];
	}

	// way 3 - Assignments to properties of arrays and objects:
	function addNumber3() {
		numbers[numbers.length] = numbers.length + 1;
	}

	// Below ways won't trigger reactivity on obj.foo.bar, unless you follow it up with obj = obj.
	// LEARN: A simple rule of thumb: the updated variable must directly appear on the left hand side of the assignment.
	// Bad 1:
	// const foo = obj.foo;
	// foo.bar = 'baz';

	// Bad 2:
	// function quox(thing) {
	// 	thing.foo.bar = 'baz';
	// }
	// quox(obj);

	// Calculating SUM:
	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<h1>Learn Reactiveness</h1>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}> Add a number </button>
<button on:click={addNumber2}> Add a number with ES6 spread syntax </button>
<button on:click={addNumber3}>
	Add a number (Assignments to properties of arrays and objects)
</button>
