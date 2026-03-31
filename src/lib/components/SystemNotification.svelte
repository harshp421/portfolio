<script lang="ts">
	import { onMount } from 'svelte';

	interface Notification {
		id: number;
		text: string;
		state: 'in' | 'out';
	}

	let notifications = $state<Notification[]>([]);

	function show(text: string) {
		const id = Date.now();
		notifications.push({ id, text, state: 'in' });
		setTimeout(() => {
			const n = notifications.find((n) => n.id === id);
			if (n) n.state = 'out';
		}, 2500);
		setTimeout(() => {
			notifications = notifications.filter((n) => n.id !== id);
		}, 3000);
	}

	onMount(() => {
		const sections = document.querySelectorAll('[data-system-msg]');
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const msg = (entry.target as HTMLElement).dataset.systemMsg;
						if (msg) show(msg);
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.3 }
		);
		sections.forEach((s) => observer.observe(s));
		return () => observer.disconnect();
	});
</script>

<div class="fixed right-6 top-20 z-[60] space-y-2 pointer-events-none hidden md:block" aria-live="polite">
	{#each notifications as notif (notif.id)}
		<div
			class="sl-panel pointer-events-auto rounded-lg px-4 py-3 font-mono text-xs max-w-xs"
			style="animation: {notif.state === 'in' ? 'slide-in-right' : 'slide-out-right'} 0.4s ease forwards;"
		>
			<span class="text-system-blue font-bold">[SYSTEM]</span>
			<span class="ml-1.5 text-slate-400">{notif.text}</span>
		</div>
	{/each}
</div>
