<script lang="ts">
	export let answer: number;
	export let skyColor: string = 'blue'; // default value is blue but if prop is passed then default value will be overwritten by the value passed.
</script>

<h1>Dynamic Component(accepts props)</h1>
<p>The answer is {answer}</p>

<p style="color: white; background: {skyColor}; padding:1rem">Color of sky is: {skyColor}</p>

<!-- Chapter: SPREAD PROPS: Conversely, if you need to reference all the props that were passed into a component, including ones that weren't declared with export, you can do so by accessing $$props directly. It's not generally recommended, as it's difficult for Svelte to optimise, but it's useful in rare cases. -->
<p>{$$props.customMessage?.join(' ')}</p>
