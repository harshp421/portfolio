<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import { scrollTo } from '$lib/utils/scroll';

	const navLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Experience', href: '#experience' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#contact' }
	];

	let activeSection = $state('hero');
	let scrolled = $state(false);
	let menuOpen = $state(false);

	function handleNav(e: Event, href: string) {
		e.preventDefault();
		scrollTo(href);
		menuOpen = false;
	}

	onMount(() => {
		const onScroll = () => {
			scrolled = window.scrollY > 50;
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				}
			},
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		sections.forEach((s) => observer.observe(s));

		return () => {
			window.removeEventListener('scroll', onScroll);
			observer.disconnect();
		};
	});
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-500 {scrolled
		? 'sl-panel bg-[#050510]/80'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<!-- Logo -->
		<button
			onclick={(e) => handleNav(e, '#hero')}
			class="text-sm font-bold tracking-tight text-slate-100 transition-colors hover:text-white"
		>
			{resume.name.split(' ')[0]}<span class="sl-text-glow text-indigo-400">.</span>
		</button>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-1 md:flex">
			{#each navLinks as link}
				<button
					onclick={(e) => handleNav(e, link.href)}
					class="relative rounded-md px-4 py-2 text-sm transition-all {activeSection ===
					link.href.slice(1)
						? 'text-indigo-300'
						: 'text-slate-500 hover:text-slate-300'}"
				>
					{#if activeSection === link.href.slice(1)}
						<span class="absolute inset-0 rounded-md bg-indigo-500/[0.08] border border-indigo-500/10"></span>
					{/if}
					<span class="relative">{link.label}</span>
				</button>
			{/each}
		</div>

		<!-- Mobile hamburger -->
		<button
			class="relative flex h-8 w-8 items-center justify-center md:hidden"
			onclick={() => (menuOpen = !menuOpen)}
			aria-label="Toggle menu"
		>
			<span
				class="absolute h-0.5 w-5 rounded bg-slate-100 transition-all duration-300 {menuOpen
					? 'rotate-45'
					: '-translate-y-1.5'}"
			></span>
			<span
				class="absolute h-0.5 w-5 rounded bg-slate-100 transition-all duration-300 {menuOpen
					? 'opacity-0'
					: 'opacity-100'}"
			></span>
			<span
				class="absolute h-0.5 w-5 rounded bg-slate-100 transition-all duration-300 {menuOpen
					? '-rotate-45'
					: 'translate-y-1.5'}"
			></span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="sl-panel absolute inset-x-0 top-full md:hidden">
			<div class="flex flex-col px-6 py-4">
				{#each navLinks as link, i}
					<button
						onclick={(e) => handleNav(e, link.href)}
						class="py-3 text-left text-base text-slate-300 transition-colors hover:text-indigo-300"
						style="animation: fadeUp 0.3s ease forwards; animation-delay: {i * 0.05}s; opacity: 0;"
					>
						{link.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</nav>

<style>
	@keyframes fadeUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
