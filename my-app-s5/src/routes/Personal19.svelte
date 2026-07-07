<script lang="ts">
	// From ChatGPT: (https://chatgpt.com/c/6a4cd1ec-25dc-83e8-946f-828051898ce5)
	// 		 		 Learn: Modern Chromium browsers automatically expand closed
	// 		  		 <details> when a search match is found, without any JavaScript.

	let open = $state(false);
	let favoriteFruit = $state('');
	const fruits = ['mango', 'apple', 'strawberry'];
</script>

<!-- TODO: Add a input search field inside the <summary> tag so I can search as well. -->

<details bind:open class="outline outline-1">
	<summary class="cursor-pointer outline outline-1"
		>Choose your favorite fruit: {favoriteFruit ? favoriteFruit : 'Select a fruit'}</summary
	>
	<ul>
		{#each fruits as fruit (fruit)}
			<li>
				<button
					class="w-full text-left hover:bg-yellow-100"
					onclick={() => {
						open = false;
						favoriteFruit = fruit;
					}}
				>
					{fruit}
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
	Try searching for texts like {fruits.join(', ')} using `ctrl/cmd+f` and it should automatically expand
	the content of details tag.
</div>
