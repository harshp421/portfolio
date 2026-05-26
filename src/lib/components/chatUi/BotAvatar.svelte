<script lang="ts">
	/**
	 * Friendly chat-bot avatar.
	 * Usage: <BotAvatar size={36} />  or  <BotAvatar class="size-9" />
	 */
	let { size = 40, class: klass = '' }: { size?: number; class?: string } = $props();
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 48 48"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	role="img"
	aria-label="Chat bot avatar"
	class={klass}
>
	<!-- background -->
	<rect width="48" height="48" rx="12" fill="#171717" />

	<!-- antenna -->
	<line x1="24" y1="9" x2="24" y2="14" stroke="#fff" stroke-width="2" stroke-linecap="round" />
	<circle cx="24" cy="7.5" r="2.5" fill="#34d399" />

	<!-- head -->
	<rect x="11" y="14" width="26" height="21" rx="8" fill="#fff" />

	<!-- ears -->
	<rect x="8" y="20" width="3" height="8" rx="1.5" fill="#fff" />
	<rect x="37" y="20" width="3" height="8" rx="1.5" fill="#fff" />

	<!-- eyes -->
	<circle cx="19" cy="24" r="2.6" fill="#171717" />
	<circle cx="29" cy="24" r="2.6" fill="#171717" />
	<!-- eye glints -->
	<circle cx="20" cy="23" r="0.8" fill="#fff" />
	<circle cx="30" cy="23" r="0.8" fill="#fff" />

	<!-- smile -->
	<path
		d="M19 29 Q24 32 29 29"
		stroke="#171717"
		stroke-width="2"
		stroke-linecap="round"
		fill="none"
	/>
</svg>
