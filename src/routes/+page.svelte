<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import TextMarquee from '$lib/components/TextMarquee.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';

	const marqueeItems = [
		'SvelteKit',
		'React',
		'Next.js',
		'Angular',
		'TypeScript',
		'Node.js',
		'Tailwind CSS',
		'Three.js',
		'Firebase',
		'Google Cloud',
		'MongoDB',
		'Express.js'
	];
</script>

<Hero />
<TextMarquee items={marqueeItems} speed={25} />
<About />
<Skills />
<Experience />
<Projects />
<Contact />
<Footer />
