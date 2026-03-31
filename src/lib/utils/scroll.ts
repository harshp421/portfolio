import type Lenis from 'lenis';

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis) {
	instance = lenis;
}

export function scrollTo(target: string, offset = -80) {
	if (instance) {
		instance.scrollTo(target, { offset });
	}
}
