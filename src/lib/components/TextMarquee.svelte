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

<div class="marquee-wrapper relative overflow-hidden py-8" aria-hidden="true">
	<!-- Fade edges -->
	<div
		class="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-zinc-950 to-transparent"
	></div>
	<div
		class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-zinc-950 to-transparent"
	></div>

	<div
		class="marquee-track flex w-max items-center gap-8"
		style="animation: marquee {speed}s linear infinite;"
	>
		{#each doubled as item}
			<span
				class="flex-shrink-0 whitespace-nowrap text-sm font-medium uppercase tracking-widest text-zinc-700"
			>
				{item}
			</span>
			<span class="h-1 w-1 flex-shrink-0 rounded-full bg-zinc-800" aria-hidden="true"></span>
		{/each}
	</div>
</div>
