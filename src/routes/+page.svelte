<script lang="ts">
	import DistanceInput from '$lib/components/DistanceInput.svelte';
	import TimeInput from '$lib/components/TimeInput.svelte';
	import PaceDisplay from '$lib/components/PaceDisplay.svelte';
	import PaceZones from '$lib/components/PaceZones.svelte';
	import { calculatePace, milesToKm } from '$lib/utils/pace';
	import type { DistanceUnit } from '$lib/types';

	let { data } = $props();

	let distance = $state(10);
	let unit = $state<DistanceUnit>(data.unitPreference);
	let hours = $state(0);
	let minutes = $state(50);
	let seconds = $state(0);

	let distanceKm = $derived(unit === 'km' ? distance : milesToKm(distance));
	let totalSeconds = $derived(hours * 3600 + minutes * 60 + seconds);
	let pace = $derived(calculatePace(distanceKm, totalSeconds));

	let saving = $state(false);
	let saved = $state(false);

	async function saveRun() {
		if (pace.pacePerKm <= 0) return;
		saving = true;
		saved = false;

		await fetch('/api/runs', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				distanceKm,
				durationSeconds: totalSeconds,
				pacePerKm: pace.pacePerKm,
				pacePerMile: pace.pacePerMile
			})
		});

		saving = false;
		saved = true;
		setTimeout(() => (saved = false), 2000);
	}

	function reset() {
		distance = 10;
		unit = 'km';
		hours = 0;
		minutes = 50;
		seconds = 0;
	}
</script>

<svelte:head>
	<title>Running Pace Calculator</title>
</svelte:head>

<main class="min-h-screen bg-[var(--bg)] px-4 py-8 overflow-x-hidden">
	<div class="max-w-md mx-auto space-y-3">

		<DistanceInput bind:distance bind:unit />

		<TimeInput bind:hours bind:minutes bind:seconds />

		<PaceDisplay
			pacePerKm={pace.pacePerKm}
			pacePerMile={pace.pacePerMile}
			totalSeconds={pace.totalSeconds}
			{unit}
		/>

		<PaceZones pacePerKm={pace.pacePerKm} />

		{#if data.user}
			<button
				type="button"
				onclick={saveRun}
				disabled={saving || pace.pacePerKm <= 0}
				class="w-full min-h-[44px] bg-[var(--volt)] text-[var(--ink)] font-medium rounded-2xl text-sm cursor-pointer overflow-hidden transition-colors hover:bg-[var(--volt-muted)] disabled:opacity-50"
			>
				{#if saved}
					Saved!
				{:else if saving}
					Saving...
				{:else}
					Save run
				{/if}
			</button>
		{/if}

		<button
			type="button"
			onclick={reset}
			class="w-full min-h-[44px] bg-transparent border-[0.5px] text-[color:var(--ink3)] font-medium rounded-2xl text-sm cursor-pointer overflow-hidden transition-colors hover:bg-black/5"
		>
			Reset
		</button>

	</div>
</main>
