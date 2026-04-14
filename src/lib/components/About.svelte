<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';

	let imageLoaded = $state(false);

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		gsap.from('#about .about-reveal', {
			scrollTrigger: { trigger: '#about', start: 'top 80%' },
			y: 30,
			opacity: 0,
			duration: 0.7,
			stagger: 0.1,
			ease: 'power3.out'
		});
	});
</script>

<section id="about" class="section-alt py-24 md:py-32">
	<div class="mx-auto max-w-5xl px-6">
		<div class="grid items-center gap-12 lg:grid-cols-12">
			<!-- Image -->
			<div class="about-reveal flex justify-center lg:col-span-4">
				<div class="relative">
					<div class="overflow-hidden rounded-3xl">
						<img
							src="/user.png"
							alt={resume.name}
							class="h-[380px] w-[300px] object-cover transition-opacity duration-500 {imageLoaded ? 'opacity-100' : 'opacity-0'}"
							onload={() => (imageLoaded = true)}
							onerror={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
						/>
						{#if !imageLoaded}
							<div class="flex h-[380px] w-[300px] items-center justify-center rounded-3xl bg-neutral-100">
								<span class="text-5xl font-bold text-neutral-200">
									{resume.name.split(' ').map((n) => n[0]).join('')}
								</span>
							</div>
						{/if}
					</div>
				</div>
			</div>

			<!-- Text -->
			<div class="lg:col-span-8">
				<p class="about-reveal mb-3 text-xs font-medium uppercase tracking-widest text-neutral-400">About</p>
				<h2 class="about-reveal text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl">
					A developer who cares<br />about the craft.
				</h2>
				<div class="about-reveal mt-6 space-y-4 text-base leading-relaxed text-neutral-500">
					<p>{resume.summary}</p>
					<p>
						Currently at <span class="font-medium text-neutral-700">Oizom</span>, where I own a
						full-stack admin tool used daily across the organization and built a design system
						with 25+ components adopted across all products.
					</p>
					<p>
						I cut infrastructure costs from ₹1,25,000/month to ₹0 by migrating to
						open-source — the single largest cost reduction in the project.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
