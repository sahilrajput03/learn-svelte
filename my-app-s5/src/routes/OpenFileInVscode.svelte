<script lang="ts">
	import { projectPath } from '../projectPath';
	import { dev } from '$app/environment';

	type PropsType = { relativeFilePath: string };
	const { relativeFilePath }: PropsType = $props();
</script>

<a
	class="text-[0.675rem] text-orange-400"
	href={`vscode://file${projectPath.concat(relativeFilePath)}:1`}>Open file in VS Code</a
>

<!-- [Tested on MacOS] Below code works to open a vscode file from directly browser. -->
<!-- SOURCE: https://stackoverflow.com/a/53786004/10012446 -->
<!-- <a
	href="vscode://file/Users/apple/Documents/github_repos/learn-svelte/my-app-s5/src/routes/Group1.svelte"
	>Open file</a
> -->
