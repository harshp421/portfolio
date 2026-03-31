<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';

	let barWidths = $state<number[]>(resume.stats.map(() => 0));
	let level = $state(1);
	let skillsVisible = $state(false);

	const statusColors = {
		mastered: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', label: 'Mastered' },
		active: { bg: 'bg-system-blue/10', text: 'text-system-blue', border: 'border-system-blue/20', label: 'Active' },
		learning: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20', label: 'Learning' }
	};

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#skills .status-panel', {
			scrollTrigger: { trigger: '#skills', start: 'top 80%' },
			y: 40, opacity: 0, duration: 0.7, ease: 'power3.out'
		});

		// Stat bars animate
		const barProxy: Record<string, number> = {};
		resume.stats.forEach((_, i) => (barProxy[`s${i}`] = 0));
		barProxy.lvl = 1;
		const targets: Record<string, number> = {};
		resume.stats.forEach((s, i) => (targets[`s${i}`] = s.value));
		targets.lvl = resume.hunterLevel;

		gsap.to(barProxy, {
			scrollTrigger: { trigger: '#skills .stat-bars', start: 'top 85%' },
			...targets,
			duration: 1.8,
			ease: 'power2.out',
			onUpdate() {
				barWidths = resume.stats.map((_, i) => Math.round(barProxy[`s${i}`]));
				level = Math.round(barProxy.lvl);
			}
		});

		// Reveal skills grid with CSS animation (not GSAP — avoids scrollable container issues)
		ScrollTrigger.create({
			trigger: '#skills .skills-grid-wrapper',
			start: 'top 90%',
			onEnter: () => { skillsVisible = true; }
		});
	});
</script>

<section id="skills" class="py-24 md:py-32" data-system-msg="Status window accessed. Scanning abilities...">
	<div class="mx-auto max-w-6xl px-6">
		<div class="status-panel sl-panel mx-auto max-w-4xl rounded-xl p-6 md:p-8">
			<!-- Header -->
			<div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div class="sl-tag">
					<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-system-blue"></span>
					Status Window
				</div>
				<div class="flex items-center gap-2 font-mono text-xs text-slate-600">
					<span class="font-bold text-system-blue">LVL {level}</span>
					<div class="h-[3px] w-20 overflow-hidden rounded-full bg-slate-800">
						<div class="h-full rounded-full bg-linear-to-r from-system-blue to-system-glow transition-all duration-300" style="width: {resume.hunterExp}%;"></div>
					</div>
					<span class="text-slate-700">{resume.hunterExp}%</span>
				</div>
			</div>

			<div class="mb-5 h-px bg-linear-to-r from-transparent via-system-blue/20 to-transparent"></div>

			<!-- Stat bars -->
			<div class="stat-bars space-y-3">
				{#each resume.stats as stat, i}
					<div>
						<div class="mb-1 flex items-baseline justify-between">
							<div class="flex items-baseline gap-2">
								<span class="font-mono text-[11px] font-bold uppercase tracking-wider text-system-blue/80">{stat.name}</span>
								<span class="text-[11px] text-slate-600">({stat.label})</span>
							</div>
							<span class="font-mono text-[11px] font-bold text-slate-300">{barWidths[i]}%</span>
						</div>
						<div class="h-2 overflow-hidden rounded-full bg-slate-800/80">
							<div class="h-full rounded-full bg-linear-to-r {stat.color} transition-all duration-200" style="width: {barWidths[i]}%;"></div>
						</div>
					</div>
				{/each}
			</div>

			<div class="my-5 h-px bg-linear-to-r from-transparent via-system-blue/20 to-transparent"></div>

			<!-- Active Skills -->
			<div class="skills-grid-wrapper">
				<div class="mb-4 flex items-center justify-between">
					<div class="font-mono text-[11px] font-bold uppercase tracking-wider text-system-blue/60">Active Skills</div>
					<span class="font-mono text-[10px] text-slate-700">Total: {resume.individualSkills.length}</span>
				</div>

				<div class="skills-grid max-h-[50vh] overflow-y-auto pr-1">
					<div class="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
						{#each resume.individualSkills as skill, i}
							{@const sc = statusColors[skill.status]}
							<div
								class="skill-card group rounded-lg border border-system-blue/[0.06] bg-system-blue/[0.02] p-3 transition-all hover:border-system-blue/15 hover:bg-system-blue/[0.04]"
								style="opacity: {skillsVisible ? 1 : 0}; transform: translateY({skillsVisible ? 0 : 12}px); transition: opacity 0.4s ease {i * 0.03}s, transform 0.4s ease {i * 0.03}s;"
							>
								<div class="mb-1.5 font-mono text-xs font-medium text-slate-300 transition-colors group-hover:text-white">
									{skill.name}
								</div>
								<div class="mb-1.5 h-1 overflow-hidden rounded-full bg-slate-800">
									<div
										class="h-full rounded-full bg-system-blue/60 transition-all duration-1000"
										style="width: {skillsVisible ? skill.level : 0}%; transition-delay: {i * 0.03 + 0.2}s;"
									></div>
								</div>
								<div class="flex items-center justify-between">
									<span class="font-mono text-[10px] font-bold text-system-blue/70">Lv.{skillsVisible ? skill.level : 0}</span>
									<span class="rounded px-1.5 py-0.5 {sc.bg} {sc.border} border font-mono text-[8px] font-semibold uppercase {sc.text}">
										{sc.label}
									</span>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
