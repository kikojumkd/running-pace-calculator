<script lang="ts">
	let { hours = $bindable(0), minutes = $bindable(50), seconds = $bindable(0) }: {
		hours: number;
		minutes: number;
		seconds: number;
	} = $props();
</script>

<div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Time</p>

	<!-- Grid: labels in row 1, inputs + colons in row 2 -->
	<div class="grid gap-x-2" style="grid-template-columns: 1fr 14px 1fr 14px 1fr">
		<label for="time-hours" class="text-sm text-stone-600 mb-1.5">Hours</label>
		<div></div>
		<label for="time-minutes" class="text-sm text-stone-600 mb-1.5">Minutes</label>
		<div></div>
		<label for="time-seconds" class="text-sm text-stone-600 mb-1.5">Seconds</label>

		<input
			id="time-hours"
			type="number"
			min="0"
			max="99"
			bind:value={hours}
			class="w-full min-w-0 border border-stone-300 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:border-stone-500 transition-colors"
		/>
		<div class="flex items-center justify-center text-stone-500 text-xl leading-none">:</div>
		<input
			id="time-minutes"
			type="number"
			min="0"
			max="59"
			bind:value={minutes}
			class="w-full min-w-0 border border-stone-300 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:border-stone-500 transition-colors"
		/>
		<div class="flex items-center justify-center text-stone-500 text-xl leading-none">:</div>
		<input
			id="time-seconds"
			type="number"
			min="0"
			max="59"
			bind:value={seconds}
			class="w-full min-w-0 border border-stone-300 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:border-stone-500 transition-colors"
		/>
	</div>
</div>
