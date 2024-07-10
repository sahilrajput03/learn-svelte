<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}

	let x = 1;

	// Data to loop over in markup
	let cats = [
		{ id: 'ID_1', name: 'Alice' },
		{ id: 'ID_2', name: 'Bob' },
		{ id: 'ID_3', name: 'Cherry' }
	];
</script>

<h1>Using #If, #If:Else and #Each in Markup</h1>

<!-- To conditionally render some markup, we wrap it in an if block: -->
<!-- LEARN: A # character always indicates a block opening tag. A / character always indicates a block closing tag. A : character, as in {:else}, indicates a block continuation tag. Don't worry — you've already learned almost all the syntax Svelte adds to HTML. -->

{#if user.loggedIn}
	<button on:click={toggle}> Log out (using single if)</button>
{/if}
{#if !user.loggedIn}
	<button on:click={toggle}> Log in (using single if)</button>
{/if}

<!-- Using single if/else loop -->
{#if user.loggedIn}
	<button on:click={toggle}> Log out (using if...else)</button>
{:else}
	<button on:click={toggle}> Log in (using if...else)</button>
{/if}

<h3>Conditional Rendering</h3>
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}

<section>
	<h2>Loop on array</h2>
	<div class="highlight">Loop on array using <code>#each</code>:</div>
	<!-- The variable used (`cats`) should be an iterable (array or array like) -->
	<!-- You can get the current `index` as a second argument for e.g., `i`, like so: -->
	{#each cats as cat, i}
		<div>{i + 1}. {cat.name}</div>
	{/each}

	<div class="highlight">Loop on array using <code>#each</code> using destructuring syntax:</div>
	<ul>
		{#each cats as { name, id }}
			<li>{id}</li>
		{/each}
	</ul>
</section>

<style>
	.highlight {
		margin-top: 1rem;
		font-weight: bolder;
	}
</style>
