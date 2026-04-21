<script lang="ts">
	import { PACE_ZONES, getPaceZone, getBarPosition } from '$lib/utils/pace';

	let { pacePerKm }: { pacePerKm: number } = $props();

	let activeZone = $derived(getPaceZone(pacePerKm));
	let barPos = $derived(getBarPosition(pacePerKm));

	// Per-zone dot colors (light → dark). Zone 2 uses volt-muted rather than
	// #AAEE32 so --volt remains reserved for the 3 accent uses.
	const ZONE_DOT: Record<string, string> = {
		zone1: '#DDEEAA',
		zone2: '#88C020',
		zone3: '#77BB10',
		zone4: '#448800',
		zone5: '#224400'
	};
</script>

<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink3)] mb-3">Pace zones</p>

	<!-- Gradient bar with volt marker dot (one of the 3 volt places) -->
	<div
		class="relative h-1.5 rounded-full mb-4"
		style="background: linear-gradient(to right, #DDEEAA 0%, #AAEE32 25%, #77BB10 50%, #448800 75%, #224400 100%)"
	>
		{#if barPos !== null}
			<div
				class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[var(--volt)] border-[1.5px] border-[color:var(--ink)] transition-all duration-300"
				style="left: {barPos}%"
			></div>
		{/if}
	</div>

	<!-- Zone list -->
	<div class="space-y-0.5">
		{#each PACE_ZONES as zone}
			{@const isActive = activeZone?.name === zone.name}
			<div
				class="flex items-center gap-2.5 py-1.5 px-2 -mx-2 rounded-lg {isActive ? 'bg-[var(--surface)]' : ''}"
			>
				<div
					class="w-2.5 h-2.5 rounded-full flex-shrink-0 {isActive ? 'border-[1.5px]' : ''}"
					style="background-color: {isActive ? '#77BB10' : ZONE_DOT[zone.name]}; {isActive ? 'border-color: var(--ink);' : ''}"
				></div>
				<span class="flex-1 text-sm {isActive ? 'font-bold text-[color:var(--ink)]' : 'text-[color:var(--ink2)]'}">
					{zone.label}
				</span>
				<span class="text-xs text-[color:var(--ink3)] font-mono">{zone.description}</span>
			</div>
		{/each}
	</div>
</div>
