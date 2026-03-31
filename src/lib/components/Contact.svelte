<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import MagneticButton from './MagneticButton.svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: { trigger: '#contact', start: 'top bottom', toggleActions: 'play none none none' }
		});
		tl.from('#contact .contact-label', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' })
			.from('#contact .contact-heading', { y: 60, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
			.from('#contact .contact-sub', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
			.from('#contact .contact-link', { y: 25, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, '-=0.3')
			.from('#contact .contact-cta', { scale: 0.9, opacity: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.2');
	});
</script>

<section id="contact" class="relative overflow-hidden py-32 md:py-44" data-system-msg="Quest available: Contact the Hunter">
	<div class="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.05]" style="background: radial-gradient(circle, rgba(0,102,255,0.8) 0%, transparent 70%);" aria-hidden="true"></div>

	<div class="relative mx-auto max-w-4xl px-6 text-center">
		<div class="contact-label mb-4 flex items-center justify-center gap-3">
			<span class="h-px w-6 bg-system-blue/40"></span>
			<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-system-blue/70">Contact</span>
			<span class="h-px w-6 bg-system-blue/40"></span>
		</div>

		<h2 class="contact-heading text-5xl font-bold tracking-tight text-slate-100 md:text-7xl">
			Let's work<br /><span class="sl-glow text-system-blue">together</span>
		</h2>

		<p class="contact-sub mx-auto mt-6 max-w-lg text-lg text-slate-500">
			I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
		</p>

		<div class="mt-12 flex flex-wrap items-center justify-center gap-3">
			<a href="mailto:{resume.email}" class="contact-link sl-panel flex items-center gap-3 rounded-full px-5 py-3 font-mono text-xs text-slate-400 transition-all hover:border-system-blue/25 hover:text-slate-200">
				<svg class="h-4 w-4 text-system-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
				{resume.email}
			</a>
			<a href={resume.github} target="_blank" rel="noopener noreferrer" class="contact-link sl-panel flex items-center gap-3 rounded-full px-5 py-3 font-mono text-xs text-slate-400 transition-all hover:border-system-blue/25 hover:text-slate-200">
				<svg class="h-4 w-4 text-system-blue" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
				GitHub
			</a>
			<a href="tel:{resume.phone}" class="contact-link sl-panel flex items-center gap-3 rounded-full px-5 py-3 font-mono text-xs text-slate-400 transition-all hover:border-system-blue/25 hover:text-slate-200">
				<svg class="h-4 w-4 text-system-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
				{resume.phone}
			</a>
		</div>

		<div class="contact-cta mt-14">
			<MagneticButton
				href="mailto:{resume.email}"
				class="group inline-flex items-center gap-3 rounded-md border border-system-blue/30 bg-system-blue/10 px-10 py-5 font-mono text-sm font-semibold text-system-blue transition-all hover:border-system-blue/50 hover:bg-system-blue/20 hover:shadow-[0_0_40px_rgba(0,102,255,0.15)]"
				strength={0.25}
			>
				Say Hello
				<svg class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
			</MagneticButton>
		</div>
	</div>
</section>
