<script lang="ts">
	import { formatPace, formatDuration } from '$lib/utils/pace';
	import type { DistanceUnit } from '$lib/types';

	let { pacePerKm, pacePerMile, totalSeconds, unit }: {
		pacePerKm: number;
		pacePerMile: number;
		totalSeconds: number;
		unit: DistanceUnit;
	} = $props();

	let primaryPace = $derived(unit === 'miles' ? pacePerMile : pacePerKm);
	let primaryLabel = $derived(unit === 'miles' ? 'min / mile' : 'min / km');
	let secondaryPace = $derived(unit === 'miles' ? pacePerKm : pacePerMile);
	let secondaryLabel = $derived(unit === 'miles' ? 'Per km' : 'Per mile');
	let secondaryUnit = $derived(unit === 'miles' ? 'min / km' : 'min / mile');
</script>

<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4 overflow-hidden">
	<p class="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink3)] mb-3">Your pace</p>

	<div class="bg-[var(--ink)] rounded-xl p-4 mb-3 flex items-baseline gap-3">
		<span
			class="tracking-tight tabular-nums leading-none text-[color:var(--volt)]"
			style="font-size: 52px; font-weight: 500"
		>
			{formatPace(primaryPace)}
		</span>
		<span class="text-sm text-[color:var(--ink3)]">{primaryLabel}</span>
	</div>

	<div class="grid grid-cols-2 gap-3">
		<div class="bg-[var(--card)] border-[0.5px] rounded-xl p-3">
			<p class="text-xs text-[color:var(--ink3)] mb-1">{secondaryLabel}</p>
			<p class="text-2xl font-bold tabular-nums text-[color:var(--ink)]">{formatPace(secondaryPace)}</p>
			<p class="text-xs text-[color:var(--ink3)] mt-0.5">{secondaryUnit}</p>
		</div>
		<div class="bg-[var(--card)] border-[0.5px] rounded-xl p-3">
			<p class="text-xs text-[color:var(--ink3)] mb-1">Finish time</p>
			<p class="text-2xl font-bold tabular-nums text-[color:var(--ink)]">{formatDuration(totalSeconds)}</p>
			<p class="text-xs text-[color:var(--ink3)] mt-0.5">total</p>
		</div>
	</div>
</div>
