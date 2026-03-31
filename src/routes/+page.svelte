<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import TextMarquee from '$lib/components/TextMarquee.svelte';
	import About from '$lib/components/About.svelte';
	import GateDivider from '$lib/components/GateDivider.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import SRankGate from '$lib/components/SRankGate.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const marqueeItems = [
		'SvelteKit', 'React', 'Next.js', 'Angular', 'TypeScript',
		'Node.js', 'Tailwind CSS', 'Three.js', 'Firebase', 'Google Cloud',
		'MongoDB', 'Express.js', 'Ionic', 'shadcn/ui'
	];
</script>

<Hero />
<TextMarquee items={marqueeItems} speed={25} />
<About />
<GateDivider />
<Skills />
<GateDivider />
<Experience />
<GateDivider />
<Projects />
<GateDivider />
<SRankGate />
<GateDivider />
<Contact />
<Footer />
