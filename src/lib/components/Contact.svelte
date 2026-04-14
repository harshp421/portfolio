<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#contact .contact-reveal', {
			scrollTrigger: { trigger: '#contact', start: 'top 80%' },
			y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out'
		});
	});
</script>

<section id="contact" class="section-alt py-24 md:py-32">
	<div class="mx-auto max-w-5xl px-6">
		<div class="max-w-lg">
			<p class="contact-reveal mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">Contact</p>
			<h2 class="contact-reveal text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Let's work together</h2>
			<p class="contact-reveal mt-4 text-base leading-relaxed text-neutral-500">
				I'm open to new opportunities, freelance work, or just a conversation about building great software.
			</p>

			<div class="contact-reveal mt-8 flex flex-wrap gap-3">
				<a
					href="mailto:{resume.email}"
					class="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black hover:shadow-lg"
				>
					Say hello
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
				</a>
			</div>

			<div class="contact-reveal mt-8 flex flex-col gap-3">
				<a href="mailto:{resume.email}" class="group flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-neutral-700">
					<span class="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:border-neutral-300">
						<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
					</span>
					{resume.email}
				</a>
				<a href={resume.github} target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-neutral-700">
					<span class="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 transition-colors group-hover:border-neutral-300">
						<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
					</span>
					github.com/harshp421
				</a>
			</div>
		</div>
	</div>
</section>
