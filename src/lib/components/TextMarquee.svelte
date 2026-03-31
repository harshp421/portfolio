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

<div class="relative overflow-hidden border-y border-system-blue/[0.06] py-5" aria-hidden="true">
	<div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-24" style="background: linear-gradient(to right, var(--color-void), transparent);"></div>
	<div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-24" style="background: linear-gradient(to left, var(--color-void), transparent);"></div>

	<div class="marquee-track flex w-max items-center gap-8" style="animation: marquee {speed}s linear infinite;">
		{#each doubled as item}
			<span class="shrink-0 whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-system-blue/15">{item}</span>
			<span class="h-1 w-1 shrink-0 rounded-full bg-system-blue/10"></span>
		{/each}
	</div>
</div>
