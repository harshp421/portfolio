<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import ProjectCard from './ProjectCard.svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#projects .section-label', {
			scrollTrigger: { trigger: '#projects', start: 'top 80%' },
			y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
		});
		gsap.from('#projects .section-title', {
			scrollTrigger: { trigger: '#projects', start: 'top 80%' },
			y: 40, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out'
		});
		gsap.from('#projects .project-card', {
			scrollTrigger: { trigger: '#projects .project-card', start: 'top 85%' },
			y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
		});
	});
</script>

<section id="projects" class="py-24 md:py-32" data-system-msg="Quest board unlocked. Reviewing cleared quests...">
	<div class="mx-auto max-w-6xl px-6">
		<div class="mb-16">
			<div class="section-label mb-3 flex items-center gap-3">
				<span class="h-px w-6 bg-system-blue/40"></span>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-system-blue/70">Quest Board</span>
			</div>
			<h2 class="section-title text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">Cleared Quests</h2>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			{#each resume.projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
