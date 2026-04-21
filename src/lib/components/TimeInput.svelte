<script lang="ts">
	let { hours = $bindable(0), minutes = $bindable(50), seconds = $bindable(0) }: {
		hours: number;
		minutes: number;
		seconds: number;
	} = $props();
</script>

<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink3)] mb-3">Time</p>

	<div class="grid gap-x-2" style="grid-template-columns: 1fr 14px 1fr 14px 1fr">
		<label for="time-hours" class="text-sm text-[color:var(--ink2)] mb-1.5">Hours</label>
		<div></div>
		<label for="time-minutes" class="text-sm text-[color:var(--ink2)] mb-1.5">Minutes</label>
		<div></div>
		<label for="time-seconds" class="text-sm text-[color:var(--ink2)] mb-1.5">Seconds</label>

		<input
			id="time-hours"
			type="number"
			min="0"
			max="99"
			bind:value={hours}
			class="w-full min-w-0 bg-[var(--surface)] border-[0.5px] rounded-lg px-2 py-2 text-sm text-center text-[color:var(--ink)] focus:outline-none transition-colors"
		/>
		<div class="flex items-center justify-center text-[color:var(--ink3)] text-xl leading-none">:</div>
		<input
			id="time-minutes"
			type="number"
			min="0"
			max="59"
			bind:value={minutes}
			class="w-full min-w-0 bg-[var(--surface)] border-[0.5px] rounded-lg px-2 py-2 text-sm text-center text-[color:var(--ink)] focus:outline-none transition-colors"
		/>
		<div class="flex items-center justify-center text-[color:var(--ink3)] text-xl leading-none">:</div>
		<input
			id="time-seconds"
			type="number"
			min="0"
			max="59"
			bind:value={seconds}
			class="w-full min-w-0 bg-[var(--surface)] border-[0.5px] rounded-lg px-2 py-2 text-sm text-center text-[color:var(--ink)] focus:outline-none transition-colors"
		/>
	</div>
</div>
