<script lang="ts">
	// From ChatGPT: (https://chatgpt.com/c/6a4cd1ec-25dc-83e8-946f-828051898ce5)
	// 		 		 Learn: Modern Chromium browsers automatically expand closed
	// 		  		 <details> when a search match is found, without any JavaScript.

	const fruits = ['mango', 'apple', 'strawberry'];
</script>

<details>
	<summary>Choose your favorite fruit:</summary>
	<ul>
		{#each fruits as fruit (fruit)}
			<li>
				{fruit}
			</li>
		{/each}
	</ul>
</details>

<!--
Note: Do not move below tag above the <details> tag because that
	  causes the issue to only open the <details> when we explicitly click
	  for next search result in browser's search feature. -->
<div class="my-8 block italic text-gray-500">
	Try searching for texts like {fruits.join(', ')} using `ctrl/cmd+f` and it should automatically expand
	the content of details tag.
</div>
