<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import MagneticButton from './MagneticButton.svelte';
	import { scrollTo } from '$lib/utils/scroll';

	let canvas = $state<HTMLCanvasElement>();
	let heroSection = $state<HTMLElement>();
	let webglSupported = $state(true);

	// Typewriter state
	let displayedTagline = $state('');
	const fullTagline = `Building elegant web experiences from ${resume.location}.`;

	const VERTEX_SHADER = `
		void main() {
			gl_Position = vec4(position, 1.0);
		}
	`;

	const FRAGMENT_SHADER = `
		precision highp float;

		uniform float uTime;
		uniform vec2 uResolution;
		uniform vec2 uMouse;

		vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

		float snoise(vec2 v) {
			const vec4 C = vec4(0.211324865405187, 0.366025403784439,
				-0.577350269189626, 0.024390243902439);
			vec2 i = floor(v + dot(v, C.yy));
			vec2 x0 = v - i + dot(i, C.xx);
			vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
			vec4 x12 = x0.xyxy + C.xxzz;
			x12.xy -= i1;
			i = mod(i, 289.0);
			vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
			vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
			m = m * m;
			m = m * m;
			vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
			vec3 h = abs(x_) - 0.5;
			vec3 ox = floor(x_ + 0.5);
			vec3 a0 = x_ - ox;
			m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
			vec3 g;
			g.x = a0.x * x0.x + h.x * x0.y;
			g.yz = a0.yz * x12.xz + h.yz * x12.yw;
			return 130.0 * dot(m, g);
		}

		void main() {
			vec2 uv = gl_FragCoord.xy / uResolution;
			float aspect = uResolution.x / uResolution.y;
			vec2 pos = uv;
			pos.x *= aspect;

			float time = uTime * 0.1;

			// Dark base with blue tint — Solo Leveling shadow realm
			vec3 base = vec3(0.015, 0.015, 0.05);

			// Vertical energy streams — like shadow aura rising
			float n1 = snoise(vec2(pos.x * 1.2, pos.y * 3.5 + time * 0.4));
			float n2 = snoise(vec2(pos.x * 1.8 + time * 0.2, pos.y * 2.8));
			float n3 = snoise(vec2(pos.x * 0.7 - time * 0.15, pos.y * 4.5 + time * 0.35));
			float n4 = snoise(pos * 2.0 + vec2(time * 0.1, -time * 0.2));

			// Shadow blue tones
			vec3 shadowBlue    = vec3(0.04, 0.04, 0.22);
			vec3 electricIndigo = vec3(0.14, 0.10, 0.42);
			vec3 deepVoid      = vec3(0.06, 0.02, 0.15);
			vec3 arcaneBlue    = vec3(0.08, 0.12, 0.30);

			vec3 color = base;
			color += shadowBlue     * smoothstep(-0.1, 0.6, n1) * 0.50;
			color += electricIndigo * smoothstep(0.0, 0.7, n2)  * 0.35;
			color += deepVoid       * smoothstep(-0.2, 0.5, n3) * 0.30;
			color += arcaneBlue     * smoothstep(0.1, 0.8, n4)  * 0.20;

			// Bright energy sparks where streams overlap
			float spark = smoothstep(0.55, 0.85, n1 * n2);
			color += vec3(0.20, 0.22, 0.90) * spark * 0.25;

			// Mouse interaction — blue shadow glow
			vec2 mousePos = uMouse;
			mousePos.x *= aspect;
			float mouseDist = distance(pos, mousePos);
			float mouseGlow = smoothstep(0.55, 0.0, mouseDist) * 0.22;
			color += vec3(0.08, 0.10, 0.40) * mouseGlow;

			// Stronger vignette for drama
			float vignette = smoothstep(2.2, 0.4, length(uv - 0.5) * 2.0);
			color *= vignette;

			gl_FragColor = vec4(color, 1.0);
		}
	`;

	onMount(async () => {
		const { gsap } = await import('gsap');

		const tl = gsap.timeline({ delay: 0.3 });

		// System badge flickers in
		tl.from('.hero-system-badge', {
			opacity: 0,
			scale: 0.9,
			duration: 0.4,
			ease: 'power2.out'
		});

		// Rank flickers
		tl.from(
			'.hero-rank',
			{
				opacity: 0,
				x: -20,
				duration: 0.5,
				ease: 'power3.out'
			},
			'-=0.1'
		);

		// Name — letter by letter, rising from shadows
		tl.from(
			'.hero-letter',
			{
				y: 120,
				opacity: 0,
				rotateX: -90,
				duration: 0.7,
				stagger: 0.035,
				ease: 'power3.out'
			},
			'-=0.2'
		);

		// Class/title line
		tl.from(
			'.hero-class',
			{
				x: -30,
				opacity: 0,
				duration: 0.6,
				ease: 'power3.out'
			},
			'-=0.3'
		);

		// Typewriter effect for tagline
		const typeDelay = tl.duration() * 1000 + 300;
		setTimeout(() => {
			let i = 0;
			const interval = setInterval(() => {
				displayedTagline = fullTagline.slice(0, i + 1);
				i++;
				if (i >= fullTagline.length) clearInterval(interval);
			}, 28);
		}, typeDelay);

		// CTAs
		tl.from(
			'.hero-cta',
			{
				y: 30,
				opacity: 0,
				duration: 0.6,
				stagger: 0.1,
				ease: 'power3.out'
			},
			'+=0.8'
		);

		// Floating particles
		tl.from(
			'.hero-particle',
			{
				opacity: 0,
				scale: 0,
				duration: 0.5,
				stagger: 0.08,
				ease: 'back.out(1.7)'
			},
			'-=0.5'
		);

		// Scroll indicator
		tl.from(
			'.hero-scroll-indicator',
			{
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out'
			},
			'-=0.3'
		);

		// Three.js shader
		if (!canvas) return;

		let THREE: typeof import('three');
		try {
			THREE = await import('three');
		} catch {
			webglSupported = false;
			return;
		}

		const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
		if (!gl) {
			webglSupported = false;
			return;
		}

		const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
		const dpr = Math.min(window.devicePixelRatio, 1.5);
		renderer.setPixelRatio(dpr);
		renderer.setSize(window.innerWidth, window.innerHeight);

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		const geometry = new THREE.PlaneGeometry(2, 2);
		const material = new THREE.ShaderMaterial({
			uniforms: {
				uTime: { value: 0 },
				uResolution: {
					value: new THREE.Vector2(window.innerWidth * dpr, window.innerHeight * dpr)
				},
				uMouse: { value: new THREE.Vector2(0.5, 0.5) }
			},
			vertexShader: VERTEX_SHADER,
			fragmentShader: FRAGMENT_SHADER
		});

		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		const mouseTarget = new THREE.Vector2(0.5, 0.5);
		const mouseCurrent = new THREE.Vector2(0.5, 0.5);

		const onMouseMove = (e: MouseEvent) => {
			mouseTarget.set(e.clientX / window.innerWidth, 1.0 - e.clientY / window.innerHeight);
		};
		window.addEventListener('mousemove', onMouseMove);

		const onResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			material.uniforms.uResolution.value.set(
				window.innerWidth * dpr,
				window.innerHeight * dpr
			);
		};
		window.addEventListener('resize', onResize);

		const clock = new THREE.Clock();
		let animId: number;

		const animate = () => {
			animId = requestAnimationFrame(animate);
			if (document.hidden) return;

			material.uniforms.uTime.value = clock.getElapsedTime();
			mouseCurrent.lerp(mouseTarget, 0.04);
			material.uniforms.uMouse.value.copy(mouseCurrent);
			renderer.render(scene, camera);
		};
		animate();

		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(animId);
			renderer.dispose();
			geometry.dispose();
			material.dispose();
		};
	});
</script>

<section
	bind:this={heroSection}
	id="hero"
	class="relative flex h-screen min-h-[600px] items-center overflow-hidden"
>
	<!-- Shader canvas -->
	{#if webglSupported}
		<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
	{:else}
		<div class="hero-gradient-fallback absolute inset-0" aria-hidden="true"></div>
	{/if}

	<!-- Subtle grid overlay -->
	<div class="hero-grid absolute inset-0 opacity-[0.025]" aria-hidden="true"></div>

	<!-- Floating particles -->
	<div class="absolute inset-0 overflow-hidden" aria-hidden="true">
		<div
			class="hero-particle absolute top-[15%] right-[20%] h-1.5 w-1.5 rounded-full bg-indigo-400/40"
			style="animation: float 4s ease-in-out infinite;"
		></div>
		<div
			class="hero-particle absolute top-[35%] right-[10%] h-1 w-1 rounded-full bg-blue-400/30"
			style="animation: float 5s ease-in-out infinite 0.5s;"
		></div>
		<div
			class="hero-particle absolute top-[60%] right-[25%] h-2 w-2 rounded-full bg-indigo-500/20"
			style="animation: float 6s ease-in-out infinite 1s;"
		></div>
		<div
			class="hero-particle absolute top-[20%] right-[40%] h-1 w-1 rounded-full bg-blue-300/25"
			style="animation: float 3.5s ease-in-out infinite 1.5s;"
		></div>
		<div
			class="hero-particle absolute top-[70%] right-[15%] h-1.5 w-1.5 rounded-full bg-indigo-300/20"
			style="animation: float 5.5s ease-in-out infinite 0.8s;"
		></div>
		<div
			class="hero-particle absolute top-[45%] right-[35%] h-1 w-1 rounded-full bg-violet-400/30"
			style="animation: float 4.5s ease-in-out infinite 2s;"
		></div>
	</div>

	<!-- Content — left aligned -->
	<div class="relative z-10 mx-auto w-full max-w-6xl px-6">
		<div class="max-w-3xl">
			<!-- System badge -->
			<div class="hero-system-badge mb-6 inline-flex items-center gap-3">
				<span
					class="inline-flex items-center gap-2 rounded-md border border-indigo-500/20 bg-indigo-500/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-400"
				>
					<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400"></span>
					System Online
				</span>
			</div>

			<!-- Rank + Name -->
			<div class="flex items-start gap-6">
				<!-- Rank badge -->
				<div class="hero-rank hidden flex-shrink-0 md:block">
					<div
						class="flex h-20 w-20 flex-col items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/5"
					>
						<span class="text-[10px] font-medium uppercase tracking-wider text-indigo-400/60"
							>Rank</span
						>
						<span
							class="text-3xl font-black text-indigo-400"
							style="text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);">S</span
						>
					</div>
				</div>

				<!-- Name -->
				<div>
					<div class="overflow-hidden" style="perspective: 800px;">
						<h1
							class="text-[clamp(3.5rem,10vw,8rem)] font-black leading-[0.9] tracking-tighter"
						>
							{#each resume.name.split(' ') as word, wi}
								<span class="block">
									{#each word.split('') as char}
										<span
											class="hero-letter inline-block {wi === 0
												? 'text-slate-100'
												: 'sl-text-glow text-indigo-400'}"
											style={wi === 1
												? 'text-shadow: 0 0 30px rgba(99, 102, 241, 0.4);'
												: ''}
										>
											{char}
										</span>
									{/each}
								</span>
							{/each}
						</h1>
					</div>

					<!-- Class -->
					<div class="hero-class mt-4 flex items-center gap-3">
						<span class="h-px w-8 bg-indigo-500/40"></span>
						<span class="text-sm font-medium uppercase tracking-[0.15em] text-slate-400">
							{resume.title}
						</span>
					</div>
				</div>
			</div>

			<!-- Typewriter tagline -->
			<p class="mt-8 h-7 max-w-lg font-mono text-sm text-slate-500 md:text-base">
				<span class="text-indigo-500/60">{'>'}</span>
				{displayedTagline}<span class="sl-cursor ml-0.5 inline-block h-4 w-[2px] bg-indigo-400"
				></span>
			</p>

			<!-- CTAs -->
			<div class="mt-10 flex flex-wrap items-center gap-4">
				<MagneticButton
					onclick={() => scrollTo('#projects')}
					class="hero-cta group inline-flex items-center gap-2.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-7 py-3.5 text-sm font-semibold text-indigo-300 transition-all hover:border-indigo-400/50 hover:bg-indigo-500/20 hover:text-indigo-200 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
				>
					View Quests
					<svg
						class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17 8l4 4m0 0l-4 4m4-4H3"
						/>
					</svg>
				</MagneticButton>

				<MagneticButton
					onclick={() => scrollTo('#contact')}
					class="hero-cta inline-flex items-center gap-2 rounded-lg border border-slate-700/50 px-7 py-3.5 text-sm font-medium text-slate-400 transition-all hover:border-slate-600 hover:text-slate-300"
				>
					Get in Touch
				</MagneticButton>
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="hero-scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
	>
		<span class="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-700">Scroll</span>
		<div
			class="flex h-9 w-5 items-start justify-center rounded-full border border-indigo-500/20 p-1.5"
		>
			<div class="scroll-bounce h-2 w-0.5 rounded-full bg-indigo-400/60"></div>
		</div>
	</div>
</section>
