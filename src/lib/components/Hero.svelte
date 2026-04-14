<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import { scrollTo } from '$lib/utils/scroll';

	let loaderDone = $state(false);
	let loaderProgress = $state(0);

	onMount(async () => {
		const { gsap } = await import('gsap');

		// Loader
		const tl = gsap.timeline();
		tl.to({ v: 0 }, {
			v: 100, duration: 1.0, ease: 'power2.inOut',
			onUpdate() { loaderProgress = Math.round(this.targets()[0].v); }
		});
		tl.to('.hero-loader', { opacity: 0, duration: 0.35, ease: 'power2.in', onComplete() { loaderDone = true; } }, '+=0.15');

		// Reveal
		tl.from('.hero-avatar', { scale: 0.5, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' }, '+=0.05');
		tl.from('.hero-word', { y: 80, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' }, '-=0.2');
		tl.from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.2');
	});
</script>

{#if !loaderDone}
	<div class="hero-loader fixed inset-0 z-100 flex flex-col items-center justify-center bg-white">
		<div class="mb-3 text-xs font-medium tracking-widest text-neutral-300">{resume.name}</div>
		<div class="h-[2px] w-48 overflow-hidden rounded-full bg-neutral-100">
			<div class="h-full rounded-full bg-neutral-900 transition-none" style="width: {loaderProgress}%;"></div>
		</div>
	</div>
{/if}

<section id="hero" class="relative flex min-h-svh items-center overflow-hidden">
	<div class="absolute inset-0 overflow-hidden" aria-hidden="true">
		<div class="absolute -top-20 right-[15%] h-[400px] w-[400px] rounded-full bg-neutral-100/60 blur-3xl" style="animation: gentle-float 6s ease-in-out infinite;"></div>
		<div class="absolute top-[60%] -left-20 h-[300px] w-[300px] rounded-full bg-neutral-50 blur-3xl" style="animation: gentle-float 8s ease-in-out infinite 1s;"></div>
	</div>

	<div class="relative mx-auto w-full max-w-6xl px-6 py-24 md:py-32">
		<!-- Avatar -->
		<div class="hero-avatar mb-8">
			<img
				src="/user.png"
				alt={resume.name}
				class="h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-white"
				onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
			/>
		</div>

		<!-- Giant text — mixed weight like the inspiration -->
		<h1 class="text-[clamp(2.2rem,5.5vw,5rem)] leading-[1.1] tracking-tight">
			<span class="hero-word inline text-neutral-300">I'm {resume.name.split(' ')[0]}, a</span>{' '}
			<span class="hero-word inline font-bold text-neutral-900">{resume.title}</span>{' '}
			<span class="hero-word inline text-neutral-300">building elegant</span>{' '}
			<span class="hero-word inline text-neutral-300">web experiences</span>{' '}
			<span class="hero-word inline text-neutral-300">from {resume.location}</span>
		</h1>

		<!-- Subtle CTA row -->
		<div class="mt-10 flex flex-wrap items-center gap-4">
			<button
				onclick={() => scrollTo('#projects')}
				class="hero-word group inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black hover:shadow-lg active:scale-[0.98]"
			>
				View work
				<svg class="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
			</button>
			<button
				onclick={() => scrollTo('#contact')}
				class="hero-word text-sm text-neutral-400 transition-colors hover:text-neutral-700"
			>
				Get in touch &rarr;
			</button>
		</div>
	</div>

	<div class="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2">
		<div class="flex h-9 w-5 items-start justify-center rounded-full border border-neutral-200 p-1.5">
			<div class="h-1.5 w-0.5 rounded-full bg-neutral-400" style="animation: scroll-hint 2s ease-in-out infinite;"></div>
		</div>
	</div>
</section>
