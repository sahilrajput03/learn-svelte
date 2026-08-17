import indentIconSvg from '$lib/icons/indent.svg?raw';
import outdentIconSvg from '$lib/icons/outdent.svg?raw';

function buildToolbarIcon(svgMarkup: string) {
	const wrapper = document.createElement('span');
	wrapper.innerHTML = svgMarkup.trim();
	const svg = wrapper.firstElementChild as SVGSVGElement | null;
	if (!svg) return wrapper;

	svg.setAttribute('width', '1em');
	svg.setAttribute('height', '1em');
	svg.setAttribute('aria-hidden', 'true');
	svg.style.display = 'block';
	return svg;
}

export function createIndentToolbarIcon() {
	return buildToolbarIcon(indentIconSvg);
}

export function createOutdentToolbarIcon() {
	return buildToolbarIcon(outdentIconSvg);
}
