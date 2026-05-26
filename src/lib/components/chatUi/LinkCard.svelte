<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

	let { url }: { url: string } = $props();

	type Preview = {
		title?: string;
		description?: string;
		image?: string;
		logo?: string;
		publisher?: string;
	};

	let status = $state<'loading' | 'ready' | 'error'>('loading');
	let preview = $state<Preview>({});

	const domain = (() => {
		try {
			return new URL(url).hostname.replace(/^www\./, '');
		} catch {
			return url;
		}
	})();

	// Swap this fetch for your own backend (e.g. `${API_BASE}/api/v1/og?url=`) later.
	async function loadPreview() {
		try {
			const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
			const json = await res.json();
			if (json.status !== 'success') throw new Error('no preview');

			const d = json.data;
			preview = {
				title: d.title,
				description: d.description,
				image: d.image?.url,
				logo: d.logo?.url,
				publisher: d.publisher
			};
			status = 'ready';
		} catch {
			status = 'error';
		}
	}

	$effect(() => {
		loadPreview();
	});
</script>

<a
	href={url}
	target="_blank"
	rel="noopener noreferrer"
	class="group block overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-neutral-300 hover:shadow-md"
>
	{#if status === 'loading'}
		<div class="animate-pulse">
			<div class="h-28 w-full bg-neutral-200"></div>
			<div class="space-y-2 p-3">
				<div class="h-3 w-2/3 rounded bg-neutral-200"></div>
				<div class="h-2.5 w-full rounded bg-neutral-100"></div>
			</div>
		</div>
	{:else if status === 'ready'}
		{#if preview.image}
			<img src={preview.image} alt="" class="h-28 w-full object-cover" loading="lazy" />
		{/if}
		<div class="p-3">
			{#if preview.title}
				<p class="line-clamp-1 text-sm font-semibold text-neutral-900">{preview.title}</p>
			{/if}
			{#if preview.description}
				<p class="mt-0.5 line-clamp-2 text-xs leading-snug text-neutral-500">{preview.description}</p>
			{/if}
			<div class="mt-2 flex items-center gap-1.5 text-[11px] text-neutral-400">
				{#if preview.logo}
					<img src={preview.logo} alt="" class="size-3.5 rounded-sm" />
				{/if}
				<span class="truncate">{preview.publisher ?? domain}</span>
				<ExternalLink class="ml-auto size-3 shrink-0 transition group-hover:text-neutral-600" />
			</div>
		</div>
	{:else}
		<!-- fallback: no OG data, show a plain link row -->
		<div class="flex items-center gap-2 p-3 text-sm text-neutral-700">
			<ExternalLink class="size-4 shrink-0 text-neutral-400" />
			<span class="truncate">{domain}</span>
		</div>
	{/if}
</a>
