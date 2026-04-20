<script lang="ts">
	import { PACE_ZONES, getPaceZone, getBarPosition } from '$lib/utils/pace';

	let { pacePerKm }: { pacePerKm: number } = $props();

	let activeZone = $derived(getPaceZone(pacePerKm));
	let barPos = $derived(getBarPosition(pacePerKm));

	function zoneDotClass(name: string): string {
		const map: Record<string, string> = {
			zone1: 'bg-green-300',
			zone2: 'bg-green-500',
			zone3: 'bg-blue-400',
			zone4: 'bg-blue-600',
			zone5: 'bg-red-400'
		};
		return map[name] ?? 'bg-stone-300';
	}
</script>

<div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Pace zones</p>

	<!-- Gradient bar with position marker -->
	<div
		class="relative h-1.5 rounded-full mb-4"
		style="background: linear-gradient(to right, #86efac, #22c55e 28%, #60a5fa 60%, #f87171 100%)"
	>
		{#if barPos !== null}
			<div
				class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full border-2 border-stone-400 shadow-sm transition-all duration-300"
				style="left: {barPos}%"
			></div>
		{/if}
	</div>

	<!-- Zone list -->
	<div class="space-y-0.5">
		{#each PACE_ZONES as zone}
			{@const isActive = activeZone?.name === zone.name}
			<div class="flex items-center gap-2.5 py-1.5">
				<div class="w-2.5 h-2.5 rounded-full flex-shrink-0 {zoneDotClass(zone.name)}"></div>
				<span class="flex-1 text-sm {isActive ? 'font-bold text-stone-900' : 'text-stone-500'}">
					{zone.label}
				</span>
				<span class="text-xs text-stone-400 font-mono">{zone.description}</span>
			</div>
		{/each}
	</div>
</div>
