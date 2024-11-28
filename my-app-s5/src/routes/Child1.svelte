<!-- This file is consumed in file://./Group61b.svelte -->

<script lang="ts">
	import { getContext } from 'svelte';
	import type { UserContextType } from './Group61b.svelte';

	const context = getContext<UserContextType>('my-context');
</script>

<br />
<u>Child component (`Child1.svelte`):</u>
<b>I am {context.age} years old and my name is {context.name}.</b>
