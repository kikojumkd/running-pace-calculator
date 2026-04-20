<script lang="ts">
	import type { DistanceUnit } from '$lib/types';

	let { distance = $bindable(10), unit = $bindable<DistanceUnit>('km') }: {
		distance: number;
		unit: DistanceUnit;
	} = $props();
</script>

<div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Distance</p>

	<!-- Unit toggle -->
	<div class="grid grid-cols-2 rounded-xl border border-stone-300 overflow-hidden mb-4">
		<button
			type="button"
			onclick={() => (unit = 'km')}
			class="py-2 text-sm font-medium border-0 cursor-pointer transition-colors {unit === 'km'
				? 'bg-stone-100 text-stone-800 font-semibold'
				: 'bg-white text-stone-500 hover:bg-stone-50'}"
		>km</button>
		<button
			type="button"
			onclick={() => (unit = 'miles')}
			class="py-2 text-sm font-medium border-0 border-l border-stone-300 cursor-pointer transition-colors {unit === 'miles'
				? 'bg-stone-100 text-stone-800 font-semibold'
				: 'bg-white text-stone-500 hover:bg-stone-50'}"
		>miles</button>
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
