// File cosumed in Group28.svelte
//& This function is executed whenever the menu is mounted on the dom i.e, whenever you open the menu.
export function trapFocus(node: any) {
    //^ Here `node` is the html element on which this action is used.
    // console.log('node?', node);

    const previous: any = document.activeElement;
    console.log('previous?', previous) // this log is printed whenever menu is opened.

    function focusable(): any {
        return Array.from(node.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
    }

    //& This is triggedred when menu is open and you press any button from keyboard
    function handleKeydown(event: any) {
        if (event.key !== 'Tab') return;

        // code reaches this line only if you press `Tab` or `Shift+Tab` or any other combination pressed by user having `Tab` key
        const current = document.activeElement;
        console.log('current?', current);


        const elements = focusable();
        const first = elements.at(0);
        const last = elements.at(-1)

        //& This is for `<Shift>+<Tab>` key
        if (event.shiftKey && current === first) {
            alert('focussing last now')
            last.focus();
            event.preventDefault(); //^ Sahil: we need `event.preventDefault` so that default `Tab` key action is not done i.e, which is automatic control by browser.
        }

        //& This for <Tab> key (i.e., without `Shift` key)
        if (!event.shiftKey && current === last) {
            alert('focussing first now')
            first.focus();
            event.preventDefault(); //^ Sahil: we need `event.preventDefault` so that default `Tab` key action is not done i.e, which is automatic control by browser.
        }
    }

    $effect(() => {
        focusable()[0]?.focus();
        node.addEventListener('keydown', handleKeydown);

        return () => {
            node.removeEventListener('keydown', handleKeydown);
            previous?.focus();
            alert('cleanup of effect and action function...') // this is executed whenerver the menu is closed
        };
    });
}
