<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import SectionHeading from './SectionHeading.svelte';
	import ProjectCard from './ProjectCard.svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#projects .section-heading', {
			scrollTrigger: { trigger: '#projects', start: 'top 80%' },
			y: 50,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out'
		});

		gsap.from('#projects .project-card', {
			scrollTrigger: { trigger: '#projects .project-card', start: 'top 85%' },
			y: 50,
			opacity: 0,
			duration: 0.7,
			stagger: 0.12,
			ease: 'power3.out'
		});
	});
</script>

<section id="projects" class="py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading label="Quests" title="What I've built" />

		<div class="grid gap-6 md:grid-cols-2">
			{#each resume.projects as project}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>
