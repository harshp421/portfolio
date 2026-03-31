<script lang="ts">
  import { onMount } from "svelte";
  import { resume } from "$lib/data/resume";

  let imageLoaded = $state(false);

  onMount(async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#about .about-label", {
      scrollTrigger: { trigger: "#about", start: "top 80%" },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.from("#about .about-title", {
      scrollTrigger: { trigger: "#about", start: "top 80%" },
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay: 0.1,
      ease: "power3.out",
    });
    gsap.from("#about .about-image-wrapper", {
      scrollTrigger: {
        trigger: "#about .about-image-wrapper",
        start: "top 85%",
      },
      scale: 0.85,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from("#about .about-content", {
      scrollTrigger: { trigger: "#about .about-content", start: "top 85%" },
      y: 40,
      opacity: 0,
      duration: 0.8,
      delay: 0.15,
      ease: "power3.out",
    });
  });
</script>

<section
  id="about"
  class="py-24 md:py-32"
  data-system-msg="New hunter detected. Scanning abilities..."
>
  <div class="mx-auto max-w-6xl px-6">
    <!-- Heading -->
    <div class="mb-16">
      <div class="about-label mb-3 flex items-center gap-3">
        <span class="h-px w-6 bg-system-blue/40"></span>
        <span
          class="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-system-blue/70"
          >Profile</span
        >
      </div>
      <h2
        class="about-title text-4xl font-bold tracking-tight text-slate-100 md:text-5xl"
      >
        Who I am
      </h2>
    </div>

    <div class="grid items-center gap-12 lg:grid-cols-12">
      <!-- Profile image -->
      <div class="flex justify-center lg:col-span-4">
        <div class="about-image-wrapper relative">
          <div
            class="absolute -inset-1 rounded-2xl opacity-40 blur-sm"
            style="background: linear-gradient(135deg, rgba(0,102,255,0.5), rgba(0,212,255,0.3), rgba(157,0,255,0.2));"
            aria-hidden="true"
          ></div>
          <div
            class="relative overflow-hidden rounded-2xl border border-system-blue/15"
          >
            <img
              src="/user.png"
              alt={resume.name}
              class="h-[360px] w-[300px] object-cover transition-opacity duration-500 {imageLoaded
                ? 'opacity-100'
                : 'opacity-0'}"
              onload={() => (imageLoaded = true)}
              onerror={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {#if !imageLoaded}
              <div
                class="flex h-[360px] w-[300px] items-center justify-center bg-shadow"
              >
                <span class="sl-glow text-6xl font-bold text-system-blue/20"
                  >{resume.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}</span
                >
              </div>
            {/if}
          </div>
          <!-- Floating orbs -->
          <div
            class="absolute -right-3 -top-3 h-4 w-4 rounded-full bg-system-blue pulse-glow"
            style="animation: float 3s ease-in-out infinite;"
            aria-hidden="true"
          ></div>
          <div
            class="absolute -bottom-2 -left-2 h-2.5 w-2.5 rounded-full bg-system-glow/50"
            style="animation: float 4s ease-in-out infinite 1s;"
            aria-hidden="true"
          ></div>
        </div>
      </div>

      <!-- Bio -->
      <div class="about-content space-y-5 lg:col-span-8">
        <p class="text-lg leading-relaxed text-slate-300">{resume.summary}</p>
        <p class="leading-relaxed text-slate-400">
          Currently ranked <span class="font-semibold text-amber-400"
            >A-Rank</span
          >
          at
          <span class="font-medium text-system-blue">Oizom</span>, where I own a
          full-stack internal admin tool used daily across the entire
          organization and developed a design system with 25+ reusable
          components adopted across all products.
        </p>
        <p class="leading-relaxed text-slate-400">
          Key achievement: cut infrastructure costs from ₹1,25,0000/month to ₹0
          by migrating to open-source solutions — the single largest cost
          reduction in the project. I believe great software is built at the
          intersection of clean code and thoughtful user experience.
        </p>
      </div>
    </div>
  </div>
</section>
