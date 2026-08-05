<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { Schema, DOMParser } from 'prosemirror-model';
	import { schema } from 'prosemirror-schema-basic';
	import { addListNodes } from 'prosemirror-schema-list';
	import { exampleSetup } from 'prosemirror-example-setup';
	import 'prosemirror-view/style/prosemirror.css';
	import 'prosemirror-menu/style/menu.css';
	import 'prosemirror-gapcursor/style/gapcursor.css';
	import 'prosemirror-example-setup/style/style.css';

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

<!-- TODO: Show this only if url doesn't contain 107 in url. -->
<a class="text-blue-600 underline" href="/group107"
	>Go to Group 107 for full screen experience of this component.
</a>

<div class="space-y-4">
	<div class="pm-shell rounded-lg border border-slate-300 bg-white shadow-sm">
		<div bind:this={editorEl} id="editor" class="pm-editor"></div>
	</div>

	<div bind:this={contentEl} id="content" hidden aria-hidden="true">
		<h3>ProseMirror basic example</h3>
		<p>This is the initial document. You should see a toolbar, editable text, and list controls.</p>
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

	/* Add bullets and numbers to unordered and ordered lists. */
	:global(.ProseMirror ul) {
		list-style: disc;
		padding-left: 30px;
	}
	:global(.ProseMirror ol) {
		list-style: decimal;
		padding-left: 30px;
	}
	:global(.ProseMirror li) {
		display: list-item;
	}
	/* ENDS_HERE */

	.pm-shell {
		overflow: hidden;
	}

	:global(.ProseMirror-menubar) {
		border-bottom: 1px solid rgb(226 232 240);
		background: rgb(248 250 252);
	}

	:global(.ProseMirror-menubar-wrapper) {
		margin-bottom: 0;
	}

	.pm-editor {
		min-height: 240px;
		padding: 0.75rem;
	}
</style>
