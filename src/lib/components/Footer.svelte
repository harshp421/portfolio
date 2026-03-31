<script lang="ts">
	import { resume } from '$lib/data/resume';
</script>

<footer class="border-t border-indigo-500/[0.06] py-8">
	<div
		class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row"
	>
		<p class="font-mono text-xs text-slate-700">
			&copy; {new Date().getFullYear()} {resume.name} <span class="text-indigo-500/30">//</span> Built
			with SvelteKit
		</p>
		<div class="flex items-center gap-4">
			{#each resume.socialLinks as link}
				<a
					href={link.url}
					target={link.url.startsWith('http') ? '_blank' : undefined}
					rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
					class="text-xs text-slate-700 transition-colors hover:text-indigo-400"
				>
					{link.name}
				</a>
			{/each}
		</div>
	</div>
</footer>
