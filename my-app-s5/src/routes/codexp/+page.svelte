<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';

	onMount(() => {
		async function main() {
			const { data } = await axios.get('/codexp');
			console.log('🚀 ~ data?', data);
		}
		main();
	});
</script>

Hello world 1.
