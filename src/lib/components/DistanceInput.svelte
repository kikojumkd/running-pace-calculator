<script lang="ts">
	import type { DistanceUnit } from '$lib/types';

	let { distance = $bindable(10), unit = $bindable<DistanceUnit>('km') }: {
		distance: number;
		unit: DistanceUnit;
	} = $props();
</script>

<div class="space-y-2">
	<label for="distance" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest">Distance</label>
	<div class="flex gap-2">
		<input
			id="distance"
			type="number"
			min="0"
			step="0.1"
			bind:value={distance}
			class="flex-1 min-h-[44px] px-4 py-2 text-xl font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
		/>
		<div class="flex rounded-xl overflow-hidden border-2 border-gray-200 bg-white">
			<button
				type="button"
				onclick={() => (unit = 'km')}
				class="px-5 min-h-[44px] border-0 font-semibold text-sm transition-colors cursor-pointer {unit === 'km'
					? 'bg-blue-500 text-white'
					: 'text-gray-500 hover:bg-gray-50'}"
			>km</button>
			<button
				type="button"
				onclick={() => (unit = 'miles')}
				class="px-5 min-h-[44px] border-0 font-semibold text-sm transition-colors cursor-pointer {unit === 'miles'
					? 'bg-blue-500 text-white'
					: 'text-gray-500 hover:bg-gray-50'}"
			>mi</button>
		</div>
	</div>
</div>
