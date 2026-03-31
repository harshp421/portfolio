<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import SectionHeading from './SectionHeading.svelte';

	let stat1 = $state(0);
	let stat2 = $state(0);
	let stat3 = $state(0);
	let imageLoaded = $state(false);

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#about .section-heading', {
			scrollTrigger: { trigger: '#about', start: 'top 80%' },
			y: 50,
			opacity: 0,
			duration: 0.8,
			ease: 'power3.out'
		});

		// Image reveal
		gsap.from('#about .about-image-wrapper', {
			scrollTrigger: { trigger: '#about .about-image-wrapper', start: 'top 85%' },
			scale: 0.85,
			opacity: 0,
			duration: 1,
			ease: 'power3.out'
		});

		gsap.from('#about .about-content', {
			scrollTrigger: { trigger: '#about .about-content', start: 'top 85%' },
			y: 40,
			opacity: 0,
			duration: 0.8,
			delay: 0.15,
			ease: 'power3.out'
		});

		// Animated counters
		const counterProxy = { v1: 0, v2: 0, v3: 0 };
		gsap.to(counterProxy, {
			scrollTrigger: { trigger: '#about .about-stats', start: 'top 85%' },
			v1: 1.5,
			v2: 25,
			v3: 5000,
			duration: 2,
			ease: 'power2.out',
			onUpdate() {
				stat1 = parseFloat(counterProxy.v1.toFixed(1));
				stat2 = Math.round(counterProxy.v2);
				stat3 = Math.round(counterProxy.v3);
			}
		});

		gsap.from('#about .about-stat', {
			scrollTrigger: { trigger: '#about .about-stats', start: 'top 85%' },
			y: 30,
			opacity: 0,
			duration: 0.6,
			stagger: 0.1,
			ease: 'power3.out'
		});
	});
</script>

<section id="about" class="py-24 md:py-32">
	<div class="mx-auto max-w-6xl px-6">
		<SectionHeading label="About" title="Who I am" />

		<div class="grid items-center gap-12 lg:grid-cols-12">
			<!-- Profile image -->
			<div class="flex justify-center lg:col-span-4">
				<div class="about-image-wrapper relative">
					<!-- Gradient ring -->
					<div
						class="absolute -inset-1 rounded-2xl opacity-60 blur-sm"
						style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(59, 130, 246, 0.3), rgba(20, 184, 166, 0.3));"
						aria-hidden="true"
					></div>
					<div class="relative overflow-hidden rounded-2xl border border-white/10">
						<img
							src="/profile.jpg"
							alt="{resume.name}"
							class="h-[360px] w-[300px] object-cover transition-opacity duration-500 {imageLoaded ? 'opacity-100' : 'opacity-0'}"
							onload={() => (imageLoaded = true)}
							onerror={(e) => {
								const target = e.currentTarget as HTMLImageElement;
								target.style.display = 'none';
								const parent = target.parentElement;
								if (parent) parent.classList.add('about-image-placeholder');
							}}
						/>
						<!-- Fallback placeholder if no image -->
						{#if !imageLoaded}
							<div
								class="flex h-[360px] w-[300px] items-center justify-center bg-zinc-900"
							>
								<span class="text-6xl font-bold text-zinc-800">
									{resume.name.split(' ').map((n) => n[0]).join('')}
								</span>
							</div>
						{/if}
					</div>
					<!-- Floating accent dot -->
					<div
						class="absolute -right-3 -top-3 h-6 w-6 rounded-full bg-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.4)]"
						style="animation: float 3s ease-in-out infinite;"
						aria-hidden="true"
					></div>
				</div>
			</div>

			<!-- Bio text -->
			<div class="about-content space-y-5 lg:col-span-8">
				<p class="text-lg leading-relaxed text-zinc-300">
					{resume.summary}
				</p>
				<p class="leading-relaxed text-zinc-400">
					Currently at <span class="font-medium text-zinc-200">Oizom</span>, where I own a
					full-stack internal admin tool used daily across the entire organization and developed a
					design system with 25+ reusable components adopted across all products.
				</p>
				<p class="leading-relaxed text-zinc-400">
					I've cut infrastructure costs from ₹5,000/day to ₹0 by migrating to open-source
					solutions, led platform redevelopments across frameworks, and worked cross-functionally
					with product, design, and hardware teams. I believe great software is built at the
					intersection of clean code and thoughtful user experience.
				</p>
			</div>
		</div>

		<!-- Stats row -->
		<div class="about-stats mt-16 grid gap-4 sm:grid-cols-3">
			<div class="about-stat glass group rounded-2xl p-6 transition-colors hover:bg-white/[0.04]">
				<div class="text-4xl font-bold text-zinc-100">
					{stat1}+
				</div>
				<div class="mt-1 text-sm text-zinc-500 transition-colors group-hover:text-zinc-400">
					Years of Experience
				</div>
			</div>
			<div class="about-stat glass group rounded-2xl p-6 transition-colors hover:bg-white/[0.04]">
				<div class="text-4xl font-bold text-zinc-100">
					{stat2}+
				</div>
				<div class="mt-1 text-sm text-zinc-500 transition-colors group-hover:text-zinc-400">
					Reusable Components Built
				</div>
			</div>
			<div class="about-stat glass group rounded-2xl p-6 transition-colors hover:bg-white/[0.04]">
				<div class="flex items-baseline gap-1 text-4xl font-bold text-zinc-100">
					<span class="text-xl text-zinc-500">₹</span>{stat3.toLocaleString('en-IN')}
					<span class="text-lg text-emerald-400">/day</span>
				</div>
				<div class="mt-1 text-sm text-zinc-500 transition-colors group-hover:text-zinc-400">
					Infrastructure Cost Saved
				</div>
			</div>
		</div>
	</div>
</section>
