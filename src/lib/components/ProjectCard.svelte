<script lang="ts">
	import type { Project } from '$lib/types';

	let { project }: { project: Project } = $props();

	let card: HTMLElement;
	let rx = $state(0);
	let ry = $state(0);
	let transitioning = $state(false);

	function handleMouseMove(e: MouseEvent) {
		const rect = card.getBoundingClientRect();
		const x = (e.clientX - rect.left) / rect.width;
		const y = (e.clientY - rect.top) / rect.height;
		rx = (y - 0.5) * -10;
		ry = (x - 0.5) * 10;
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
	class="project-card glass group cursor-default rounded-2xl p-6 transition-colors hover:bg-white/[0.04]"
	style="transform: perspective(600px) rotateX({rx}deg) rotateY({ry}deg); {transitioning
		? 'transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);'
		: ''}"
	onmousemove={handleMouseMove}
	onmouseleave={handleMouseLeave}
	role="article"
>
	<!-- Header -->
	<div class="flex items-start justify-between">
		<div>
			<h3 class="text-xl font-semibold text-zinc-100 transition-colors group-hover:text-white">
				{project.title}
			</h3>
			<p class="mt-0.5 text-sm text-zinc-500">
				{project.subtitle}
				{#if project.company}
					<span class="text-zinc-600">· {project.company}</span>
				{/if}
			</p>
		</div>

		<!-- Links -->
		<div class="flex items-center gap-2">
			{#if project.liveUrl}
				<a
					href={project.liveUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
					aria-label="View live site"
				>
					<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
						/>
					</svg>
				</a>
			{/if}
			{#if project.githubUrl}
				<a
					href={project.githubUrl}
					target="_blank"
					rel="noopener noreferrer"
					class="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-zinc-300"
					aria-label="View source"
				>
					<svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
						<path
							d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
						/>
					</svg>
				</a>
			{/if}
		</div>
	</div>

	<!-- Description -->
	<ul class="mt-4 space-y-1.5">
		{#each project.description as item}
			<li class="flex gap-3 text-sm leading-relaxed text-zinc-400">
				<span class="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-zinc-600"></span>
				{item}
			</li>
		{/each}
	</ul>

	<!-- Tech stack -->
	<div class="mt-5 flex flex-wrap gap-1.5">
		{#each project.stack as tech}
			<span
				class="rounded-full bg-zinc-800/60 px-2.5 py-0.5 text-xs text-zinc-500 transition-colors group-hover:text-zinc-400"
			>
				{tech}
			</span>
		{/each}
	</div>
</div>
