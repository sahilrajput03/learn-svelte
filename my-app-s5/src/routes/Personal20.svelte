<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { Schema, DOMParser } from 'prosemirror-model';
	import { schema } from 'prosemirror-schema-basic';
	import { addListNodes } from 'prosemirror-schema-list';
	import { exampleSetup } from 'prosemirror-example-setup';

	let editorEl: HTMLDivElement | null = null;
	let contentEl: HTMLDivElement | null = null;

	onMount(() => {
		if (!editorEl || !contentEl) return;

		// Add list support to the basic schema, matching the ProseMirror example.
		const mySchema = new Schema({
			nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
			marks: schema.spec.marks,
		});

		const view = new EditorView(editorEl, {
			state: EditorState.create({
				doc: DOMParser.fromSchema(mySchema).parse(contentEl),
				plugins: exampleSetup({ schema: mySchema }),
			}),
		});

		(window as typeof window & { view?: EditorView }).view = view;

		return () => view.destroy();
	});
</script>

<div class="space-y-4">
	<div class="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
		<div bind:this={editorEl} id="editor" class="min-h-[240px]"></div>
	</div>

	<div bind:this={contentEl} id="content" hidden aria-hidden="true">
		<h3>ProseMirror basic example</h3>
		<p>
			This is the initial document. You should see a toolbar, editable text, and list controls.
		</p>
		<p>Try typing, selecting text, and adding a list item.</p>
		<ul>
			<li>A list item</li>
			<li>Another list item</li>
		</ul>
	</div>
</div>

<style>
	:global(.ProseMirror) {
		min-height: 240px;
		outline: none;
	}

	:global(.ProseMirror p) {
		margin: 0 0 0.75rem;
	}
</style>
