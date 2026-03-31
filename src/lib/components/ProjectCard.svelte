<script lang="ts">
	import type { Project } from '$lib/types';
	import { RANK_COLORS } from '$lib/types';

	let { project }: { project: Project } = $props();

	const rc = $derived(RANK_COLORS[project.rank]);

	let card: HTMLElement | undefined = $state();
	let rx = $state(0);
	let ry = $state(0);
	let transitioning = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!card) return;
		const rect = card.getBoundingClientRect();
		rx = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
		ry = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
		transitioning = false;
	}

	function handleMouseLeave() {
		rx = 0;
		ry = 0;
		transitioning = true;
	}
</script>

<div
	bind:this={card}
	class="project-card sl-panel group cursor-default rounded-xl p-6"
	style="transform: perspective(600px) rotateX({rx}deg) rotateY({ry}deg); {transitioning ? 'transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);' : ''}"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	role="article"
>
	<!-- Quest header -->
	<div class="mb-4 flex items-center justify-between">
		<div class="sl-tag text-[10px]">Quest</div>
		<div class="flex items-center gap-2">
			<!-- Rank badge -->
			<div class="flex items-center gap-1.5 rounded {rc.border} {rc.bg} {rc.glow} px-2.5 py-1">
				<span class="font-mono text-[10px] uppercase text-slate-500">Rank</span>
				<span class="font-mono text-sm font-black {rc.text}">{project.rank}</span>
			</div>
			<!-- Status -->
			<span class="rounded bg-emerald-500/10 px-2 py-1 font-mono text-[10px] font-semibold uppercase text-emerald-400/80">
				Cleared
			</span>
		</div>
	</div>

	<!-- Divider -->
	<div class="mb-4 h-px bg-linear-to-r from-system-blue/10 via-system-blue/20 to-system-blue/10"></div>

	<!-- Title -->
	<h3 class="text-xl font-bold text-slate-100 transition-colors group-hover:text-system-blue">
		{project.title}
	</h3>
	<p class="mt-0.5 text-sm text-slate-500">
		{project.subtitle}
		{#if project.company}
			<span class="font-mono text-system-blue/30">// {project.company}</span>
		{/if}
	</p>

	<!-- Objectives -->
	<div class="mt-4">
		<div class="mb-2 font-mono text-[10px] uppercase tracking-wider text-system-blue/40">Objectives</div>
		<ul class="space-y-1.5">
			{#each project.description as item}
				<li class="flex gap-2.5 text-sm leading-relaxed text-slate-400">
					<span class="mt-0.5 text-xs text-emerald-400/60">&#10003;</span>
					{item}
				</li>
			{/each}
		</ul>
	</div>

	<!-- Rewards (tech stack) -->
	<div class="mt-4">
		<div class="mb-2 font-mono text-[10px] uppercase tracking-wider text-system-blue/40">Rewards</div>
		<div class="flex flex-wrap gap-1.5">
			{#each project.stack as tech}
				<span class="rounded border border-system-blue/10 bg-system-blue/[0.03] px-2 py-0.5 font-mono text-[10px] text-slate-500 transition-colors group-hover:text-slate-400">
					{tech}
				</span>
			{/each}
		</div>
	</div>

	<!-- Footer: links -->
	{#if project.liveUrl || project.githubUrl}
		<div class="mt-5 flex items-center gap-3 border-t border-system-blue/[0.06] pt-4">
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="group/link inline-flex items-center gap-1.5 font-mono text-xs text-system-blue/60 transition-colors hover:text-system-blue"
				>
					Enter Dungeon
					<svg class="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
				</a>
			{/if}
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="font-mono text-xs text-slate-600 transition-colors hover:text-slate-400"
				>
					View Source
				</a>
			{/if}
		</div>
	{/if}
</div>
