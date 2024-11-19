<!-- Visit: http://localhost:5173/?car=i20 -->
<script lang="ts">
	import { page } from '$app/stores';

	const car = $page.url.searchParams.get('car');
</script>

<h1 class="text-3xl">Query Params</h1>

{#if !!car}
	Car is {car}
{/if}

<a class="block text-sky-800 underline" href="/">{`${$page.url.host}/`}</a>

<div class="flex">
	<a class="block text-sky-800 underline" href="/?car=hyundai">{`${$page.url.host}/?car=hyundai`}</a
	>
	<button class="btn-primary ms-3" onclick={() => location.reload()}>Refresh page</button>
</div>

<div class="mt-5 text-red-600">
	Note: You need to refresh the page in order to see the query search params after visiting {`${$page.url.host}/?car=hyundai`}.
</div>

<div class="mt-5">
	Math.random(): {Math.random()}
</div>
