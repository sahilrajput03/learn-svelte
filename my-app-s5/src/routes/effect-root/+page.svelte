<script lang="ts">
	let count = $state(0);

	const cleanup1 = $effect.root(() => {
		$effect(() => {
			console.log('count?', count);
		});

		return () => {
			console.log('effect root cleanup');
		};
	});

	let onTheFlyEffectCleanup = $state() as () => void;

	const createOnTheFlyEffect = () => {
		onTheFlyEffectCleanup = $effect.root(() => {
			$effect(() => {
				console.log('count-fly?', count);
			});
			return () => console.log('on-the-fy: effect root cleanup');
		});
	};
</script>

<h1 class="pb-8 text-5xl font-bold">$effect.root</h1>

<button class="btn-primary font-bold" onclick={() => count++}>{count} (click me)</button>

<button class="btn-primary" onclick={cleanup1}>call cleanup</button>
<button class="btn-primary" onclick={createOnTheFlyEffect}
	>create <strong>on-the-fly effect</strong></button
>

<button class="btn-primary" onclick={onTheFlyEffectCleanup}
	>destroy <strong>on-the-fly effect</strong></button
>

<p class="mt-3 italic text-gray-600">Please refer logs in browser console to learn.</p>

<p>Learn: On the fly efffects can be created and destroyed multiple times.</p>
