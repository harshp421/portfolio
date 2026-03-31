<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import MagneticButton from './MagneticButton.svelte';

	const nnuikit = resume.projects.find((p) => p.title === 'Nnuikit')!;
	const launchDate = new Date(nnuikit.launchDate!);

	let days = $state(0);
	let hours = $state(0);
	let minutes = $state(0);
	let seconds = $state(0);
	let gateOpened = $state(false);

	function update() {
		const diff = launchDate.getTime() - Date.now();
		if (diff <= 0) {
			gateOpened = true;
			return;
		}
		days = Math.floor(diff / (1000 * 60 * 60 * 24));
		hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((diff / 1000 / 60) % 60);
		seconds = Math.floor((diff / 1000) % 60);
	}

	// Urgency color
	const urgencyClass = $derived(
		days > 14 ? 'text-system-blue' : days > 7 ? 'text-system-blue' : days > 3 ? 'text-amber-400' : 'text-red-400'
	);
	const urgencyGlow = $derived(
		days > 3 ? 'shadow-[0_0_20px_rgba(0,102,255,0.15)]' : 'shadow-[0_0_20px_rgba(239,68,68,0.2)]'
	);

	onMount(async () => {
		update();
		const interval = setInterval(update, 1000);

		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const tl = gsap.timeline({
			scrollTrigger: { trigger: '#s-rank-gate', start: 'top 80%' }
		});
		tl.from('#s-rank-gate .gate-label', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' });
		tl.from('#s-rank-gate .gate-portal', { scale: 0.5, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.3');
		tl.from('#s-rank-gate .gate-info', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
		tl.from('#s-rank-gate .gate-timer', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
		tl.from('#s-rank-gate .gate-details', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2');
		tl.from('#s-rank-gate .gate-cta', { scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'back.out(1.7)' }, '-=0.2');

		return () => clearInterval(interval);
	});

	function pad(n: number) {
		return n.toString().padStart(2, '0');
	}
</script>

<section id="s-rank-gate" class="relative overflow-hidden py-24 md:py-32" data-system-msg="⚡ S-Rank Gate energy detected!">
	<!-- Background glow -->
	<div class="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06]" style="background: radial-gradient(circle, rgba(239,68,68,0.6) 0%, rgba(157,0,255,0.3) 40%, transparent 70%);" aria-hidden="true"></div>

	<div class="relative mx-auto max-w-4xl px-6 text-center">
		<!-- S-Rank label -->
		<div class="gate-label mb-8 flex items-center justify-center gap-3">
			<span class="h-px w-8 bg-red-500/40"></span>
			<span class="font-mono text-xs font-bold uppercase tracking-[0.25em] text-red-400/80">S-Rank Gate</span>
			<span class="h-px w-8 bg-red-500/40"></span>
		</div>

		<!-- Portal -->
		<div class="gate-portal mx-auto mb-8 flex items-center justify-center">
			<div class="portal-ring relative flex h-48 w-48 items-center justify-center md:h-56 md:w-56">
				<!-- Spinning gradient border -->
				<div class="absolute inset-0 rounded-full" style="background: conic-gradient(#ef4444, #9d00ff, #0066ff, #00d4ff, #0066ff, #9d00ff, #ef4444); animation: portal-spin 4s linear infinite; mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px)); -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 3px));"></div>
				<!-- Inner glow -->
				<div class="absolute inset-2 rounded-full bg-red-500/5 shadow-[inset_0_0_40px_rgba(239,68,68,0.1)]"></div>
				<!-- Content inside portal -->
				<div class="relative z-10 text-center">
					<div class="text-2xl font-black text-white md:text-3xl" style="text-shadow: 0 0 30px rgba(239,68,68,0.4);">
						{nnuikit.title}
					</div>
					<div class="mt-1 font-mono text-xs text-red-400/60">{nnuikit.subtitle}</div>
				</div>
			</div>
		</div>

		<!-- Countdown timer -->
		<div class="gate-timer mb-8">
			<div class="mb-2 font-mono text-[11px] uppercase tracking-wider text-red-400/50">
				{gateOpened ? 'Gate Opened' : 'Gate Breaks In'}
			</div>
			{#if gateOpened}
				<div class="font-mono text-2xl font-black text-red-400" style="text-shadow: 0 0 20px rgba(239,68,68,0.5); animation: system-flicker 2s ease infinite;">
					GATE OPENED — PROJECT LAUNCHED
				</div>
			{:else}
				<div class="inline-flex items-center gap-1 rounded-xl border border-red-500/15 bg-red-500/5 px-6 py-3 {urgencyGlow}">
					{#each [{ v: days, l: 'D' }, { v: hours, l: 'H' }, { v: minutes, l: 'M' }, { v: seconds, l: 'S' }] as seg, i}
						{#if i > 0}
							<span class="font-mono text-lg text-red-400/30">:</span>
						{/if}
						<div class="text-center">
							<div class="font-mono text-2xl font-black {urgencyClass} md:text-3xl" style="min-width: 2.5rem;">
								{pad(seg.v)}
							</div>
							<div class="font-mono text-[8px] uppercase text-slate-600">{seg.l}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Gate info -->
		<div class="gate-info mb-6">
			<div class="font-mono text-sm font-semibold text-slate-300">Difficulty: <span class="text-red-400">S-RANK</span> (High Complexity)</div>
		</div>

		<!-- Project details -->
		<div class="gate-details mx-auto mb-8 max-w-md">
			<div class="sl-panel rounded-xl p-5 text-left">
				<div class="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-system-blue/50">Specifications</div>
				<ul class="space-y-1.5">
					{#each nnuikit.description as item}
						<li class="flex items-center gap-2 text-sm text-slate-400">
							<span class="text-xs text-red-400/60">◆</span>
							{item}
						</li>
					{/each}
				</ul>
				<div class="mt-3 flex flex-wrap gap-1.5">
					{#each nnuikit.stack as tech}
						<span class="rounded border border-red-500/10 bg-red-500/5 px-2 py-0.5 font-mono text-[10px] text-red-400/60">{tech}</span>
					{/each}
				</div>
			</div>
		</div>

		<!-- CTAs -->
		<div class="flex flex-wrap items-center justify-center gap-3">
			<MagneticButton
				href="mailto:{resume.email}?subject=Nnuikit%20-%20Join%20Raid"
				class="gate-cta group inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-7 py-3.5 font-mono text-sm font-semibold text-red-400 transition-all hover:border-red-400/50 hover:bg-red-500/20 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
				strength={0.2}
			>
				{gateOpened ? 'Enter Gate' : 'Join Raid'}
				<svg class="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
			</MagneticButton>
			<MagneticButton
				href={resume.github}
				class="gate-cta inline-flex items-center gap-2 rounded-md border border-slate-700/50 px-7 py-3.5 font-mono text-sm text-slate-500 transition-all hover:border-slate-600 hover:text-slate-300"
			>
				View Specs
			</MagneticButton>
		</div>
	</div>
</section>
