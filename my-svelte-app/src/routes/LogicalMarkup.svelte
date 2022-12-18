<script>
	let user = { loggedIn: false };

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}

	let x = 1;

	// Data to loop over in markup
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' }
	];
</script>

<h1>Logics in Markup</h1>

<!-- To conditionally render some markup, we wrap it in an if block: -->
<!-- LEARN: A # character always indicates a block opening tag. A / character always indicates a block closing tag. A : character, as in {:else}, indicates a block continuation tag. Don't worry — you've already learned almost all the syntax Svelte adds to HTML. -->

{#if user.loggedIn}
	<button on:click={toggle}> Log out (using simple if)</button>
{/if}

{#if !user.loggedIn}
	<button on:click={toggle}> Log in (using simple if)</button>
{/if}

<!-- Using single if/else loop -->
{#if user.loggedIn}
	<button on:click={toggle}> Log out (using if/else)</button>
{:else}
	<button on:click={toggle}> Log in (using if/else)</button>
{/if}

<!-- Multiple conditions chaining -->
{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}

<!-- loop over lists of data, use an each block: -->
<!-- The expression (cats, in this case) can be any array or array-like object (i.e. it has a length property). You can loop over generic iterables with each [...iterable] -->
<!-- You can get the current `index` as a second argument for e.g., `i`, like so: -->
{#each cats as cat, i}
	<li>{cat.name} has ID: {i}</li>
{/each}

<h3>Using destructuring syntax</h3>
{#each cats as { name, id }}
	<li>{name} has ID: {id}</li>
{/each}
