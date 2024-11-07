<!-- 13/45 -->
<!-- https://svelte.dev/tutorial/svelte/spread-props -->
<script lang="ts">
	import PackageInfo from './PackageInfo.svelte';

	const pkg = {
		name: 'svelte',
		version: 5,
		description: 'blazing fast',
		website: 'https://svelte.dev'
	};
</script>

<!-- Awesome - Typescript does validation of types of passed value to the props type of the `PackageInfo` compoent. -->
<PackageInfo {...pkg} />
