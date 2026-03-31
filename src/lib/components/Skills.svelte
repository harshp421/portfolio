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
		<SectionHeading label="Arsenal" title="What I work with" />

		<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each resume.skills as group}
				<div class="skill-group">
					<h3
						class="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-indigo-400/60"
					>
						<span class="h-px w-4 bg-indigo-500/30"></span>
						{group.category}
					</h3>
					<div class="flex flex-wrap gap-2">
						{#each group.items as skill}
							<span
								class="rounded-md border border-indigo-500/10 bg-indigo-500/[0.03] px-3.5 py-1.5 text-sm text-slate-400 transition-all hover:border-indigo-500/25 hover:bg-indigo-500/[0.06] hover:text-indigo-300"
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
