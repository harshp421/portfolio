<script lang="ts">
	import { onMount } from 'svelte';
	import { resume } from '$lib/data/resume';
	import MagneticButton from './MagneticButton.svelte';
	import { scrollTo } from '$lib/utils/scroll';

	let canvas = $state<HTMLCanvasElement>();
	let heroSection = $state<HTMLElement>();
	let webglSupported = $state(true);

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

		// Simplex 2D noise
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

			float time = uTime * 0.12;

			// Multi-layered organic noise
			float n1 = snoise(pos * 1.4 + vec2(time * 0.3, time * 0.2));
			float n2 = snoise(pos * 2.2 + vec2(-time * 0.25, time * 0.35));
			float n3 = snoise(pos * 0.8 + vec2(time * 0.15, -time * 0.28));
			float n4 = snoise(pos * 3.0 + vec2(-time * 0.1, -time * 0.15));

			// Deep, moody color palette
			vec3 deepPurple = vec3(0.16, 0.04, 0.28);
			vec3 deepBlue   = vec3(0.04, 0.10, 0.28);
			vec3 deepTeal   = vec3(0.04, 0.16, 0.16);
			vec3 warmDark   = vec3(0.10, 0.04, 0.08);
			vec3 base       = vec3(0.035, 0.035, 0.043);

			// Compose gradient blobs
			vec3 color = base;
			color += deepPurple * smoothstep(-0.1, 0.7, n1) * 0.45;
			color += deepBlue   * smoothstep(-0.2, 0.6, n2) * 0.40;
			color += deepTeal   * smoothstep(0.0, 0.8, n3)  * 0.30;
			color += warmDark   * smoothstep(0.1, 0.9, n4)  * 0.20;

			// Subtle mouse interaction — soft glow near cursor
			vec2 mousePos = uMouse;
			mousePos.x *= aspect;
			float mouseDist = distance(pos, mousePos);
			float mouseGlow = smoothstep(0.6, 0.0, mouseDist) * 0.12;
			color += vec3(0.12, 0.06, 0.18) * mouseGlow;

			// Soft vignette
			float vignette = smoothstep(1.8, 0.5, length(uv - 0.5) * 2.0);
			color *= vignette * 1.1;

			gl_FragColor = vec4(color, 1.0);
		}
	`;

	onMount(async () => {
		const { gsap } = await import('gsap');

		const tl = gsap.timeline({ delay: 0.2 });

		// Label line
		tl.from('.hero-label', {
			y: 30,
			opacity: 0,
			duration: 0.6,
			ease: 'power3.out'
		});

		// Name — letter by letter
		tl.from(
			'.hero-letter',
			{
				y: 100,
				opacity: 0,
				rotateX: -80,
				duration: 0.8,
				stagger: 0.04,
				ease: 'power3.out'
			},
			'-=0.2'
		);

		// Tagline
		tl.from(
			'.hero-tagline',
			{
				y: 40,
				opacity: 0,
				duration: 0.7,
				ease: 'power3.out'
			},
			'-=0.3'
		);

		// CTAs
		tl.from(
			'.hero-cta',
			{
				y: 30,
				opacity: 0,
				duration: 0.6,
				stagger: 0.08,
				ease: 'power3.out'
			},
			'-=0.3'
		);

		// Scroll indicator
		tl.from(
			'.hero-scroll-indicator',
			{
				opacity: 0,
				duration: 0.8,
				ease: 'power2.out'
			},
			'-=0.2'
		);

		// Three.js shader background
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
	class="relative flex h-screen min-h-[600px] items-center justify-center overflow-hidden"
>
	<!-- Shader canvas -->
	{#if webglSupported}
		<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
	{:else}
		<div class="hero-gradient-fallback absolute inset-0" aria-hidden="true"></div>
	{/if}

	<!-- Content -->
	<div class="relative z-10 mx-auto max-w-5xl px-6 text-center">
		<div class="overflow-hidden">
			<p class="hero-label mb-4 text-sm font-medium uppercase tracking-[0.25em] text-zinc-400">
				<span class="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-violet-500"></span>
				{resume.title}
			</p>
		</div>
		<div class="overflow-hidden" style="perspective: 600px;">
			<h1
				class="text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.95] tracking-tight text-zinc-50"
			>
				{#each resume.name.split('') as char}
					{#if char === ' '}
						<span class="hero-letter">&nbsp;</span>
					{:else}
						<span class="hero-letter">{char}</span>
					{/if}
				{/each}
			</h1>
		</div>
		<div class="overflow-hidden">
			<p class="hero-tagline mx-auto mt-6 max-w-xl text-lg text-zinc-400 md:text-xl">
				Building elegant web experiences from {resume.location}.
			</p>
		</div>

		<div class="mt-10 flex flex-wrap items-center justify-center gap-4">
			<MagneticButton
				onclick={() => scrollTo('#projects')}
				class="hero-cta group inline-flex items-center gap-2 rounded-full bg-zinc-100 px-7 py-3.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-white"
			>
				View Projects
				<svg
					class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</MagneticButton>

			<MagneticButton
				onclick={() => scrollTo('#contact')}
				class="hero-cta inline-flex items-center gap-2 rounded-full border border-zinc-700 px-7 py-3.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100"
			>
				Get in Touch
			</MagneticButton>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div
		class="hero-scroll-indicator absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
	>
		<span class="text-[10px] font-medium uppercase tracking-[0.3em] text-zinc-600">Scroll</span>
		<div class="flex h-9 w-5 items-start justify-center rounded-full border border-zinc-700 p-1.5">
			<div class="scroll-bounce h-2 w-0.5 rounded-full bg-zinc-400"></div>
		</div>
	</div>
</section>
