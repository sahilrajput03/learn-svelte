<!-- 28/45 -->
<!-- https://svelte.dev/tutorial/svelte/select-bindings -->

<!-- Important (from tutorial):
 ================================== 
Because we haven’t set an initial value of selected, the binding
will set it to the default value (the first in the list)
automatically. Be careful though — until the binding is
initialised, selected remains undefined, so we can’t blindly
reference e.g. selected.id in the template.
-->

<script lang="ts">
	type QuestionType = { id: number; text: string };
	let questions: QuestionType[] = $state([
		{
			id: 1,
			text: `Where did you go to school?`
		},
		{
			id: 2,
			text: `What is your mother's name?`
		},
		{
			id: 3,
			text: `What is another personal fact that an attacker could easily find with Google?`
		}
	]);

	let selected = $state() as QuestionType;
	$inspect('selected?', selected);

	let answer = $state('');

	// @ts-ignore
	function handleSubmit(e) {
		e.preventDefault();

		alert(`answered question ${selected.id} (${selected.text}) with "${answer}"`);
	}
</script>

<u>
	<b>Insecurity questions</b>
</u>

<form onsubmit={handleSubmit}>
	<select
		bind:value={selected}
		onchange={(e: any) => {
			answer = ''; // to clear answer when we change the question
			console.log('onchange? - e.target.value?', e.target?.value); // `question.id`
		}}
	>
		{#each questions as question}
			<option value={question.id}>
				{question.text}
			</option>
		{/each}
	</select>

	<input bind:value={answer} />

	<button class="btn-primary" disabled={!answer} type="submit"> Submit </button>
</form>

<p>
	selected question {selected ? selected.id : '[waiting...]'}

	<br />
	<br />
	selected question:
	<!-- Note: Using `?.` here important otherwise we get can't error cannot access property of undefined. -->
	{selected?.text}
</p>

<style>
	input,
	select {
		border: 1px solid black;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
</style>
