<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import NoiseOverlay from '$lib/components/NoiseOverlay.svelte';
	import CursorGlow from '$lib/components/CursorGlow.svelte';
	import { setLenis } from '$lib/utils/scroll';

	let { children } = $props();

	onMount(() => {
		let lenis: InstanceType<typeof import('lenis').default> | undefined;

		(async () => {
			const Lenis = (await import('lenis')).default;
			const { gsap } = await import('gsap');
			const { ScrollTrigger } = await import('gsap/ScrollTrigger');
			gsap.registerPlugin(ScrollTrigger);

			lenis = new Lenis({
				duration: 1.2,
				easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
				touchMultiplier: 2
			});
			setLenis(lenis);

			lenis.on('scroll', ScrollTrigger.update);
			gsap.ticker.add((time) => lenis!.raf(time * 1000));
			gsap.ticker.lagSmoothing(0);
		})();

		return () => lenis?.destroy();
	});
</script>

<svelte:head>
	<title>Harsh Parmar — Full-Stack Developer</title>
</svelte:head>

<NoiseOverlay />
<CursorGlow />
<Navigation />

<main>
	{@render children()}
</main>
