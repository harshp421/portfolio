<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import SectionHeading from './SectionHeading.svelte';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#experience .section-heading', {
			scrollTrigger: { trigger: '#experience', start: 'top 80%' },
			y: 50,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out'
		});

		gsap.from('#experience .timeline-item', {
			scrollTrigger: { trigger: '#experience .timeline-item', start: 'top 85%' },
			y: 50,
			opacity: 0,
			duration: 0.7,
			stagger: 0.15,
			ease: 'power3.out'
		});
	});
</script>

<section id="experience" class="py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading label="Experience" title="Where I've worked" />

		<div class="relative">
			<!-- Timeline line -->
			<div
				class="absolute top-0 bottom-0 left-[11px] w-px bg-gradient-to-b from-zinc-800 via-zinc-800 to-transparent md:left-[11px]"
			></div>

			<div class="space-y-12">
				{#each resume.experience as exp, i}
					<div class="timeline-item group relative pl-10">
						<!-- Dot -->
						<div
							class="absolute left-0 top-1.5 flex h-[23px] w-[23px] items-center justify-center"
						>
							<div
								class="h-3 w-3 rounded-full border-2 border-zinc-700 bg-zinc-950 transition-colors group-hover:border-violet-500 group-hover:bg-violet-500/20"
							></div>
						</div>

						<!-- Card -->
						<div class="glass rounded-2xl p-6 transition-colors hover:bg-white/[0.04]">
							<div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<h3 class="text-lg font-semibold text-zinc-100">{exp.role}</h3>
									<p class="text-sm text-violet-400">{exp.company}</p>
								</div>
								<div class="text-sm text-zinc-500">
									{exp.period} · {exp.location}
								</div>
							</div>

							<ul class="mt-4 space-y-2">
								{#each exp.description as item}
									<li class="flex gap-3 text-sm leading-relaxed text-zinc-400">
										<span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600"
										></span>
										{item}
									</li>
								{/each}
							</ul>

							{#if exp.stack}
								<div class="mt-4 flex flex-wrap gap-1.5">
									{#each exp.stack as tech}
										<span class="rounded-full bg-zinc-800/60 px-2.5 py-0.5 text-xs text-zinc-500">
											{tech}
										</span>
									{/each}
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
