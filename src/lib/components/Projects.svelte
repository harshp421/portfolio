<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import ProjectCard from './ProjectCard.svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#projects .proj-label', {
			scrollTrigger: { trigger: '#projects', start: 'top 80%' },
			y: 20, opacity: 0, duration: 0.6, ease: 'power3.out'
		});

		gsap.from('#projects .project-card', {
			scrollTrigger: { trigger: '#projects .project-card', start: 'top 85%' },
			y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out'
		});
	});
</script>

<section id="projects" class="py-24 md:py-32">
	<div class="mx-auto max-w-5xl px-6">
		<p class="proj-label mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">Work</p>
		<h2 class="proj-label text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Selected projects</h2>

		<div class="mt-10 grid gap-5 md:grid-cols-2">
			{#each resume.projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
