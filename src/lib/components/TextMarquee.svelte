<script lang="ts">
	let {
		items,
		speed = 30
	}: {
		items: string[];
		speed?: number;
	} = $props();

	const doubled = $derived([...items, ...items]);
</script>

<div class="marquee-wrapper relative overflow-hidden border-y border-indigo-500/[0.06] py-6" aria-hidden="true">
	<!-- Fade edges -->
	<div
		class="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
		style="background: linear-gradient(to right, var(--color-void), transparent);"
	></div>
	<div
		class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
		style="background: linear-gradient(to left, var(--color-void), transparent);"
	></div>

	<div
		class="marquee-track flex w-max items-center gap-8"
		style="animation: marquee {speed}s linear infinite;"
	>
		{#each doubled as item}
			<span
				class="shrink-0 whitespace-nowrap text-sm font-medium uppercase tracking-widest text-indigo-500/20"
			>
				{item}
			</span>
			<span class="h-1 w-1 shrink-0 rounded-full bg-indigo-500/15" aria-hidden="true"></span>
		{/each}
	</div>
</div>
