<script lang="ts">
	let { hours = $bindable(0), minutes = $bindable(50), seconds = $bindable(0) }: {
		hours: number;
		minutes: number;
		seconds: number;
	} = $props();
</script>

<div class="space-y-2">
	<label for="time-minutes" class="block text-xs font-semibold text-gray-500 uppercase tracking-widest">Time</label>
	<div class="flex gap-2 items-start">
		<div class="flex-1 flex flex-col items-center gap-1">
			<input
				aria-label="Hours"
				type="number"
				min="0"
				max="99"
				bind:value={hours}
				class="w-full min-h-[44px] px-2 py-2 text-xl font-semibold text-center border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
			/>
			<span class="text-xs text-gray-400">hrs</span>
		</div>
		<span class="text-2xl font-bold text-gray-300 mt-2">:</span>
		<div class="flex-1 flex flex-col items-center gap-1">
			<input
				id="time-minutes"
				aria-label="Minutes"
				type="number"
				min="0"
				max="59"
				bind:value={minutes}
				class="w-full min-h-[44px] px-2 py-2 text-xl font-semibold text-center border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
			/>
			<span class="text-xs text-gray-400">min</span>
		</div>
		<span class="text-2xl font-bold text-gray-300 mt-2">:</span>
		<div class="flex-1 flex flex-col items-center gap-1">
			<input
				aria-label="Seconds"
				type="number"
				min="0"
				max="59"
				bind:value={seconds}
				class="w-full min-h-[44px] px-2 py-2 text-xl font-semibold text-center border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-white"
			/>
			<span class="text-xs text-gray-400">sec</span>
		</div>
	</div>
</div>
