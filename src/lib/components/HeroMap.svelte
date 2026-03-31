<!-- SVG Terrain Map overlay for the Hero dungeon map — brighter, more readable -->
<svg
	viewBox="0 0 1200 800"
	class="absolute inset-0 h-full w-full"
	preserveAspectRatio="xMidYMid slice"
	aria-hidden="true"
>
	<defs>
		<radialGradient id="zone-highlands" cx="22%" cy="30%" r="18%">
			<stop offset="0%" stop-color="rgba(107,114,128,0.12)" />
			<stop offset="100%" stop-color="transparent" />
		</radialGradient>
		<radialGradient id="zone-fortress" cx="60%" cy="26%" r="15%">
			<stop offset="0%" stop-color="rgba(59,130,246,0.10)" />
			<stop offset="100%" stop-color="transparent" />
		</radialGradient>
		<radialGradient id="zone-valley" cx="38%" cy="50%" r="16%">
			<stop offset="0%" stop-color="rgba(16,185,129,0.10)" />
			<stop offset="100%" stop-color="transparent" />
		</radialGradient>
		<radialGradient id="zone-archives" cx="18%" cy="66%" r="14%">
			<stop offset="0%" stop-color="rgba(251,191,36,0.08)" />
			<stop offset="100%" stop-color="transparent" />
		</radialGradient>
		<radialGradient id="zone-gate" cx="74%" cy="60%" r="20%">
			<stop offset="0%" stop-color="rgba(239,68,68,0.12)" />
			<stop offset="50%" stop-color="rgba(157,0,255,0.05)" />
			<stop offset="100%" stop-color="transparent" />
		</radialGradient>
	</defs>

	<!-- Zone ambient fills -->
	<rect width="1200" height="800" fill="url(#zone-highlands)" />
	<rect width="1200" height="800" fill="url(#zone-fortress)" />
	<rect width="1200" height="800" fill="url(#zone-valley)" />
	<rect width="1200" height="800" fill="url(#zone-archives)" />
	<rect width="1200" height="800" fill="url(#zone-gate)" />

	<!-- TOPOGRAPHIC CONTOUR LINES — boosted opacity -->
	<g opacity="0.14" fill="none" stroke="#0066ff" stroke-width="0.7">
		<ellipse cx="264" cy="240" rx="130" ry="85" />
		<ellipse cx="264" cy="240" rx="95" ry="58" />
		<ellipse cx="264" cy="240" rx="55" ry="30" />
		<ellipse cx="720" cy="208" rx="110" ry="70" />
		<ellipse cx="720" cy="208" rx="70" ry="40" />
		<ellipse cx="456" cy="400" rx="120" ry="75" />
		<ellipse cx="456" cy="400" rx="80" ry="48" />
		<ellipse cx="216" cy="528" rx="90" ry="58" />
		<ellipse cx="216" cy="528" rx="52" ry="32" />
	</g>
	<!-- Gate contours — red, more prominent -->
	<g opacity="0.18" fill="none" stroke="#ef4444" stroke-width="0.8">
		<ellipse cx="888" cy="480" rx="150" ry="105" />
		<ellipse cx="888" cy="480" rx="110" ry="72" />
		<ellipse cx="888" cy="480" rx="65" ry="40" />
	</g>

	<!-- MOUNTAIN PEAKS -->
	<g opacity="0.2" stroke="#64748b" fill="none" stroke-width="1" stroke-linejoin="round">
		<path d="M195 262 L213 215 L231 262" />
		<path d="M226 257 L250 195 L274 257" />
		<path d="M263 260 L280 222 L297 260" />
		<path d="M305 258 L326 205 L347 258" />
		<path d="M175 272 L193 232 L211 272" />
		<!-- Small peaks -->
		<path d="M240 265 L250 245 L260 265" opacity="0.5" />
		<path d="M310 265 L320 248 L330 265" opacity="0.5" />
	</g>

	<!-- FORTRESS STRUCTURES -->
	<g opacity="0.15" stroke="#3b82f6" fill="none" stroke-width="0.8">
		<rect x="688" y="182" width="22" height="28" rx="1" />
		<rect x="728" y="175" width="17" height="35" rx="1" />
		<rect x="755" y="187" width="20" height="22" rx="1" />
		<!-- Towers -->
		<circle cx="699" cy="182" r="4" />
		<circle cx="745" cy="175" r="3" />
		<circle cx="765" cy="187" r="3.5" />
		<!-- Walls -->
		<path d="M682 216 L785 216" stroke-dasharray="4,4" />
		<path d="M682 216 L682 175" stroke-dasharray="4,4" opacity="0.7" />
		<path d="M785 216 L785 180" stroke-dasharray="4,4" opacity="0.7" />
	</g>

	<!-- RIVER — more visible -->
	<g opacity="0.18" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-linecap="round">
		<path d="M80 350 C180 335, 280 380, 380 392 S530 425, 610 398 S710 370, 810 402 S960 435, 1120 375" />
		<!-- Tributary -->
		<path d="M345 295 C375 340, 370 372, 380 392" stroke-width="1" opacity="0.6" />
		<!-- Water ripple marks -->
		<path d="M450 405 Q460 395 470 405" stroke-width="0.6" opacity="0.4" />
		<path d="M580 400 Q590 390 600 400" stroke-width="0.6" opacity="0.4" />
		<path d="M750 395 Q760 385 770 395" stroke-width="0.6" opacity="0.4" />
	</g>

	<!-- FOREST / CRYSTAL VALLEY -->
	<g opacity="0.15" fill="#10b981">
		<circle cx="405" cy="375" r="4" />
		<circle cx="422" cy="392" r="3.5" />
		<circle cx="440" cy="372" r="3" />
		<circle cx="460" cy="412" r="4" />
		<circle cx="480" cy="388" r="3" />
		<circle cx="435" cy="418" r="3.5" />
		<circle cx="498" cy="402" r="3" />
		<circle cx="412" cy="415" r="2.5" />
		<circle cx="470" cy="378" r="2.5" />
		<circle cx="450" cy="430" r="3" />
	</g>

	<!-- ANCIENT ARCHIVE RUINS -->
	<g opacity="0.14" stroke="#fbbf24" fill="none" stroke-width="0.8">
		<rect x="192" y="508" width="10" height="10" transform="rotate(15 197 513)" />
		<rect x="225" y="518" width="7" height="12" transform="rotate(-5 228 524)" />
		<rect x="207" y="542" width="12" height="7" transform="rotate(8 213 545)" />
		<rect x="242" y="503" width="6" height="14" />
		<!-- Broken arch -->
		<path d="M200 535 Q210 520 220 535" fill="none" />
	</g>

	<!-- PATHS CONNECTING DUNGEONS — boosted dotted trail -->
	<g fill="none" stroke="#0066ff" stroke-width="1" opacity="0.15" stroke-dasharray="5,7" stroke-linecap="round">
		<path d="M264 260 C310 310, 380 360, 456 400" />
		<path d="M456 400 C530 360, 630 280, 720 208" />
		<path d="M456 400 C380 440, 300 485, 216 528" />
		<path d="M720 208 C780 310, 840 400, 888 480" />
		<path d="M456 400 C570 420, 710 445, 888 480" />
	</g>
	<!-- Main road — solid -->
	<g fill="none" stroke="#0066ff" stroke-width="0.8" opacity="0.1" stroke-linecap="round">
		<path d="M264 240 C350 320, 400 380, 456 400 C600 380, 720 300, 720 208" />
	</g>

	<!-- ZONE LABELS — more readable -->
	<g font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="0.2em" opacity="0.12" fill="#94a3b8">
		<text x="264" y="175" text-anchor="middle">NORTHERN HIGHLANDS</text>
		<text x="720" y="150" text-anchor="middle">IRON FORTRESS</text>
		<text x="456" y="338" text-anchor="middle">CRYSTAL VALLEY</text>
		<text x="216" y="472" text-anchor="middle">ANCIENT ARCHIVES</text>
		<text x="888" y="390" text-anchor="middle" fill="#ef4444" opacity="1.5">SHADOW GATE</text>
	</g>

	<!-- COMPASS ROSE -->
	<g transform="translate(1100, 100)" opacity="0.15" stroke="#0066ff" fill="none" stroke-width="1">
		<circle cx="0" cy="0" r="22" />
		<circle cx="0" cy="0" r="16" opacity="0.4" />
		<line x1="0" y1="-26" x2="0" y2="26" />
		<line x1="-26" y1="0" x2="26" y2="0" />
		<line x1="-18" y1="-18" x2="18" y2="18" opacity="0.3" />
		<line x1="18" y1="-18" x2="-18" y2="18" opacity="0.3" />
		<polygon points="0,-30 -5,-22 5,-22" fill="#0066ff" stroke="none" />
		<text x="0" y="-35" font-family="'JetBrains Mono', monospace" font-size="8" fill="#0066ff" text-anchor="middle" stroke="none" letter-spacing="0.1em">N</text>
	</g>

	<!-- S-RANK GATE ENERGY RINGS — more visible -->
	<g transform="translate(888, 480)" opacity="0.15">
		<circle cx="0" cy="0" r="55" fill="none" stroke="#ef4444" stroke-width="0.7" stroke-dasharray="3,5">
			<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="20s" repeatCount="indefinite" />
		</circle>
		<circle cx="0" cy="0" r="38" fill="none" stroke="#9d00ff" stroke-width="0.5" stroke-dasharray="4,6">
			<animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="15s" repeatCount="indefinite" />
		</circle>
		<circle cx="0" cy="0" r="22" fill="none" stroke="#ef4444" stroke-width="0.3" stroke-dasharray="2,4" opacity="0.7">
			<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="10s" repeatCount="indefinite" />
		</circle>
	</g>

	<!-- SCALE BAR -->
	<g transform="translate(540, 760)" opacity="0.08">
		<line x1="0" y1="0" x2="80" y2="0" stroke="#94a3b8" stroke-width="1" />
		<line x1="0" y1="-4" x2="0" y2="4" stroke="#94a3b8" stroke-width="1" />
		<line x1="40" y1="-2" x2="40" y2="2" stroke="#94a3b8" stroke-width="0.7" />
		<line x1="80" y1="-4" x2="80" y2="4" stroke="#94a3b8" stroke-width="1" />
		<text x="40" y="14" font-family="'JetBrains Mono', monospace" font-size="7" fill="#94a3b8" text-anchor="middle">50 km</text>
	</g>
</svg>
