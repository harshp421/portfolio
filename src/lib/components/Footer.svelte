<script lang="ts">
	import { resume } from '$lib/data/resume';
</script>

<footer class="border-t border-neutral-100 py-8">
	<div class="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
		<p class="text-xs text-neutral-400">
			&copy; {new Date().getFullYear()} {resume.name}
		</p>
		<div class="flex items-center gap-5">
			{#each resume.socialLinks as link}
				<a
					href={link.url}
					target={link.url.startsWith('http') ? '_blank' : undefined}
					rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
					class="text-xs text-neutral-400 transition-colors hover:text-neutral-600"
				>
					{link.name}
				</a>
			{/each}
		</div>
	</div>
</footer>
