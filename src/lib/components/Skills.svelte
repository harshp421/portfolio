<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';

	let visible = $state(false);

	let tilts = $state<{ rx: number; ry: number; active: boolean }[]>(
		resume.individualSkills.map(() => ({ rx: 0, ry: 0, active: false }))
	);

	function handleMouseMove(e: MouseEvent, i: number) {
		const card = e.currentTarget as HTMLElement;
		const rect = card.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		tilts[i] = { rx: (y - 0.5) * -14, ry: (x - 0.5) * 14, active: true };
	}

	function handleMouseLeave(i: number) {
		tilts[i] = { rx: 0, ry: 0, active: false };
	}

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#skills .skills-heading', {
			scrollTrigger: { trigger: '#skills', start: 'top 80%' },
			y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out'
		});

		ScrollTrigger.create({
			trigger: '#skills .skills-grid',
			start: 'top 88%',
			onEnter: () => { visible = true; }
		});
	});
</script>

<section id="skills" class="py-24 md:py-32">
	<div class="mx-auto max-w-5xl px-6">
		<p class="skills-heading mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">Skills</p>
		<h2 class="skills-heading text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Tools I work with</h2>

		<div class="skills-grid mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
			{#each resume.individualSkills as skill, i}
				{@const t = tilts[i]}
				<div
					class="liquid-glass-card group relative cursor-default overflow-hidden rounded-2xl px-4 py-3.5"
					style="
						opacity: {visible ? 1 : 0};
						transform: perspective(600px) rotateX({t.rx}deg) rotateY({t.ry}deg) translateY({visible ? 0 : 15}px);
						transition: opacity 0.5s ease {i * 0.03}s, {t.active ? '' : 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),'} box-shadow 0.3s ease;
						{t.active ? 'transition: opacity 0.5s ease, box-shadow 0.3s ease;' : ''}
					"
					onmousemove={(e) => handleMouseMove(e, i)}
					onmouseleave={() => handleMouseLeave(i)}
					role="listitem"
				>
					<!-- Glass layers -->
					<div class="pointer-events-none absolute inset-0 rounded-2xl bg-white/50 backdrop-blur-xl" aria-hidden="true"></div>
					<div class="pointer-events-none absolute inset-0 rounded-2xl border border-white/60" aria-hidden="true"></div>

					<!-- Shimmer light band -->
					<div
						class="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
						style="background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.4) 50%, transparent 55%);"
						aria-hidden="true"
					></div>

					<!-- Inner shadow for depth -->
					<div class="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(0,0,0,0.03)]" aria-hidden="true"></div>

					<div class="relative z-10 text-center text-sm font-medium text-neutral-600 transition-colors group-hover:text-neutral-900">
						{skill.name}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.liquid-glass-card {
		background: rgba(255, 255, 255, 0.35);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.7);
		border: 1px solid rgba(255, 255, 255, 0.5);
		transform-style: preserve-3d;
	}
	.liquid-glass-card:hover {
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06), 0 2px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.9);
	}
</style>
