<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		href,
		onclick,
		class: className = '',
		strength = 0.3
	}: {
		children: Snippet;
		href?: string;
		onclick?: (e: MouseEvent) => void;
		class?: string;
		strength?: number;
	} = $props();

	let el: HTMLElement | undefined = $state();
	let tx = $state(0);
	let ty = $state(0);
	let transitioning = $state(false);

	function handleMouseMove(e: MouseEvent) {
		if (!el) return;
		const rect = el.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		tx = (e.clientX - cx) * strength;
		ty = (e.clientY - cy) * strength;
		transitioning = false;
	}

	function handleMouseLeave() {
		tx = 0;
		ty = 0;
		transitioning = true;
	}
</script>

{#if href}
	<a
		bind:this={el}
		{href}
		class={className}
		style="transform: translate({tx}px, {ty}px); {transitioning ? 'transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);' : ''}"
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		target={href.startsWith('http') ? '_blank' : undefined}
		rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
	>
		{@render children()}
	</a>
{:else}
	<button
		bind:this={el}
		type="button"
		class={className}
		style="transform: translate({tx}px, {ty}px); {transitioning ? 'transition: transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);' : ''}"
		onmousemove={handleMouseMove}
		onmouseleave={handleMouseLeave}
		{onclick}
	>
		{@render children()}
	</button>
{/if}
