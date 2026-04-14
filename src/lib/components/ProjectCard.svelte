<script lang="ts">
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();

	let card: HTMLElement | undefined = $state();
	let rx = $state(0);
	let ry = $state(0);
	let active = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!card) return;
		const rect = card.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		rx = (y - 0.5) * -8;
		ry = (x - 0.5) * 8;
		active = true;
	}

	function handleMouseLeave() {
		rx = 0;
		ry = 0;
		active = false;
	}
</script>

<div
	bind:this={card}
	class="project-card group cursor-default overflow-hidden rounded-3xl bg-neutral-50"
	style="
		transform: perspective(800px) rotateX({rx}deg) rotateY({ry}deg);
		{active ? '' : 'transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.4s ease;'}
		box-shadow: {active
			? `0 ${20 + Math.abs(rx) * 2}px ${40 + Math.abs(ry) * 2}px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)`
			: '0 4px 20px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)'};
	"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	role="article"
>
	<!-- Image area -->
	<div class="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
		<img
			src="/projects/{project.title.toLowerCase().replace(/\s+/g, '-')}.png"
			alt={project.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			onerror={(e) => {
				const el = e.currentTarget as HTMLImageElement;
				el.style.display = 'none';
			}}
		/>
		<!-- Fallback if no image -->
		<div class="absolute inset-0 flex items-center justify-center">
			<span class="text-4xl font-bold text-neutral-200/60">{project.title[0]}</span>
		</div>

		{#if project.status === 'upcoming'}
			<div class="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur-sm">
				<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-neutral-900"></span>
				Coming Soon
			</div>
		{/if}
	</div>

	<!-- Content -->
	<div class="p-6">
		<div class="flex items-start justify-between">
			<div>
				<h3 class="text-lg font-semibold text-neutral-900">{project.title}</h3>
				<p class="mt-0.5 text-sm text-neutral-400">
					{project.subtitle}
					{#if project.company}
						<span class="text-neutral-300">· {project.company}</span>
					{/if}
				</p>
			</div>

			{#if project.liveUrl}
				<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" class="rounded-full p-2 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600" aria-label="Visit site">
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
				</a>
			{/if}
		</div>

		<ul class="mt-4 space-y-1.5">
			{#each project.description.slice(0, 2) as item}
				<li class="text-sm leading-relaxed text-neutral-500">{item}</li>
			{/each}
		</ul>

		<div class="mt-4 flex flex-wrap gap-1.5">
			{#each project.stack as tech}
				<span class="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs text-neutral-500">{tech}</span>
			{/each}
		</div>
	</div>
</div>
