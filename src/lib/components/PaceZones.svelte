<script lang="ts">
	import { PACE_ZONES, getPaceZone } from '$lib/utils/pace';

	let { pacePerKm }: { pacePerKm: number } = $props();

	let activeZone = $derived(getPaceZone(pacePerKm));

	function zoneActiveClass(name: string): string {
		const map: Record<string, string> = {
			zone1: 'bg-green-50 ring-2 ring-green-300',
			zone2: 'bg-sky-50 ring-2 ring-sky-300',
			zone3: 'bg-yellow-50 ring-2 ring-yellow-300',
			zone4: 'bg-orange-50 ring-2 ring-orange-300',
			zone5: 'bg-red-50 ring-2 ring-red-300'
		};
		return map[name] ?? '';
	}

	function zoneDotClass(name: string): string {
		const map: Record<string, string> = {
			zone1: 'bg-green-400',
			zone2: 'bg-sky-400',
			zone3: 'bg-yellow-400',
			zone4: 'bg-orange-400',
			zone5: 'bg-red-400'
		};
		return map[name] ?? 'bg-gray-300';
	}
</script>

<div class="space-y-2">
	<h2 class="text-xs font-semibold text-gray-500 uppercase tracking-widest">Pace Zones</h2>
	<div class="space-y-1.5">
		{#each PACE_ZONES as zone}
			{@const isActive = activeZone?.name === zone.name}
			<div
				class="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 {isActive
					? zoneActiveClass(zone.name)
					: 'bg-gray-50'}"
			>
				<div class="w-2.5 h-2.5 rounded-full flex-shrink-0 {zoneDotClass(zone.name)}"></div>
				<span class="flex-1 text-sm font-medium {isActive ? 'text-gray-900' : 'text-gray-500'}">
					{zone.label}
				</span>
				<span class="text-xs text-gray-400 font-mono">{zone.description}</span>
				{#if isActive}
					<span class="text-xs font-semibold text-gray-700 bg-white px-2 py-0.5 rounded-full shadow-sm">
						Active
					</span>
				{/if}
			</div>
		{/each}
	</div>
</div>
