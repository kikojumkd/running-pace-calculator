<script lang="ts">
	import type { DistanceUnit } from '$lib/types';
	import { kmToMiles, milesToKm } from '$lib/utils/pace';

	let { distance = $bindable(10), unit = $bindable<DistanceUnit>('km') }: {
		distance: number;
		unit: DistanceUnit;
	} = $props();

	function roundDistance(value: number): number {
		const rounded = Math.round(value);
		return Math.abs(value - rounded) < 0.05 ? rounded : Number(value.toFixed(1));
	}

	function setUnit(newUnit: DistanceUnit) {
		if (newUnit === unit) return;
		distance = newUnit === 'miles'
			? roundDistance(kmToMiles(distance))
			: roundDistance(milesToKm(distance));
		unit = newUnit;
	}

	const PRESETS: { label: string; km: number }[] = [
		{ label: '5K', km: 5 },
		{ label: '10K', km: 10 },
		{ label: 'Half', km: 21.0975 },
		{ label: 'Marathon', km: 42.195 }
	];

	function selectPreset(km: number) {
		distance = unit === 'km' ? roundDistance(km) : roundDistance(kmToMiles(km));
	}

	function isPresetActive(km: number): boolean {
		const presetInUnit = unit === 'km' ? km : kmToMiles(km);
		return Math.abs(distance - presetInUnit) < 0.05;
	}
</script>

<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink3)] mb-3">Distance</p>

	<!-- Unit toggle: segmented control on a --surface track -->
	<div class="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[var(--surface)] mb-4">
		<button
			type="button"
			onclick={() => setUnit('km')}
			class="py-2 text-sm rounded-lg cursor-pointer transition-colors {unit === 'km'
				? 'bg-[var(--volt)] text-[color:var(--ink)] font-semibold'
				: 'bg-transparent text-[color:var(--ink2)]'}"
		>km</button>
		<button
			type="button"
			onclick={() => setUnit('miles')}
			class="py-2 text-sm rounded-lg cursor-pointer transition-colors {unit === 'miles'
				? 'bg-[var(--volt)] text-[color:var(--ink)] font-semibold'
				: 'bg-transparent text-[color:var(--ink2)]'}"
		>miles</button>
	</div>

	<!-- Preset distances (ink scale only; no volt) -->
	<div class="grid grid-cols-4 gap-2 mb-4">
		{#each PRESETS as preset}
			<button
				type="button"
				onclick={() => selectPreset(preset.km)}
				class="py-1.5 text-xs font-medium rounded-lg border-[0.5px] cursor-pointer transition-colors {isPresetActive(preset.km)
					? 'bg-[var(--surface)] text-[color:var(--ink)] font-semibold'
					: 'bg-transparent text-[color:var(--ink2)] hover:bg-black/5'}"
			>{preset.label}</button>
		{/each}
	</div>

	<label for="distance" class="block text-sm text-[color:var(--ink2)] mb-1.5">Distance</label>
	<input
		id="distance"
		type="number"
		min="0"
		step="0.1"
		bind:value={distance}
		class="block w-full min-w-0 bg-[var(--surface)] border-[0.5px] rounded-lg px-3 py-2 text-sm text-[color:var(--ink)] focus:outline-none transition-colors"
	/>
</div>
