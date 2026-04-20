<script lang="ts">
	import { formatPace, formatDuration } from '$lib/utils/pace';

	let { pacePerKm, pacePerMile, totalSeconds }: {
		pacePerKm: number;
		pacePerMile: number;
		totalSeconds: number;
	} = $props();
</script>

<div class="space-y-3">
	<h2 class="text-xs font-semibold text-gray-500 uppercase tracking-widest">Your Pace</h2>
	<div class="grid grid-cols-2 gap-3">
		<div class="bg-blue-50 rounded-2xl p-4 text-center">
			<div class="text-4xl font-bold text-blue-700 tabular-nums leading-none">
				{formatPace(pacePerKm)}
			</div>
			<div class="text-sm text-blue-400 mt-2 font-medium">min / km</div>
		</div>
		<div class="bg-indigo-50 rounded-2xl p-4 text-center">
			<div class="text-4xl font-bold text-indigo-700 tabular-nums leading-none">
				{formatPace(pacePerMile)}
			</div>
			<div class="text-sm text-indigo-400 mt-2 font-medium">min / mile</div>
		</div>
	</div>
	<div class="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between">
		<span class="text-sm text-gray-500 font-medium">Total time</span>
		<span class="font-mono text-gray-800 font-semibold tabular-nums">{formatDuration(totalSeconds)}</span>
	</div>
</div>
