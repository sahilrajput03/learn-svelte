<!-- 54/75 -->
<!-- https://svelte.dev/tutorial/svelte/tweens -->

<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = tweened(0.5, {
		duration: 400,
		easing: cubicOut
	});
</script>

<progress value={$progress}></progress>

<button class="btn-primary" onclick={() => progress.set(0)}> 0% </button>

<button class="btn-primary" onclick={() => progress.set(0.25)}> 25% </button>

<button class="btn-primary" onclick={() => progress.set(0.5)}> 50% </button>

<button class="btn-primary" onclick={() => progress.set(0.75)}> 75% </button>

<button class="btn-primary" onclick={() => progress.set(1)}> 100% </button>

<p class="mt-3 italic text-purple-500">
	Tip: For more precise knowledge on setting up easing function, please refer the info in the
	tutorial from the top-right tutorial link.
</p>

<style>
	progress {
		display: block;
		width: 100%;
		margin-bottom: 20px;
	}
</style>
