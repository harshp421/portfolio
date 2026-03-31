<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import SectionHeading from './SectionHeading.svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#skills .section-heading', {
			scrollTrigger: { trigger: '#skills', start: 'top 80%' },
			y: 50,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out'
		});

		gsap.from('#skills .skill-group', {
			scrollTrigger: { trigger: '#skills .skill-group', start: 'top 85%' },
			y: 40,
			opacity: 0,
			duration: 0.6,
			stagger: 0.08,
			ease: 'power3.out'
		});
	});
</script>

<section id="skills" class="py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading label="Skills" title="What I work with" />

		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each resume.skills as group}
				<div class="skill-group">
					<h3 class="mb-4 text-sm font-medium uppercase tracking-wider text-zinc-500">
						{group.category}
					</h3>
					<div class="flex flex-wrap gap-2">
						{#each group.items as skill}
							<span
								class="rounded-full border border-zinc-800 bg-zinc-900/50 px-3.5 py-1.5 text-sm text-zinc-300 transition-colors hover:border-zinc-600 hover:text-zinc-100"
							>
								{skill}
							</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
