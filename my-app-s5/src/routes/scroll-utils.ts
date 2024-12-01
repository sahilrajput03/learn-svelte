
// Src: mdn: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView)
export const isBrowser = () => typeof document !== 'undefined'

export function scrollToTop() {
    if (isBrowser()) document?.documentElement.scrollIntoView(true) // works for mobile (poco m4) even when keyboard is open (TESTED)

}
export function scrollToBottom() {
    if (isBrowser()) document?.documentElement?.scrollIntoView?.(false); // works for mobile (poco m4) even when keyboard is open (TESTED)
}

