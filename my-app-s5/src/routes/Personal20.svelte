<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { EditorState } from 'prosemirror-state';
	import { EditorView } from 'prosemirror-view';
	import {
		Schema,
		DOMParser,
		DOMSerializer,
		Node as PMNode,
		type NodeSpec,
		type NodeType,
		type MarkType,
		type MarkSpec,
	} from 'prosemirror-model';
	import { schema } from 'prosemirror-schema-basic';
	import {
		addListNodes,
		wrapInList,
		splitListItemKeepMarks,
		liftListItem,
		sinkListItem,
	} from 'prosemirror-schema-list';
	import { buildMenuItems, exampleSetup } from 'prosemirror-example-setup';
	import { MenuItem, icons } from 'prosemirror-menu';
	import { toggleMark } from 'prosemirror-commands';
	import { keymap } from 'prosemirror-keymap';
	import { page } from '$app/state';
	import { createIndentToolbarIcon, createOutdentToolbarIcon } from '$lib/prosemirror-toolbar-icons';
	import 'prosemirror-view/style/prosemirror.css';
	import 'prosemirror-menu/style/menu.css';
	import 'prosemirror-gapcursor/style/gapcursor.css';
	import 'prosemirror-example-setup/style/style.css';

	/**
	 * Inspiration: https://prosemirror.net/examples/basic/
	 * Code written by codex on top of above code.
	 */

	let editorEl: HTMLDivElement | null = null;
	let contentEl: HTMLDivElement | null = null;
	let editorJson = $state('');
	let editorHtml = $state('');
	let showRenderedHtml = $state(false);
	let linkPromptOpen = $state(false);
	let linkPromptHref = $state('');
	let linkPromptTitle = $state('');
	let linkPromptOpenInNewTab = $state(false);
	let linkPromptView: EditorView | null = null;
	let linkPromptHrefInput = $state<HTMLInputElement | null>(null);
	let linkMarkType: MarkType | null = null;

	const storageKey = 'personal20-prosemirror-doc';
	const absoluteHrefPattern = /^[a-zA-Z][a-zA-Z\d+\-.]*:|^\/\//;

	function getAnchorHrefFromTarget(target: EventTarget | null) {
		if (!(target instanceof Node)) return null;

		let node: Node | null = target;
		while (node && node.nodeType !== Node.ELEMENT_NODE) {
			node = node.parentNode;
		}

		if (!(node instanceof Element)) return null;

		const anchor = node.closest('a[href]');
		if (!(anchor instanceof HTMLAnchorElement)) return null;

		const href = anchor.getAttribute('href');
		if (!href || absoluteHrefPattern.test(href)) return null;

		return href;
	}

	async function openLinkPrompt(view: EditorView) {
		linkPromptView = view;
		linkPromptHref = '';
		linkPromptTitle = '';
		linkPromptOpenInNewTab = true;
		linkPromptOpen = true;
		await tick();
		linkPromptHrefInput?.focus();
		linkPromptHrefInput?.select();
	}

	function closeLinkPrompt() {
		linkPromptOpen = false;
		linkPromptView = null;
	}

	function submitLinkPrompt() {
		if (!linkPromptView || !linkMarkType) return;

		const href = linkPromptHref.trim();
		if (!href) return;

		const attrs = {
			href,
			title: linkPromptTitle.trim() || null,
			openInNewTab: linkPromptOpenInNewTab,
		};

		toggleMark(linkMarkType, attrs)(linkPromptView.state, linkPromptView.dispatch);
		linkPromptView.focus();
		closeLinkPrompt();
	}

	function blockRelativeLinkNavigation(event: MouseEvent) {
		const href = getAnchorHrefFromTarget(event.target);
		if (href) {
			event.preventDefault();
			event.stopPropagation();
		}
	}

	function markActive(state: EditorState, type: MarkType) {
		const { from, to, empty, $from: anchor } = state.selection;
		if (empty) return !!type.isInSet(state.storedMarks || anchor.marks());
		return state.doc.rangeHasMark(from, to, type);
	}

	const strikeMark: MarkSpec = {
		parseDOM: [{ tag: 's' }, { tag: 'strike' }, { tag: 'del' }],
		toDOM() {
			return ['s', 0] as const;
		},
	};

	const taskListSpec: NodeSpec = {
		attrs: {
			strikeWhenChecked: { default: false, validate: 'boolean' },
		},
		content: 'task_item+',
		group: 'block',
		parseDOM: [
			{
				tag: 'ul',
				priority: 100,
				getAttrs(dom: HTMLElement) {
					if (!dom.querySelector('li input[type="checkbox"]')) return false;
					return {
						strikeWhenChecked:
							dom.getAttribute('data-strike-when-checked') === 'true' ||
							dom.getAttribute('data-strike-when-checked') === '1',
					};
				},
			},
		],
		toDOM(node) {
			return [
				'ul',
				{
					'data-task-list': 'true',
					'data-strike-when-checked': String(node.attrs.strikeWhenChecked),
					class: 'task-list',
				},
				0,
			] as const;
		},
	};

	const taskItemSpec: NodeSpec = {
		attrs: {
			checked: { default: false, validate: 'boolean' },
		},
		content: 'paragraph block*',
		defining: true,
		parseDOM: [
			{
				tag: 'li',
				priority: 100,
				getAttrs(dom: HTMLElement) {
					const checkbox = dom.querySelector('input[type="checkbox"]');
					if (!checkbox) return false;
					return {
						checked:
							checkbox?.hasAttribute('checked') ?? dom.getAttribute('data-checked') === 'true',
					};
				},
			},
		],
		toDOM(node) {
			return [
				'li',
				{
					'data-task-item': 'true',
					'data-checked': String(node.attrs.checked),
					class: 'task-item',
				},
				[
					'span',
					{ contenteditable: 'false', class: 'task-item__checkbox' },
					['input', { type: 'checkbox', checked: node.attrs.checked ? 'checked' : null }],
				],
				['div', { class: 'task-item__content' }, 0],
			] as const;
		},
	};

	const underlineMark: MarkSpec = {
		parseDOM: [{ tag: 'u' }],
		toDOM() {
			return ['u', 0] as const;
		},
	};

	// We override the default ProseMirror link mark so we can store and render
	// the optional "open in new tab" setting from the custom prompt below, and
	// actually make links open in a new tab when requested.
	const linkMark: MarkSpec = {
		attrs: {
			href: { validate: 'string' },
			title: { default: null, validate: 'string|null' },
			openInNewTab: { default: false, validate: 'boolean' },
		},
		inclusive: false,
		parseDOM: [
			{
				tag: 'a[href]',
				getAttrs(dom: HTMLElement) {
					return {
						href: dom.getAttribute('href'),
						title: dom.getAttribute('title'),
						openInNewTab: dom.getAttribute('target') === '_blank',
					};
				},
			},
		],
		toDOM(node) {
			const { href, title, openInNewTab } = node.attrs;
			return [
				'a',
				openInNewTab
					? { href, title, target: '_blank', rel: 'noopener noreferrer' }
					: { href, title },
				0,
			] as const;
		},
	};

	onMount(() => {
		if (!editorEl || !contentEl) return;

		// Add list support to the basic schema, matching the ProseMirror example.
		const mySchema = new Schema({
			nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block')
				// `task_list` is the outer checklist container, and `task_item` is
				// the individual checklist row with its checked state.
				.append({
					task_list: taskListSpec,
					task_item: taskItemSpec,
				}),
			marks: schema.spec.marks
				.update('strike', strikeMark)
				.update('underline', underlineMark)
				.update('link', linkMark),
		});
		linkMarkType = mySchema.marks.link;
		const taskListType = mySchema.nodes.task_list;
		const taskItemType = mySchema.nodes.task_item;

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
		// This toolbar button wraps the selection in the custom checklist nodes.
		const taskListButton = new MenuItem({
			title: 'Toggle checklist',
			label: '☑',
			css: 'padding: 2px 8px; font-size: 0.95rem;',
			run: wrapInList(taskListType),
		});
		// This variant uses the same checklist nodes, but checked items render with strike-through.
		const taskListStrikeButton = new MenuItem({
			title: 'Toggle checklist with strikethrough',
			label: '☒',
			css: 'padding: 2px 8px; font-size: 0.95rem;',
			run: wrapInList(taskListType, { strikeWhenChecked: true }),
		});
		// Mobile-friendly indentation controls for checklist items.
		const taskIndentButton = new MenuItem({
			title: 'Indent checklist item',
			icon: { dom: createIndentToolbarIcon() },
			enable(state) {
				return sinkListItem(taskItemType)(state);
			},
			run: sinkListItem(taskItemType),
		});
		const taskOutdentButton = new MenuItem({
			title: 'Outdent checklist item',
			icon: { dom: createOutdentToolbarIcon() },
			enable(state) {
				return liftListItem(taskItemType)(state);
			},
			run: liftListItem(taskItemType),
		});
		const linkButton = new MenuItem({
			title: 'Add or remove link',
			icon: icons.link,
			active(state) {
				return markActive(state, mySchema.marks.link);
			},
			enable(state) {
				return !state.selection.empty;
			},
			run(state, dispatch, view) {
				if (markActive(state, mySchema.marks.link)) {
					toggleMark(mySchema.marks.link)(state, dispatch);
					return true;
				}

				if (!view) return false;
				openLinkPrompt(view);
				return true;
			},
		});
		const menuItems = buildMenuItems(mySchema);
		const [strongButton, emButton, codeButton] = menuItems.inlineMenu[0];
		const initialDoc = DOMParser.fromSchema(mySchema).parse(contentEl);
		const savedDocJson = localStorage.getItem(storageKey);

		// Checklist items need their own key bindings so Enter/Tab keep working
		// with the custom task_item node instead of the default list item type.
		const taskListKeymap = keymap({
			Enter: splitListItemKeepMarks(taskItemType),
			'Mod-[': liftListItem(taskItemType),
			Tab: sinkListItem(taskItemType),
			'Shift-Tab': liftListItem(taskItemType),
		});

		let startDoc = initialDoc;
		if (savedDocJson) {
			try {
				startDoc = PMNode.fromJSON(mySchema, JSON.parse(savedDocJson));
			} catch {
				// Ignore invalid saved JSON and fall back to the HTML seed above.
			}
		}

		const syncDocJson = (state: EditorState) => {
			// console.log('syncDocJson?', syncDocJson);
			editorJson = JSON.stringify(state.doc.toJSON(), null, 2);
			const htmlWrapper = document.createElement('div');
			htmlWrapper.appendChild(
				DOMSerializer.fromSchema(mySchema).serializeFragment(state.doc.content),
			);
			editorHtml = htmlWrapper.innerHTML;
			localStorage.setItem(storageKey, editorJson);
		};

		const view = new EditorView(editorEl, {
			state: EditorState.create({
				doc: startDoc,
				plugins: [
					taskListKeymap,
					...exampleSetup({
						schema: mySchema,
						menuContent: [
							[
								strongButton,
								emButton,
								codeButton,
								underlineButton,
								strikeButton,
								linkButton,
								taskListButton,
								taskListStrikeButton,
								taskOutdentButton,
								taskIndentButton,
							],
							...menuItems.fullMenu.slice(1),
						],
					}),
				],
			}),
			// Keep the checkbox UI and the ProseMirror node state in sync.
			handleClickOn(view, pos, node, nodePos, event) {
				if (!(event.target instanceof HTMLInputElement)) return false;
				if (event.target.type !== 'checkbox') return false;
				if (node.type !== taskItemType) return false;

				view.dispatch(
					view.state.tr.setNodeMarkup(nodePos, undefined, {
						...node.attrs,
						checked: !node.attrs.checked,
					}),
				);
				return true;
			},
			dispatchTransaction(tr) {
				const nextState = view.state.apply(tr);
				view.updateState(nextState);
				syncDocJson(nextState);
			},
		});

		// This is to fix issue of relative links in the editor opening in links as
		// 		we do not want it to be openeable. Also, links with absolute urls i.e,
		// 		starign with http[s]:// by default do not open when clickin on them.
		if (editorEl) {
			editorEl.addEventListener('click', blockRelativeLinkNavigation, true);
		}

		(window as typeof window & { view?: EditorView }).view = view;
		syncDocJson(view.state);

		return () => view.destroy();
	});

	const clearSavedDoc = () => {
		localStorage.removeItem(storageKey);
		location.reload();
	};
</script>

<div class="border p-3 font-bold">ver. 0.1</div>

{#if !page.url.pathname.includes('107')}
	<a class="text-blue-600 underline" href="/group107"
		>🔴🔴🔴 Go to Group 107 for full screen experience of this component.
	</a>
{/if}

<div class="my-3 bg-yellow-100 px-3 text-pink-700">
	As you type in below text editor it is synced to localstorage.
</div>

<div class="space-y-4">
	{#if linkPromptOpen}
		<div class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 px-4 py-6">
			<div class="w-full max-w-md rounded-xl border border-slate-200 bg-white p-5 shadow-2xl">
				<div class="space-y-4">
					<label class="block">
						<input
							bind:this={linkPromptHrefInput}
							bind:value={linkPromptHref}
							class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
							placeholder="https://example.com"
							required
						/>
					</label>

					<label class="block">
						<input
							bind:value={linkPromptTitle}
							class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
							placeholder="Optional title"
						/>
					</label>

					<label
						class="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
					>
						<input
							bind:checked={linkPromptOpenInNewTab}
							type="checkbox"
							class="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
						/>
						<span>Open link in a new tab</span>
					</label>
				</div>

				<div class="mt-5 flex justify-end gap-2">
					<button
						type="button"
						class="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
						onclick={closeLinkPrompt}
					>
						Cancel
					</button>
					<button
						type="button"
						class="rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
						onclick={submitLinkPrompt}
					>
						Add link
					</button>
				</div>
			</div>
		</div>
	{/if}

	<div class="flex items-center justify-end gap-3">
		<button
			class="rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
			onclick={() => (showRenderedHtml = !showRenderedHtml)}
			aria-pressed={showRenderedHtml}
		>
			{showRenderedHtml ? 'Hide rendered HTML' : 'Show rendered HTML'}
		</button>
	</div>

	{#if showRenderedHtml}
		<div class="rounded-lg border border-slate-300 bg-slate-50 p-4 shadow-sm">
			<div class="mb-2 text-sm font-semibold text-slate-700">Rendered HTML</div>
			<div class="ProseMirror prose-preview rounded-md border border-slate-200 bg-white p-4">
				{@html editorHtml}
			</div>
		</div>
	{/if}

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
	/* Learn: The class "ProseMirror" class applies styles to different items like h1-h6, links, etc for *both* editor and rendered html. Please use this class as part any selector for which you want to apply any styles for both of them. */

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

	:global(.ProseMirror a) {
		color: rgb(37 99 235);
		text-decoration: underline;
		cursor: pointer;
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

	:global(.ProseMirror .task-list) {
		list-style: none;
		padding-left: 0;
	}

	:global(.ProseMirror .task-item) {
		display: flex;
		align-items: flex-start;
		gap: 0.5rem;
		list-style: none;
	}

	:global(.ProseMirror .task-item__checkbox) {
		display: inline-flex;
		flex: 0 0 auto;
		margin-top: 0.15rem;
	}

	:global(.ProseMirror .task-item__content) {
		flex: 1 1 auto;
		min-width: 0;
	}

	/* Only strike the checked item’s own paragraph, so nested task lists stay readable. */
	:global(.ProseMirror .task-list[data-strike-when-checked='true'] .task-item[data-checked='true'] > .task-item__content > p) {
		text-decoration: line-through;
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
