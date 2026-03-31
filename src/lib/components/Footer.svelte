<script lang="ts">
	import { resume } from '$lib/data/resume';
</script>

<footer class="border-t border-zinc-900 py-8">
	<div class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
		<p class="text-sm text-zinc-600">
			&copy; {new Date().getFullYear()} {resume.name}. Built with SvelteKit.
		</p>
		<div class="flex items-center gap-4">
			{#each resume.socialLinks as link}
				<a
					href={link.url}
					target={link.url.startsWith('http') ? '_blank' : undefined}
					rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
					class="text-sm text-zinc-600 transition-colors hover:text-zinc-400"
				>
					{link.name}
				</a>
			{/each}
		</div>
	</div>
</footer>
