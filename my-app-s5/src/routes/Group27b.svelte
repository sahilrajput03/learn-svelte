<!-- 35-b/45 -->
<!-- https://svelte.dev/tutorial/svelte/component-styles -->

<script>
	import Box2 from './Box2.svelte';
</script>

<!-- / //* Any parent element (such as <div class="boxes">) can set the value of --color, but we can also set it on individual components: -->
<!--/ //^ Also: The values can be dynamic, like any other attribute. -->
<div class="boxes">
	<!--/ //& Assigning css variables like below wraps the content of the component around `<svelte-css-wrapper>` (see dom elements in browser) and thus it can affect `.parent > .child.` (SAHI: You can stil use `.parent .child` seletor IMO.)  -->
	<Box2 --color="red" />
	<Box2 --color="green" />
	<Box2 --color="blue" />
</div>
