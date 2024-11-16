// This file is consumed in file://./Group28.svelte
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
            console.log('cleanup of effect and action function...') // this is executed whenerver the menu is closed
        };
    });
}

type ArgsType = { numberOfImages: number, interval: number }
export function createSlideShow({ numberOfImages, interval }: ArgsType) {
    let playing = $state(true);
    let index = $state(0);

    $effect(() => {
        let id = setInterval(() => {
            if (!playing) return;

            if (index === numberOfImages - 1) {
                index = 0;
            } else {
                console.log('here.....2')
                index++;
            }
        }, interval);
        return () => clearInterval(id);
    });

    const next = () => {
        if (index === numberOfImages - 1) {
            index = 0;
        } else {
            index += 1;
        }
    };
    const previous = () => {
        if (index === 0) {
            index = numberOfImages - 1;
        } else {
            index -= 1;
        }
    };
    const playPause = () => (playing = !playing)


    // * Why use a getter property? Because simply returning variable doesn't work! Docs - https://svelte.dev/blog/runes#Beyond-components
    // https://github.com/sahilrajput03/sahilrajput03/blob/main/learn-js.md#getter-property-in-an-object
    return {
        get playing() { return playing; },
        get index() { return index },
        next,
        previous,
        playPause
    }
}