<script>
	let user = $state({
		firstname: 'Ada',
		lastname: 'Lovelace'
	});

	let toy = $state('❤️ I am a toy and changing me does *NOT* trigger debug statement in markup)');
</script>

{@debug user}
<!-- Note: Hovering in markup's value isn't beneficial (because it is a `proxy` type)
 though 😇 `value` is always printed in browser console, which is AMAZING! 😇 -->

<input class="input-primary" bind:value={user.firstname} />
<input class="input-primary" bind:value={user.lastname} />

<h1>Hello {user.firstname}!</h1>

<input class="input-primary mt-5 w-full" bind:value={toy} />
