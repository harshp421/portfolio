<script lang="ts">
	import { onMount } from 'svelte';
	import { resume, MAP_MARKERS } from '$lib/data/resume';
	import { RANK_COLORS, MARKER_COLORS } from '$lib/types';
	import MagneticButton from './MagneticButton.svelte';
	import HeroMap from './HeroMap.svelte';
	import { scrollTo } from '$lib/utils/scroll';

	let canvas = $state<HTMLCanvasElement>();
	let webglSupported = $state(true);
	let introComplete = $state(false);
	let activeMarker = $state<string | null>(null);
	let popupBelow = $state(false);

	const rc = RANK_COLORS[resume.hunterRank];

	function onMarkerEnter(id: string, y: number) {
		activeMarker = id;
		popupBelow = y < 40; // if marker is in top 40%, show popup below
	}

	const VERTEX_SHADER = `void main() { gl_Position = vec4(position, 1.0); }`;
	const FRAGMENT_SHADER = `
		precision highp float;
		uniform float uTime; uniform vec2 uResolution; uniform vec2 uMouse;
		vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
		float snoise(vec2 v){
			const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
			vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);
			vec2 i1=(x0.x>x0.y)?vec2(1,0):vec2(0,1);vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
			i=mod(i,289.0);vec3 p=permute(permute(i.y+vec3(0,i1.y,1))+i.x+vec3(0,i1.x,1));
			vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;
			vec3 x_=2.0*fract(p*C.www)-1.0;vec3 h=abs(x_)-0.5;vec3 ox=floor(x_+0.5);vec3 a0=x_-ox;
			m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
			vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}
		void main(){
			vec2 uv=gl_FragCoord.xy/uResolution;float a=uResolution.x/uResolution.y;
			vec2 p=uv;p.x*=a;float t=uTime*0.06;
			vec3 base=vec3(0.04,0.05,0.10);
			float n1=snoise(vec2(p.x*0.8,p.y*2.5+t*0.4));
			float n2=snoise(vec2(p.x*1.2+t*0.2,p.y*2.0));
			float n3=snoise(vec2(p.x*0.5-t*0.1,p.y*3.5+t*0.3));
			vec3 c=base;
			c+=vec3(0.02,0.03,0.18)*smoothstep(-0.1,0.6,n1)*0.5;
			c+=vec3(0.0,0.08,0.30)*smoothstep(0.0,0.65,n2)*0.35;
			c+=vec3(0.06,0.0,0.14)*smoothstep(-0.2,0.5,n3)*0.25;
			c+=vec3(0.0,0.2,0.9)*smoothstep(0.55,0.85,n1*n2)*0.15;
			vec2 mp=uMouse;mp.x*=a;c+=vec3(0.0,0.12,0.4)*smoothstep(0.5,0.0,distance(p,mp))*0.2;
			c*=smoothstep(2.2,0.3,length(uv-0.5)*2.0);
			gl_FragColor=vec4(c,1.0);}`;

	onMount(async () => {
		const { gsap } = await import('gsap');
		const { TextPlugin } = await import('gsap/TextPlugin');
		gsap.registerPlugin(TextPlugin);

		// INTRO
		const intro = gsap.timeline();
		intro.fromTo('.intro-tag', { opacity: 0 }, { opacity: 1, duration: 0.1, repeat: 3, yoyo: true });
		intro.to('.intro-welcome', { duration: 0.5, text: 'Welcome, Hunter.', ease: 'none' }, '+=0.1');
		intro.to('.intro-loading', { duration: 0.6, text: 'Mapping dungeon locations...', ease: 'none' }, '+=0.1');
		const bp = { v: 0 };
		intro.to(bp, { v: 100, duration: 0.6, ease: 'power2.inOut', onUpdate() {
			const bar = document.querySelector('.intro-bar-fill') as HTMLElement;
			const pct = document.querySelector('.intro-pct') as HTMLElement;
			if (bar) bar.style.width = `${bp.v}%`; if (pct) pct.textContent = `${Math.round(bp.v)}%`;
		}}, '+=0.1');
		intro.to('.intro-status', { duration: 0.25, text: '[ MAP LOADED ]', ease: 'none' }, '+=0.15');
		intro.to('.intro-flash', { opacity: 0.12, duration: 0.08 }, '+=0.15');
		intro.to('.intro-flash', { opacity: 0, duration: 0.25 });
		intro.to('.intro-overlay', { opacity: 0, duration: 0.4, ease: 'power2.in', onComplete() { introComplete = true; } }, '-=0.1');

		// MAP REVEAL
		const reveal = gsap.timeline({ delay: intro.duration() + 0.05 });
		reveal.from('.hero-panel', { x: -40, opacity: 0, duration: 0.6, ease: 'power3.out' });
		reveal.from('.hero-sys-msg', { y: -15, opacity: 0, duration: 0.4, ease: 'power3.out' }, '-=0.3');
		reveal.from('.map-marker-el', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'back.out(2)' }, '-=0.2');
		reveal.from('.hero-legend', { x: -20, opacity: 0, duration: 0.4, ease: 'power3.out' }, '-=0.2');
		reveal.from('.hero-minimap', { x: 20, opacity: 0, duration: 0.4, ease: 'power3.out' }, '-=0.3');
		reveal.from('.hero-scroll', { opacity: 0, duration: 0.5 }, '-=0.1');

		// THREE.JS
		if (!canvas) return;
		let THREE: typeof import('three');
		try { THREE = await import('three'); } catch { webglSupported = false; return; }
		const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
		if (!gl) { webglSupported = false; return; }
		const r = new THREE.WebGLRenderer({ canvas, alpha: false });
		const d = Math.min(window.devicePixelRatio, 1.5);
		r.setPixelRatio(d); r.setSize(window.innerWidth, window.innerHeight);
		const sc = new THREE.Scene(); const cam = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
		const mat = new THREE.ShaderMaterial({ uniforms: { uTime:{value:0}, uResolution:{value:new THREE.Vector2(window.innerWidth*d,window.innerHeight*d)}, uMouse:{value:new THREE.Vector2(0.5,0.5)} }, vertexShader:VERTEX_SHADER, fragmentShader:FRAGMENT_SHADER });
		sc.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2), mat));
		const mt = new THREE.Vector2(0.5,0.5), mc = new THREE.Vector2(0.5,0.5);
		const mm = (e:MouseEvent) => mt.set(e.clientX/window.innerWidth, 1-e.clientY/window.innerHeight);
		window.addEventListener('mousemove', mm);
		const rs = () => { r.setSize(window.innerWidth,window.innerHeight); mat.uniforms.uResolution.value.set(window.innerWidth*d,window.innerHeight*d); };
		window.addEventListener('resize', rs);
		const ck = new THREE.Clock(); let aid:number;
		const anim = () => { aid=requestAnimationFrame(anim); if(document.hidden)return; mat.uniforms.uTime.value=ck.getElapsedTime(); mc.lerp(mt,0.04); mat.uniforms.uMouse.value.copy(mc); r.render(sc,cam); };
		anim();
		return () => { window.removeEventListener('mousemove',mm); window.removeEventListener('resize',rs); cancelAnimationFrame(aid); r.dispose(); };
	});
</script>

<!-- INTRO OVERLAY -->
<div class="intro-overlay fixed inset-0 z-[100] flex items-center justify-center bg-void" class:pointer-events-none={introComplete} class:hidden={introComplete}>
	<div class="absolute inset-0 overflow-hidden"><div class="absolute left-0 right-0 h-px bg-system-blue/20" style="animation: scan-line 3s linear infinite;"></div></div>
	<div class="text-center">
		<div class="intro-tag sl-tag opacity-0">[SYSTEM]</div>
		<p class="intro-welcome mt-4 font-mono text-lg text-white"></p>
		<p class="intro-loading mt-1 font-mono text-sm text-slate-500"></p>
		<div class="mx-auto mt-5 w-64">
			<div class="h-[3px] overflow-hidden rounded-full bg-slate-800"><div class="intro-bar-fill h-full w-0 rounded-full bg-linear-to-r from-system-blue to-system-glow"></div></div>
			<div class="intro-pct mt-1 text-right font-mono text-[10px] text-slate-700">0%</div>
		</div>
		<p class="intro-status mt-3 font-mono text-xs text-system-blue/70"></p>
	</div>
	<div class="intro-flash absolute inset-0 bg-system-blue opacity-0 pointer-events-none"></div>
</div>

<!-- MAIN HERO — INTERACTIVE DUNGEON MAP -->
<section id="hero" class="relative flex h-screen min-h-[650px] items-center overflow-hidden">
	{#if webglSupported}
		<canvas bind:this={canvas} class="absolute inset-0 h-full w-full" aria-hidden="true"></canvas>
	{:else}
		<div class="hero-gradient-fallback absolute inset-0" aria-hidden="true"></div>
	{/if}

	<!-- Grid -->
	<div class="hero-grid absolute inset-0 opacity-[0.04]" aria-hidden="true"></div>

	<!-- SVG Terrain Map -->
	<HeroMap />

	<!-- PLAYER INFO PANEL (top-left) -->
	<div class="hero-panel absolute left-4 top-20 z-20 md:left-8 md:top-24">
		<div class="sl-panel w-56 rounded-xl p-4 md:w-64 md:p-5">
			<div class="sl-tag mb-3 text-[9px]"><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-system-blue"></span>Hunter Profile</div>
			<div class="font-mono text-sm font-bold text-white">{resume.name}</div>
			<div class="mt-1 font-mono text-[11px] text-slate-500">{resume.title}</div>
			<!-- Rank with progression -->
			<div class="mt-3 flex items-center gap-2">
				<div class="flex h-8 w-8 items-center justify-center rounded {rc.border} {rc.bg} {rc.glow}">
					<span class="text-sm font-black {rc.text}">{resume.hunterRank}</span>
				</div>
				<div class="flex-1">
					<div class="flex items-center justify-between">
						<span class="font-mono text-[10px] {rc.text}">Rank {resume.hunterRank}</span>
						<span class="font-mono text-[10px] text-red-400/60">S</span>
					</div>
					<div class="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-800">
						<div class="h-full rounded-full bg-linear-to-r from-amber-400 to-amber-300" style="width: {resume.hunterRankProgress}%;"></div>
					</div>
					<div class="mt-0.5 font-mono text-[9px] text-slate-700">{resume.hunterRankProgress}% to S-Rank</div>
				</div>
			</div>
			<!-- Level -->
			<div class="mt-2 flex items-center gap-2">
				<span class="font-mono text-[10px] font-bold text-system-blue">LVL {resume.hunterLevel}</span>
				<div class="h-1 flex-1 overflow-hidden rounded-full bg-slate-800">
					<div class="h-full rounded-full bg-linear-to-r from-system-blue to-system-glow" style="width: {resume.hunterExp}%;"></div>
				</div>
			</div>
		</div>
	</div>

	<!-- SYSTEM MESSAGE (top-center) — desktop only -->
	<div class="hero-sys-msg absolute left-1/2 top-24 z-20 hidden -translate-x-1/2 md:block">
		<div class="sl-tag text-[10px]">Select a dungeon to view quest details</div>
	</div>

	<!-- MAP MARKERS — desktop -->
	<div class="absolute inset-0 z-10 hidden md:block">
		{#each MAP_MARKERS as marker}
			{@const mc = MARKER_COLORS[marker.type]}
			{@const proj = resume.projects[marker.projectIndex]}
			<div class="map-marker-el absolute" style="left: {marker.x}%; top: {marker.y}%;">
				<!-- Marker button -->
				<button
					class="group relative flex flex-col items-center"
					onmouseenter={() => onMarkerEnter(marker.id, marker.y)}
					onmouseleave={() => activeMarker = null}
					onclick={() => scrollTo('#projects')}
				>
					<!-- Outer glow ring -->
					<div class="absolute -inset-3 rounded-full {mc.dot}/5 opacity-0 transition-opacity group-hover:opacity-100"></div>
					<!-- Diamond -->
					<div class="relative">
						{#if marker.type === 's-rank'}
							<div class="absolute -inset-3 animate-ping rounded-full bg-red-500/10"></div>
						{/if}
						<div class="h-5 w-5 rotate-45 border-2 {mc.border} {mc.dot}/15 {mc.glow} transition-all group-hover:scale-[1.3]"></div>
						<div class="absolute inset-1 rotate-45 {mc.dot}/30 rounded-sm"></div>
					</div>
					<!-- Label -->
					<span class="mt-2 whitespace-nowrap rounded bg-void/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-300 backdrop-blur-sm transition-colors group-hover:text-white">
						{marker.label}
					</span>
					{#if marker.type === 's-rank'}
						<span class="mt-0.5 font-mono text-[8px] text-red-400/60 uppercase tracking-wider">S-Rank Gate</span>
					{/if}
				</button>

				<!-- POPUP CARD -->
				{#if activeMarker === marker.id}
					{@const prc = RANK_COLORS[proj.rank]}
					<div
						class="absolute left-1/2 z-30 w-80 -translate-x-1/2 {popupBelow ? 'top-full mt-4' : 'bottom-full mb-4'}"
						style="animation: popup-appear 0.25s ease forwards;"
					>
						<!-- Arrow pointer -->
						<div class="absolute left-1/2 -translate-x-1/2 {popupBelow ? '-top-1.5' : '-bottom-1.5'}">
							<div class="h-3 w-3 rotate-45 border-system-blue/20 bg-[#0c1528] {popupBelow ? 'border-t border-l' : 'border-b border-r'}"></div>
						</div>

						<div class="rounded-xl border border-system-blue/20 bg-[#0c1528] p-5 shadow-[0_0_30px_rgba(0,102,255,0.1),0_8px_32px_rgba(0,0,0,0.6)]">
							<!-- Header -->
							<div class="mb-3 flex items-center justify-between">
								<span class="sl-tag text-[9px]">Dungeon Info</span>
								<span class="rounded border px-2 py-0.5 {prc.border} {prc.bg} font-mono text-[10px] font-bold {prc.text} {prc.glow}">{proj.rank}-Rank</span>
							</div>

							<!-- Title -->
							<h3 class="text-base font-bold text-white">{proj.title}</h3>
							<p class="mt-0.5 text-xs text-slate-400">{proj.subtitle}
								{#if proj.company}
									<span class="text-system-blue/40">// {proj.company}</span>
								{/if}
							</p>

							<div class="my-3 h-px bg-system-blue/10"></div>

							<!-- Objectives -->
							<div class="mb-1 font-mono text-[9px] uppercase tracking-wider text-system-blue/50">Objectives</div>
							<div class="space-y-1">
								{#each proj.description.slice(0, 2) as d}
									<p class="flex gap-2 text-[11px] leading-relaxed text-slate-300">
										<span class="mt-0.5 text-emerald-400/70 text-[10px]">&#10003;</span>
										{d}
									</p>
								{/each}
							</div>

							<!-- Rewards -->
							<div class="mt-3 mb-1 font-mono text-[9px] uppercase tracking-wider text-system-blue/50">Rewards</div>
							<div class="flex flex-wrap gap-1.5">
								{#each proj.stack.slice(0, 5) as t}
									<span class="rounded border border-system-blue/15 bg-system-blue/8 px-2 py-0.5 font-mono text-[10px] text-slate-400">{t}</span>
								{/each}
							</div>

							<!-- Footer -->
							<div class="mt-4 flex items-center justify-between border-t border-system-blue/10 pt-3">
								<span class="font-mono text-[11px] font-semibold {proj.status === 'completed' ? 'text-emerald-400' : 'text-red-400'}">
									{proj.status === 'completed' ? '✓ CLEARED' : '⚡ UPCOMING'}
								</span>
								{#if proj.liveUrl}
									<a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" class="group/link inline-flex items-center gap-1 rounded border border-system-blue/20 bg-system-blue/8 px-3 py-1 font-mono text-[10px] text-system-blue transition-all hover:bg-system-blue/15 hover:text-white">
										Enter Dungeon
										<svg class="h-3 w-3 transition-transform group-hover/link:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
									</a>
								{/if}
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<!-- MOBILE: simplified list -->
	<div class="absolute inset-x-0 bottom-28 z-10 px-6 md:hidden">
		<div class="flex flex-wrap justify-center gap-2">
			{#each MAP_MARKERS as marker}
				{@const mc = MARKER_COLORS[marker.type]}
				<button onclick={() => scrollTo('#projects')} class="sl-panel flex items-center gap-2 rounded-lg px-3 py-2">
					<div class="h-2 w-2 rotate-45 {mc.dot}"></div>
					<span class="font-mono text-[11px] text-slate-400">{marker.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- LEGEND (bottom-left) — desktop -->
	<div class="hero-legend absolute bottom-8 left-8 z-20 hidden md:block">
		<div class="sl-panel rounded-lg px-3 py-2.5">
			<div class="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-system-blue/50">Map Legend</div>
			<div class="space-y-1">
				<div class="flex items-center gap-2"><div class="h-2 w-2 rotate-45 border border-emerald-400/30 bg-emerald-400/10"></div><span class="font-mono text-[10px] text-slate-500">Completed</span></div>
				<div class="flex items-center gap-2"><div class="h-2 w-2 rotate-45 border border-blue-400/30 bg-blue-400/10"></div><span class="font-mono text-[10px] text-slate-500">In Progress</span></div>
				<div class="flex items-center gap-2"><div class="h-2 w-2 rotate-45 border border-red-500/40 bg-red-500/10"></div><span class="font-mono text-[10px] text-slate-500">S-Rank Gate</span></div>
			</div>
		</div>
	</div>

	<!-- MINIMAP (bottom-right) — desktop -->
	<div class="hero-minimap absolute bottom-8 right-8 z-20 hidden md:block">
		<div class="sl-panel rounded-lg p-2.5">
			<div class="mb-1 font-mono text-[9px] font-bold uppercase tracking-wider text-system-blue/50">Minimap</div>
			<div class="relative h-16 w-28 overflow-hidden rounded bg-void/60">
				<div class="absolute inset-0 hero-grid opacity-[0.08]"></div>
				{#each MAP_MARKERS as marker}
					{@const mc = MARKER_COLORS[marker.type]}
					<div class="absolute h-1.5 w-1.5 rounded-full {mc.dot} {activeMarker === marker.id ? 'scale-150' : ''} transition-transform" style="left: {marker.x}%; top: {marker.y}%;"></div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Scroll indicator -->
	<div class="hero-scroll absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2">
		<span class="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-700">Scroll</span>
		<div class="flex h-8 w-4 items-start justify-center rounded-full border border-system-blue/15 p-1">
			<div class="scroll-bounce h-1.5 w-0.5 rounded-full bg-system-blue/50"></div>
		</div>
	</div>
</section>
