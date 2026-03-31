<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import { RANK_COLORS } from '$lib/types';

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#experience .section-label', {
			scrollTrigger: { trigger: '#experience', start: 'top 80%' },
			y: 30, opacity: 0, duration: 0.6, ease: 'power3.out'
		});
		gsap.from('#experience .section-title', {
			scrollTrigger: { trigger: '#experience', start: 'top 80%' },
			y: 40, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out'
		});
		gsap.from('#experience .dungeon-card', {
			scrollTrigger: { trigger: '#experience .dungeon-card', start: 'top 85%' },
			y: 50, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out'
		});
	});
</script>

<section id="experience" class="py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<!-- Heading -->
		<div class="mb-16">
			<div class="section-label mb-3 flex items-center gap-3">
				<span class="h-px w-6 bg-system-blue/40"></span>
				<span class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-system-blue/70">Dungeon Log</span>
			</div>
			<h2 class="section-title text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">Clear History</h2>
		</div>

		<!-- Timeline -->
		<div class="relative">
			<!-- Timeline glow line -->
			<div class="absolute top-0 bottom-0 left-[11px] w-px bg-linear-to-b from-system-blue/30 via-system-blue/10 to-transparent"></div>

			<div class="space-y-8">
				{#each resume.experience as exp}
					{@const rc = RANK_COLORS[exp.rank]}
					<div class="dungeon-card group relative pl-10">
						<!-- Timeline dot -->
						<div class="absolute left-0 top-2 flex h-[23px] w-[23px] items-center justify-center">
							<div class="h-3 w-3 rounded-full border-2 border-system-blue/25 bg-void transition-all group-hover:border-system-blue group-hover:shadow-[0_0_12px_rgba(0,102,255,0.4)]"></div>
						</div>

						<!-- Card -->
						<div class="sl-panel rounded-xl p-6">
							<!-- Header row -->
							<div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
								<div class="flex items-start gap-3">
									<!-- Rank badge -->
									<div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg {rc.border} {rc.bg} {rc.glow}">
										<span class="text-lg font-black {rc.text}">{exp.rank}</span>
									</div>
									<div>
										<h3 class="text-lg font-semibold text-slate-100">{exp.role}</h3>
										<p class="text-sm text-system-blue/70">{exp.company}</p>
									</div>
								</div>
								<div class="font-mono text-[11px] text-slate-600 sm:text-right">
									{exp.period}<br />
									<span class="text-slate-700">Clear Time: {exp.duration}</span>
								</div>
							</div>

							<!-- Objectives -->
							<div class="mt-4">
								<div class="mb-2 font-mono text-[10px] uppercase tracking-wider text-system-blue/40">
									Objectives Cleared
								</div>
								<ul class="space-y-1.5">
									{#each exp.description as item}
										<li class="flex gap-3 text-sm leading-relaxed text-slate-400">
											<span class="mt-1 text-emerald-400/60 text-xs">&#10003;</span>
											{item}
										</li>
									{/each}
								</ul>
							</div>

							<!-- Rewards (stack) -->
							{#if exp.stack}
								<div class="mt-4">
									<div class="mb-2 font-mono text-[10px] uppercase tracking-wider text-system-blue/40">
										Rewards
									</div>
									<div class="flex flex-wrap gap-1.5">
										{#each exp.stack as tech}
											<span class="rounded border border-system-blue/10 bg-system-blue/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-500">
												{tech}
											</span>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
