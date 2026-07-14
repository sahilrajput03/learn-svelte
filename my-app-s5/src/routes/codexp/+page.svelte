<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';

	// TODO: Create a link to be able to browse this page from UI - http://localhost:5173/codexp

	onMount(() => {
		async function main() {
			const { data } = await axios.get('/codexp');
			console.log('🚀 ~ data?', data);
		}
		main();
	});
</script>

Hello world 1.
