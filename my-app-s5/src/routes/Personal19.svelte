<script lang="ts">
	// From ChatGPT: (https://chatgpt.com/c/6a4cd1ec-25dc-83e8-946f-828051898ce5)
	// 		 		 Learn: Modern Chromium browsers automatically expand closed
	// 		  		 <details> when a search match is found, without any JavaScript.

	type FavoriteFruitType = { value: string; label: string } | null;

	let searchValue = $state('');
	let open = $state(false);
	let favoriteFruit = $state<FavoriteFruitType>(null);

	const fruits = [
		{ value: 'mango', label: 'Mango' },
		{ value: 'watermelon', label: 'Watermelon' },
		{ value: 'apple', label: 'Apple' },
		{ value: 'pineapple', label: 'Pineapple' },
		{ value: 'orange', label: 'Orange' },
		{ value: 'grape', label: 'Grape' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'banana', label: 'Banana' },
		{ value: 'kiwi', label: 'Kiwi' },
		{ value: 'peach', label: 'Peach' },
		{ value: 'cherry', label: 'Cherry' },
		{ value: 'blueberry', label: 'Blueberry' },
		{ value: 'raspberry', label: 'Raspberry' },
		{ value: 'blackberry', label: 'Blackberry' },
		{ value: 'plum', label: 'Plum' },
		{ value: 'apricot', label: 'Apricot' },
		{ value: 'pear', label: 'Pear' },
		{ value: 'grapefruit', label: 'Grapefruit' },
	];

	const filteredFruits = $derived(
		searchValue === ''
			? fruits
			: fruits.filter((fruit) => fruit.label.toLowerCase().includes(searchValue.toLowerCase())),
	);

	// let placeholderText = $state('Chooose a fruit');
	let placeholderText = $derived(favoriteFruit?.label ?? 'Chooose a fruit');
</script>

<details bind:open class="outline outline-1">
	<summary class="relative flex cursor-pointer outline outline-1">
		<input
			class="w-full"
			bind:value={searchValue}
			placeholder={placeholderText}
			onclick={() => {
				searchValue = '';
				open = !open;
			}}
		/>
		<!-- Choose your favorite fruit: {favoriteFruit ? favoriteFruit.label : 'Select a fruit'} -->
	</summary>
	<ul class="max-h-[300px] overflow-y-scroll">
		{#each filteredFruits as fruit (fruit)}
			<li>
				<button
					class={`w-full text-left hover:bg-pink-100 ${favoriteFruit?.value === fruit.value ? 'bg-blue-300' : ''}`}
					onclick={() => {
						open = false;
						favoriteFruit = fruit;
						searchValue = '';
					}}
				>
					{fruit.label}
				</button>
			</li>
		{/each}
	</ul>
</details>

<p class="mt-5 italic text-gray-500">
	We set `open=false` when you click on any item. Inspiration from <a
		class="text-blue-700"
		href="https://svelte.dev/tutorial/svelte/welcome-to-svelte"
		>Svelte's playground example picker</a
	>.
</p>

<!--
Note: Do not move below tag above the <details> tag because that
	  causes the issue to only open the <details> when we explicitly click
	  for next search result in browser's search feature. -->
<div class="my-8 block italic text-gray-500">
	Try searching any fruit using `ctrl/cmd+f` and it should automatically expand the content of
	details tag.
</div>
<div class="my-8 block italic text-gray-500">
	The best way to test this componet for the automatic opening of the details tag is by commenting
	the debugger (state debuggign) and commenting the right half side of the screen so that search
	doesn't search for the text in our codeblocks. Also, the browser search (ctrl/cmd+f) only opens
	the details tag if the first item in the page is from the contents of the details tag.
</div>

<pre>{JSON.stringify({ placeholderText, favoriteFruit, searchValue }, null, 2)} </pre>

<style>
	summary {
		/* Hide the triagle marker. */
		list-style: none;
	}
</style>
