import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function registerGSAP() {
	gsap.registerPlugin(ScrollTrigger);
}

export function fadeUpOnScroll(selector: string, options?: { stagger?: number; delay?: number }) {
	gsap.from(selector, {
		scrollTrigger: {
			trigger: selector,
			start: 'top 85%',
			toggleActions: 'play none none none'
		},
		y: 60,
		opacity: 0,
		duration: 0.8,
		stagger: options?.stagger ?? 0.1,
		delay: options?.delay ?? 0,
		ease: 'power3.out'
	});
}

export function heroTextReveal(selector: string, delay = 0) {
	return gsap.from(selector, {
		y: 100,
		opacity: 0,
		duration: 1,
		stagger: 0.12,
		ease: 'power3.out',
		delay
	});
}
