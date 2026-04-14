<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import { scrollTo } from '$lib/utils/scroll';

	const navLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Work', href: '#projects' },
		{ label: 'Experience', href: '#experience' },
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
		const onScroll = () => { scrolled = window.scrollY > 50; };
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();

		const sections = document.querySelectorAll('section[id]');
		const observer = new IntersectionObserver(
			(entries) => { for (const e of entries) if (e.isIntersecting) activeSection = e.target.id; },
			{ rootMargin: '-40% 0px -55% 0px' }
		);
		sections.forEach((s) => observer.observe(s));
		return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
	});
</script>

<nav
	class="fixed top-0 right-0 left-0 z-50 transition-all duration-300 {scrolled
		? 'glass border-b border-black/[0.04]'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
		<button onclick={(e) => handleNav(e, '#hero')} class="text-sm font-semibold text-neutral-900 transition-colors hover:text-black">
			{resume.name.split(' ')[0]}<span class="text-neutral-300">.</span>
		</button>

		<!-- Desktop -->
		<div class="hidden items-center gap-1 md:flex">
			{#each navLinks as link}
				<button
					onclick={(e) => handleNav(e, link.href)}
					class="rounded-full px-4 py-2 text-[13px] font-medium transition-all {activeSection === link.href.slice(1)
						? 'bg-neutral-100 text-neutral-900'
						: 'text-neutral-400 hover:text-neutral-600'}"
				>
					{link.label}
				</button>
			{/each}
		</div>

		<!-- Mobile hamburger -->
		<button class="relative flex h-8 w-8 items-center justify-center md:hidden" onclick={() => (menuOpen = !menuOpen)} aria-label="Menu">
			<span class="absolute h-[1.5px] w-4 rounded bg-neutral-800 transition-all duration-300 {menuOpen ? 'rotate-45' : '-translate-y-1'}"></span>
			<span class="absolute h-[1.5px] w-4 rounded bg-neutral-800 transition-all duration-300 {menuOpen ? '-rotate-45' : 'translate-y-1'}"></span>
		</button>
	</div>

	<!-- Mobile menu -->
	{#if menuOpen}
		<div class="glass border-t border-black/[0.04] md:hidden">
			<div class="flex flex-col px-6 py-3">
				{#each navLinks as link}
					<button onclick={(e) => handleNav(e, link.href)} class="py-2.5 text-left text-sm text-neutral-500 transition-colors hover:text-neutral-900">
						{link.label}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</nav>
