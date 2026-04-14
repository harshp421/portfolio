<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#experience .exp-label', {
			scrollTrigger: { trigger: '#experience', start: 'top 80%' },
			y: 20, opacity: 0, duration: 0.6, ease: 'power3.out'
		});

		gsap.from('#experience .exp-item', {
			scrollTrigger: { trigger: '#experience .exp-item', start: 'top 85%' },
			y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out'
		});
	});
</script>

<section id="experience" class="section-alt py-24 md:py-32">
	<div class="mx-auto max-w-5xl px-6">
		<p class="exp-label mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">Experience</p>
		<h2 class="exp-label text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">Where I've worked</h2>

		<div class="mt-12 space-y-0 divide-y divide-neutral-100">
			{#each resume.experience as exp}
				<div class="exp-item group py-8 first:pt-0 last:pb-0">
					<div class="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
						<div>
							<h3 class="text-lg font-semibold text-neutral-900">{exp.role}</h3>
							<p class="text-sm text-neutral-400">{exp.company} · {exp.location}</p>
						</div>
						<span class="text-sm text-neutral-400 sm:text-right">{exp.period}</span>
					</div>

					<ul class="mt-4 space-y-2">
						{#each exp.description as item}
							<li class="flex gap-3 text-sm leading-relaxed text-neutral-500">
								<span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-300"></span>
								{item}
							</li>
						{/each}
					</ul>

					{#if exp.stack}
						<div class="mt-4 flex flex-wrap gap-1.5">
							{#each exp.stack as tech}
								<span class="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-500">{tech}</span>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
