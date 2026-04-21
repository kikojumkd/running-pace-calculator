<script lang="ts">
	import { formatPace, formatDuration } from '$lib/utils/pace';

	let { pacePerKm, pacePerMile, totalSeconds }: {
		pacePerKm: number;
		pacePerMile: number;
		totalSeconds: number;
	} = $props();
</script>

<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink3)] mb-3">Your pace</p>

	<!-- Primary pace: dark ink block, volt value -->
	<div class="bg-[var(--ink)] rounded-xl p-4 mb-3 flex items-baseline gap-3">
		<span
			class="tracking-tight tabular-nums leading-none text-[color:var(--volt)]"
			style="font-size: 52px; font-weight: 500"
		>
			{formatPace(pacePerKm)}
		</span>
		<span class="text-sm text-[color:var(--ink3)]">min / km</span>
	</div>

	<!-- Secondary metrics: card bg with 0.5px border -->
	<div class="grid grid-cols-2 gap-3">
		<div class="bg-[var(--card)] border-[0.5px] rounded-xl p-3">
			<p class="text-xs text-[color:var(--ink3)] mb-1">Per mile</p>
			<p class="text-2xl font-bold tabular-nums text-[color:var(--ink)]">{formatPace(pacePerMile)}</p>
			<p class="text-xs text-[color:var(--ink3)] mt-0.5">min / mile</p>
		</div>
		<div class="bg-[var(--card)] border-[0.5px] rounded-xl p-3">
			<p class="text-xs text-[color:var(--ink3)] mb-1">Finish time</p>
			<p class="text-2xl font-bold tabular-nums text-[color:var(--ink)]">{formatDuration(totalSeconds)}</p>
			<p class="text-xs text-[color:var(--ink3)] mt-0.5">total</p>
		</div>
	</div>
</div>
