<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import { Schema, DOMParser, Node as PMNode, type MarkSpec } from 'prosemirror-model';
	import { schema } from 'prosemirror-schema-basic';
	import { addListNodes } from 'prosemirror-schema-list';
	import { buildMenuItems, exampleSetup } from 'prosemirror-example-setup';
	import { MenuItem } from 'prosemirror-menu';
	import { toggleMark } from 'prosemirror-commands';
	import { page } from '$app/state';
	import 'prosemirror-view/style/prosemirror.css';
	import 'prosemirror-menu/style/menu.css';
	import 'prosemirror-gapcursor/style/gapcursor.css';
	import 'prosemirror-example-setup/style/style.css';

	// Inspiration: https://prosemirror.net/examples/basic/
	// 	Code written by codex on top of above code.

	let editorEl: HTMLDivElement | null = null;
	let contentEl: HTMLDivElement | null = null;
	let editorJson = $state('');

	const storageKey = 'personal20-prosemirror-doc';

	const strikeMark: MarkSpec = {
		parseDOM: [{ tag: 's' }, { tag: 'strike' }, { tag: 'del' }],
		toDOM() {
			return ['s', 0] as const;
		},
	};

	const underlineMark: MarkSpec = {
		parseDOM: [{ tag: 'u' }],
		toDOM() {
			return ['u', 0] as const;
		},
	};

	onMount(() => {
		if (!editorEl || !contentEl) return;

		// Add list support to the basic schema, matching the ProseMirror example.
		const mySchema = new Schema({
			nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
			marks: schema.spec.marks.update('strike', strikeMark).update('underline', underlineMark),
		});

		const strikeButton = new MenuItem({
			title: 'Toggle strikethrough',
			label: 'S',
			// Below css applies to above label text only in the toolbar.
			css: 'text-decoration: line-through; text-decoration-thickness: 2px; text-underline-offset: 0.15em; padding: 2px 8px;',
			run: toggleMark(mySchema.marks.strike),
		});
		const underlineButton = new MenuItem({
			title: 'Toggle underline',
			label: 'U',
			css: 'text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 0.15em; padding: 2px 8px;',
			run: toggleMark(mySchema.marks.underline),
		});
		const menuItems = buildMenuItems(mySchema);
		const [strongButton, emButton, ...otherInlineButtons] = menuItems.inlineMenu[0];
		const initialDoc = DOMParser.fromSchema(mySchema).parse(contentEl);
		const savedDocJson = localStorage.getItem(storageKey);

		let startDoc = initialDoc;
		if (savedDocJson) {
			try {
				startDoc = PMNode.fromJSON(mySchema, JSON.parse(savedDocJson));
			} catch {
				// Ignore invalid saved JSON and fall back to the HTML seed above.
			}
		}

		const syncDocJson = (state: EditorState) => {
			editorJson = JSON.stringify(state.doc.toJSON(), null, 2);
			localStorage.setItem(storageKey, editorJson);
		};

		const view = new EditorView(editorEl, {
			state: EditorState.create({
				doc: startDoc,
				plugins: exampleSetup({
					schema: mySchema,
					menuContent: [
						[strongButton, emButton, underlineButton, strikeButton, ...otherInlineButtons],
						...menuItems.fullMenu.slice(1),
					],
				}),
			}),
			dispatchTransaction(tr) {
				const nextState = view.state.apply(tr);
				view.updateState(nextState);
				syncDocJson(nextState);
			},
		});

		(window as typeof window & { view?: EditorView }).view = view;
		syncDocJson(view.state);

		return () => view.destroy();
	});

	const clearSavedDoc = () => {
		localStorage.removeItem(storageKey);
		location.reload();
	};
</script>

{#if !page.url.pathname.includes('107')}
	<a class="text-blue-600 underline" href="/group107"
		>🔴🔴🔴 Go to Group 107 for full screen experience of this component.
	</a>
{/if}

<div class="my-3 bg-yellow-100 px-3 text-pink-700">
	As you type in below text editor it is synced to localstorage.
</div>

<div class="space-y-4">
	<div class="pm-shell rounded-lg border border-slate-300 bg-white shadow-sm">
		<div bind:this={editorEl} id="editor" class="pm-editor"></div>
	</div>

	<div class="rounded-lg border border-slate-300 bg-slate-50 p-4 shadow-sm">
		<div class="mb-2 flex items-center justify-between gap-3">
			<div class="text-sm font-semibold text-slate-700">Live JSON</div>
			<button
				class="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs"
				onclick={clearSavedDoc}
			>
				Clear saved doc
			</button>
		</div>
		<pre
			class="max-h-[320px] overflow-auto rounded-md bg-slate-900 p-3 text-xs text-slate-100">{editorJson}</pre>
	</div>

	<div bind:this={contentEl} id="content" hidden aria-hidden="true">
		<h1>ProseMirror basic example</h1>
		<p>This is paragraph</p>
		<h2>This is heading 2</h2>
		<p>This is the initial document. You should see a toolbar, editable text, and list controls.</p>
		<h3>Unordered List (heading 3)</h3>
		<ul>
			<li>A list item</li>
			<li>Another list item</li>
		</ul>

		<h3>Ordered List (heading 3)</h3>
		<ol>
			<li>A list item</li>
			<li>Another list item</li>
		</ol>
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

	/* For styles of Heading1 to Heading6. */
	:global(.ProseMirror h1),
	:global(.ProseMirror h2),
	:global(.ProseMirror h3),
	:global(.ProseMirror h4),
	:global(.ProseMirror h5),
	:global(.ProseMirror h6) {
		font-weight: 700;
		line-height: 1.2;
		margin: 1rem 0 0.5rem;
	}
	:global(.ProseMirror h1) {
		font-size: 2rem;
	}
	:global(.ProseMirror h2) {
		font-size: 1.5rem;
	}
	:global(.ProseMirror h3) {
		font-size: 1.25rem;
	}
	:global(.ProseMirror h4) {
		font-size: 1.125rem;
	}
	:global(.ProseMirror h5) {
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}
	:global(.ProseMirror h6) {
		font-size: 0.875rem;
		color: rgb(100 116 139);
	}
	/* ENDS_HERE */

	/* For strikethrough text*/
	:global(.ProseMirror s) {
		text-decoration: line-through;
	}

	/* For underline text */
	:global(.ProseMirror u) {
		text-decoration: underline;
		text-underline-offset: 0.15em;
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
		line-height: 1.4;
	}

	:global(.ProseMirror li > p) {
		margin: 0;
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
