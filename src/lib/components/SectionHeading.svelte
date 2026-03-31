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
	<div class="mb-3 flex items-center gap-3">
		<span class="h-px w-6 bg-indigo-500/40"></span>
		<span class="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/70">
			{label}
		</span>
	</div>
	<h2 class="text-4xl font-bold tracking-tight text-slate-100 md:text-5xl">
		{title}
	</h2>
</div>
