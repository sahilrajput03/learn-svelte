<script>
	let numbers = [1, 2, 3, 4];

	// way 1
	function addByPushMethod() {
		numbers.push(numbers.length + 1);
		numbers = numbers; // necessary to trigger reactivity
	}

	// way 2
	function addBySpreadOperator() {
		numbers = [...numbers, numbers.length + 1];
	}

	// way 3:
	function addByPropertyAssignment() {
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

	// let sum; // This is *optional*.
	// *FROM SVELTE DOCS*:
	// 		If a reactive statement consists entirely of an
	// 		assignment to an undeclared variable, Svelte will
	// 		inject a let declaration on your behalf.
	$: sum = numbers.reduce((t, n) => t + n, 0); // when numbers are updated sum is updated automatically.
</script>

<h1>Learn Reactiveness</h1>

<u><b>Updating arrays and objects:</b></u>
<div>
	Learn: Svelte's reactivity is triggered by assignments. Methods that mutate arrays or objects will
	not trigger updates by themselves. So you *must* have below statement i.e, `numbers = numbers` to
	trigger DOM update.
</div>
<div>
	Note: The same rule applies to array methods such as pop, shift, and splice and to objects methods
	such as Map.set, Set.add, etc.
</div>

<p>
	numbers: [{numbers.join(', ')}]
</p>

<p>
	Sum of {numbers.join(' + ')} is {sum}.
</p>

Add new via:
<br />

<div>
	<button on:click={addByPushMethod}>
		<div>way1:</div>
		<code>numbers.push(numbers.length + 1) </code>
		<div>
			Requires explicit reassigning of `numbers` variable to
			<div />
			<div>itself becoz of svelte's reactivity works only via assignments.</div>
		</div>
	</button>
	<span />
</div>

<div>
	<button on:click={addBySpreadOperator}>
		<div>way2</div>
		<code>numbers = [...numbers, numbers.length + 1]</code>
		<div>Using ES6 Spread Syntax</div>
	</button>
</div>

<div>
	<button on:click={addByPropertyAssignment}>
		<div>way3:</div>
		<code>numbers[numbers.length] = numbers.length + 1</code>
		<div>Add new by assigning directly to properties of arrays and objects.</div>
	</button>
</div>

<style>
	button {
		margin: 1rem;
	}
</style>
