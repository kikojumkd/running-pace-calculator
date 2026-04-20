<script lang="ts">
	import { formatPace, formatDuration } from '$lib/utils/pace';

	let { pacePerKm, pacePerMile, totalSeconds }: {
		pacePerKm: number;
		pacePerMile: number;
		totalSeconds: number;
	} = $props();
</script>

<div class="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-stone-400 mb-3">Your pace</p>

	<!-- Primary pace -->
	<div class="bg-stone-50 rounded-xl p-4 mb-3 flex items-baseline gap-3">
		<span class="text-6xl font-bold tracking-tight tabular-nums leading-none">
			{formatPace(pacePerKm)}
		</span>
		<span class="text-sm text-stone-400">min / km</span>
	</div>

	<!-- Secondary stats -->
	<div class="grid grid-cols-2 gap-3">
		<div class="bg-stone-50 rounded-xl p-3">
			<p class="text-xs text-stone-400 mb-1">Per mile</p>
			<p class="text-2xl font-bold tabular-nums">{formatPace(pacePerMile)}</p>
			<p class="text-xs text-stone-400 mt-0.5">min / mile</p>
		</div>
		<div class="bg-stone-50 rounded-xl p-3">
			<p class="text-xs text-stone-400 mb-1">Finish time</p>
			<p class="text-2xl font-bold tabular-nums">{formatDuration(totalSeconds)}</p>
			<p class="text-xs text-stone-400 mt-0.5">total</p>
		</div>
	</div>
</div>
