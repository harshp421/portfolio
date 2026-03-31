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

		// Track active section with IntersectionObserver
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
	class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 {scrolled
		? 'glass bg-zinc-950/60'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
		<!-- Logo -->
		<button onclick={(e) => handleNav(e, '#hero')} class="text-sm font-bold tracking-tight text-zinc-100 transition-colors hover:text-white">
			{resume.name.split(' ')[0]}<span class="text-violet-400">.</span>
		</button>

		<!-- Desktop nav -->
		<div class="hidden items-center gap-1 md:flex">
			{#each navLinks as link}
				<button
					onclick={(e) => handleNav(e, link.href)}
					class="relative rounded-full px-4 py-2 text-sm transition-colors {activeSection ===
					link.href.slice(1)
						? 'text-zinc-100'
						: 'text-zinc-500 hover:text-zinc-300'}"
				>
					{#if activeSection === link.href.slice(1)}
						<span
							class="absolute inset-0 rounded-full bg-white/[0.06]"
						></span>
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
				class="absolute h-0.5 w-5 rounded bg-zinc-100 transition-all duration-300 {menuOpen
					? 'rotate-45'
					: '-translate-y-1.5'}"
			></span>
			<span
				class="absolute h-0.5 w-5 rounded bg-zinc-100 transition-all duration-300 {menuOpen
					? 'opacity-0'
					: 'opacity-100'}"
			></span>
			<span
				class="absolute h-0.5 w-5 rounded bg-zinc-100 transition-all duration-300 {menuOpen
					? '-rotate-45'
					: 'translate-y-1.5'}"
			></span>
		</button>
	</div>

	<!-- Mobile menu overlay -->
	{#if menuOpen}
		<div class="glass absolute inset-x-0 top-full border-t border-white/[0.06] md:hidden">
			<div class="flex flex-col px-6 py-4">
				{#each navLinks as link, i}
					<button
						onclick={(e) => handleNav(e, link.href)}
						class="py-3 text-left text-base text-zinc-300 transition-colors hover:text-zinc-100"
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
