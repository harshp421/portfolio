<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import SectionHeading from './SectionHeading.svelte';

	// Rank progression — E to S, Solo Leveling style
	const ranks = ['E', 'B', 'S'];

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
		<SectionHeading label="Experience" title="Rank progression" />

		<div class="relative">
			<!-- Timeline line with glow -->
			<div class="absolute top-0 bottom-0 left-[11px] w-px md:left-[11px]">
				<div
					class="h-full w-full bg-gradient-to-b from-indigo-500/30 via-indigo-500/10 to-transparent"
				></div>
			</div>

			<div class="space-y-10">
				{#each resume.experience as exp, i}
					{@const rank = ranks[resume.experience.length - 1 - i] ?? 'E'}
					<div class="timeline-item group relative pl-10">
						<!-- Dot with glow on hover -->
						<div
							class="absolute left-0 top-1.5 flex h-[23px] w-[23px] items-center justify-center"
						>
							<div
								class="h-3 w-3 rounded-full border-2 border-indigo-500/30 bg-[#050510] transition-all group-hover:border-indigo-400 group-hover:bg-indigo-500/20 group-hover:shadow-[0_0_12px_rgba(99,102,241,0.4)]"
							></div>
						</div>

						<!-- Card -->
						<div class="sl-panel glow-border-hover rounded-2xl p-6">
							<div
								class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between"
							>
								<div class="flex items-start gap-3">
									<!-- Rank badge -->
									<div
										class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/5"
									>
										<span
											class="text-lg font-black text-indigo-400 {rank === 'S'
												? 'sl-text-glow'
												: ''}">{rank}</span
										>
									</div>
									<div>
										<h3 class="text-lg font-semibold text-slate-100">
											{exp.role}
										</h3>
										<p class="text-sm text-indigo-400/80">{exp.company}</p>
									</div>
								</div>
								<div
									class="font-mono text-xs text-slate-600 sm:text-right"
								>
									{exp.period}<br />{exp.location}
								</div>
							</div>

							<ul class="mt-4 space-y-2">
								{#each exp.description as item}
									<li
										class="flex gap-3 text-sm leading-relaxed text-slate-400"
									>
										<span
											class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500/40"
										></span>
										{item}
									</li>
								{/each}
							</ul>

							{#if exp.stack}
								<div class="mt-4 flex flex-wrap gap-1.5">
									{#each exp.stack as tech}
										<span
											class="rounded-md bg-indigo-500/5 px-2.5 py-0.5 text-xs text-indigo-400/50 border border-indigo-500/10"
										>
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
