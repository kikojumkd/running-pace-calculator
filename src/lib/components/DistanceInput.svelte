<script lang="ts">
	import type { DistanceUnit } from '$lib/types';
	import { kmToMiles } from '$lib/utils/pace';

	let { distance = $bindable(10), unit = $bindable<DistanceUnit>('km') }: {
		distance: number;
		unit: DistanceUnit;
	} = $props();

	const PRESETS: { label: string; km: number }[] = [
		{ label: '5K', km: 5 },
		{ label: '10K', km: 10 },
		{ label: 'Half', km: 21.0975 },
		{ label: 'Marathon', km: 42.195 }
	];

	function selectPreset(km: number) {
		distance = unit === 'km' ? km : Number(kmToMiles(km).toFixed(2));
	}

	function isPresetActive(km: number): boolean {
		const presetInUnit = unit === 'km' ? km : kmToMiles(km);
		return Math.abs(distance - presetInUnit) < 0.05;
	}
</script>

<div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Distance</p>

	<!-- Unit toggle: two separate pill buttons -->
	<div class="grid grid-cols-2 gap-3 mb-4">
		<button
			type="button"
			onclick={() => (unit = 'km')}
			class="py-2.5 text-sm rounded-xl border border-stone-200 cursor-pointer transition-colors {unit === 'km'
				? 'bg-white text-stone-800 font-semibold'
				: 'bg-stone-100 text-stone-600 hover:bg-stone-50'}"
		>km</button>
		<button
			type="button"
			onclick={() => (unit = 'miles')}
			class="py-2.5 text-sm rounded-xl border border-stone-200 cursor-pointer transition-colors {unit === 'miles'
				? 'bg-white text-stone-800 font-semibold'
				: 'bg-stone-100 text-stone-600 hover:bg-stone-50'}"
		>miles</button>
	</div>

	<!-- Preset distances -->
	<div class="grid grid-cols-4 gap-2 mb-4">
		{#each PRESETS as preset}
			<button
				type="button"
				onclick={() => selectPreset(preset.km)}
				class="py-1.5 text-xs font-medium rounded-lg border cursor-pointer transition-colors {isPresetActive(preset.km)
					? 'bg-stone-100 border-stone-400 text-stone-800 font-semibold'
					: 'bg-white border-stone-300 text-stone-500 hover:bg-stone-50'}"
			>{preset.label}</button>
		{/each}
	</div>

	<label for="distance" class="block text-sm text-stone-600 mb-1.5">Distance</label>
	<input
		id="distance"
		type="number"
		min="0"
		step="0.1"
		bind:value={distance}
		class="block w-full min-w-0 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-stone-500 transition-colors"
	/>
</div>
