<!-- File consumed in file `Group6.svelte` -->
<!-- ! Note the `lang="ts"` in the script tag.  -->
<script lang="ts">
	type Props = { name: string; version: number; description: string; website: string };
	let { name, version, description, website }: Props = $props();

	// let props: Props = $props(); // another way to get props
</script>

<p>
	The <code>{name}</code> package is {description}. Download version {version} from
	<a href="https://www.npmjs.com/package/{name}">npm</a> and <a href={website}>learn more here</a>
</p>
