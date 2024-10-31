// File cosumed in Group28.svelte
export function trapFocus(node: any) {
    const previous: any = document.activeElement;

    function focusable(): any {
        return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    }

    function handleKeydown(event: any) {
        if (event.key !== 'Tab') return;

        const current = document.activeElement;

        const elements: any = focusable();
        const first: any = elements.at(0);
        const last: any = elements.at(-1)

        if (event.shiftKey && current === first) {
            last.focus();
            event.preventDefault();
        }

        if (!event.shiftKey && current === last) {
            first.focus();
            event.preventDefault();
        }
    }

    $effect(() => {
        focusable()[0]?.focus();
        node.addEventListener('keydown', handleKeydown);

        return () => {
            node.removeEventListener('keydown', handleKeydown);
            previous?.focus();
        };
    });
}
