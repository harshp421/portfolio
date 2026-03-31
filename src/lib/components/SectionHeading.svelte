<script lang="ts">
	let {
		label,
		title
	}: {
		label: string;
		title: string;
	} = $props();
</script>

<div class="section-heading mb-16">
	<span class="mb-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
		{label}
	</span>
	<h2 class="text-4xl font-bold tracking-tight text-zinc-100 md:text-5xl">
		{title}
	</h2>
</div>
