<script lang="ts">
	import { onMount } from 'svelte';

	let x = $state(0);
	let y = $state(0);
	let visible = $state(false);

	onMount(() => {
		const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		if (isTouchDevice) return;

		const onMove = (e: MouseEvent) => {
			x = e.clientX;
			y = e.clientY;
			if (!visible) visible = true;
		};

		window.addEventListener('mousemove', onMove);
		return () => window.removeEventListener('mousemove', onMove);
	});
</script>

{#if visible}
	<div
		class="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300"
		style="opacity: 0.15;"
		aria-hidden="true"
	>
		<div
			class="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
			style="left: {x}px; top: {y}px; background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(79, 70, 229, 0.04) 40%, transparent 70%);"
		></div>
	</div>
{/if}
