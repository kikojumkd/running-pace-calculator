<script lang="ts">
	import DistanceInput from '$lib/components/DistanceInput.svelte';
	import TimeInput from '$lib/components/TimeInput.svelte';
	import PaceDisplay from '$lib/components/PaceDisplay.svelte';
	import PaceZones from '$lib/components/PaceZones.svelte';
	import { calculatePace, milesToKm } from '$lib/utils/pace';
	import type { DistanceUnit } from '$lib/types';

	let distance = $state(10);
	let unit = $state<DistanceUnit>('km');
	let hours = $state(0);
	let minutes = $state(50);
	let seconds = $state(0);

	let distanceKm = $derived(unit === 'km' ? distance : milesToKm(distance));
	let totalSeconds = $derived(hours * 3600 + minutes * 60 + seconds);
	let pace = $derived(calculatePace(distanceKm, totalSeconds));

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

<main class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8 md:py-12">
	<div class="max-w-lg mx-auto space-y-6">

		<header class="text-center space-y-1">
			<h1 class="text-3xl font-bold text-gray-900 tracking-tight">Running Pace</h1>
			<p class="text-gray-500 text-sm">Enter distance and time to calculate your pace</p>
		</header>

		<div class="bg-white rounded-3xl shadow-lg overflow-hidden">
			<div class="p-6 space-y-6">

				<DistanceInput bind:distance bind:unit />

				<div class="border-t border-gray-100"></div>

				<TimeInput bind:hours bind:minutes bind:seconds />

				<div class="border-t border-gray-100"></div>

				<PaceDisplay
					pacePerKm={pace.pacePerKm}
					pacePerMile={pace.pacePerMile}
					totalSeconds={pace.totalSeconds}
				/>

				<div class="border-t border-gray-100"></div>

				<PaceZones pacePerKm={pace.pacePerKm} />

			</div>

			<div class="px-6 pb-6">
				<button
					type="button"
					onclick={reset}
					class="w-full min-h-[44px] border-0 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-600 font-semibold rounded-2xl transition-colors text-sm cursor-pointer"
				>
					Reset
				</button>
			</div>
		</div>

	</div>
</main>
