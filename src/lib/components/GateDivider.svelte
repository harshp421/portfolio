<script lang="ts">
	import { onMount } from 'svelte';

	let divider: HTMLElement | undefined = $state();
	let opened = $state(false);

	onMount(() => {
		if (!divider) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					opened = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.5 }
		);
		observer.observe(divider);
		return () => observer.disconnect();
	});
</script>

<div bind:this={divider} class="relative overflow-hidden py-10" aria-hidden="true">
	<div class="relative mx-auto max-w-6xl px-6">
		<!-- Energy line -->
		<div
			class="mx-auto h-px transition-all duration-1000 ease-out {opened ? 'w-full opacity-100' : 'w-0 opacity-0'}"
			style="background: linear-gradient(90deg, transparent, #0066ff, #00d4ff, #0066ff, transparent);"
		></div>

		<!-- Center diamond -->
		<div
			class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-300 {opened ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}"
		>
			<div class="h-2 w-2 rotate-45 border border-system-blue/40 bg-system-blue/10"></div>
		</div>
	</div>

	<!-- Radial glow -->
	{#if opened}
		<div
			class="absolute inset-0 pointer-events-none"
			style="background: radial-gradient(ellipse at center, rgba(0,102,255,0.06) 0%, transparent 70%); animation: gate-glow 2s ease-in-out infinite;"
		></div>
	{/if}
</div>
