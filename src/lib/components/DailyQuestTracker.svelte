<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import { scrollTo } from '$lib/utils/scroll';

	let quests = $state([
		{ text: 'View Portfolio', completed: true, action: () => {} },
		{ text: 'Contact Hunter', completed: false, action: () => scrollTo('#contact') },
		{
			text: 'Check GitHub',
			completed: false,
			action: () => {
				quests[2].completed = true;
				window.open(resume.github, '_blank');
			}
		}
	]);

	let minimized = $state(false);

	onMount(() => {
		const contactEl = document.getElementById('contact');
		if (!contactEl) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					quests[1].completed = true;
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(contactEl);
		return () => observer.disconnect();
	});

	const completedCount = $derived(quests.filter((q) => q.completed).length);
</script>

<div class="fixed bottom-6 right-6 z-40 hidden md:block">
	{#if minimized}
		<button
			onclick={() => (minimized = false)}
			class="sl-panel flex h-10 w-10 items-center justify-center rounded-lg font-mono text-xs text-system-blue transition-all hover:bg-system-blue/10"
			aria-label="Expand daily quest"
		>
			<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
		</button>
	{:else}
		<div class="sl-panel w-52 rounded-xl p-4">
			<!-- Header -->
			<div class="mb-3 flex items-center justify-between">
				<span class="font-mono text-[10px] font-bold uppercase tracking-wider text-system-blue">Daily Quest</span>
				<button
					onclick={() => (minimized = true)}
					class="text-slate-700 transition-colors hover:text-slate-400"
					aria-label="Minimize"
				>
					<svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" /></svg>
				</button>
			</div>

			<!-- Progress -->
			<div class="mb-3">
				<div class="h-1 overflow-hidden rounded-full bg-slate-800">
					<div
						class="h-full rounded-full bg-linear-to-r from-system-blue to-system-glow transition-all duration-500"
						style="width: {(completedCount / quests.length) * 100}%;"
					></div>
				</div>
				<div class="mt-1 font-mono text-[9px] text-slate-700">{completedCount}/{quests.length} completed</div>
			</div>

			<!-- Quests -->
			<div class="space-y-1.5">
				{#each quests as quest}
					<button
						onclick={quest.action}
						class="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors hover:bg-system-blue/[0.04]"
					>
						<span class="font-mono text-xs {quest.completed ? 'text-emerald-400/60' : 'text-slate-700'}">
							{quest.completed ? '☑' : '☐'}
						</span>
						<span class="font-mono text-[11px] {quest.completed ? 'text-slate-600 line-through' : 'text-slate-400'}">
							{quest.text}
						</span>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
