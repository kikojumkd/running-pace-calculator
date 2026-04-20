<script lang="ts">
	let { hours = $bindable(0), minutes = $bindable(50), seconds = $bindable(0) }: {
		hours: number;
		minutes: number;
		seconds: number;
	} = $props();
</script>

<div class="bg-white rounded-2xl border border-stone-200 p-5">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Time</p>

	<div class="flex gap-2">
		<div class="flex-1 flex flex-col gap-1.5">
			<label for="time-hours" class="text-sm text-stone-600">Hours</label>
			<input
				id="time-hours"
				type="number"
				min="0"
				max="99"
				bind:value={hours}
				class="w-full min-h-[44px] border border-stone-300 rounded-xl px-3.5 py-2.5 text-base text-center focus:outline-none focus:border-stone-500 transition-colors"
			/>
		</div>

		<span class="self-end text-stone-400 text-xl font-light mb-2.5">:</span>

		<div class="flex-1 flex flex-col gap-1.5">
			<label for="time-minutes" class="text-sm text-stone-600">Minutes</label>
			<input
				id="time-minutes"
				type="number"
				min="0"
				max="59"
				bind:value={minutes}
				class="w-full min-h-[44px] border border-stone-300 rounded-xl px-3.5 py-2.5 text-base text-center focus:outline-none focus:border-stone-500 transition-colors"
			/>
		</div>

		<span class="self-end text-stone-400 text-xl font-light mb-2.5">:</span>

		<div class="flex-1 flex flex-col gap-1.5">
			<label for="time-seconds" class="text-sm text-stone-600">Seconds</label>
			<input
				id="time-seconds"
				type="number"
				min="0"
				max="59"
				bind:value={seconds}
				class="w-full min-h-[44px] border border-stone-300 rounded-xl px-3.5 py-2.5 text-base text-center focus:outline-none focus:border-stone-500 transition-colors"
			/>
		</div>
	</div>
</div>
