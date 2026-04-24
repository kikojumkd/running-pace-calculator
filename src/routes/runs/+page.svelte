<script lang="ts">
	import { formatPace, formatDuration, kmToMiles } from '$lib/utils/pace';
	import type { Run, DistanceUnit } from '$lib/types';

	let { data } = $props();

	let runs = $state<Run[]>([]);
	let loading = $state(true);
	let unit = $state<DistanceUnit>(data.unitPreference);

	async function loadRuns() {
		loading = true;
		const res = await fetch('/api/runs');
		runs = await res.json();
		loading = false;
	}

	$effect(() => {
		loadRuns();
	});

	function formatDistance(km: string, u: DistanceUnit): string {
		const val = u === 'miles' ? kmToMiles(Number(km)) : Number(km);
		return val.toFixed(1);
	}

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-GB', {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>My Runs — Pacen</title>
</svelte:head>

<main class="min-h-screen bg-[var(--bg)] px-4 py-8">
	<div class="max-w-md mx-auto space-y-3">

		<div class="flex items-center justify-between mb-2">
			<h1 class="text-xl font-semibold">My Runs</h1>
			<a
				href="/"
				class="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"
			>
				Back
			</a>
		</div>

		<div class="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[var(--surface)]">
			<button
				type="button"
				onclick={() => (unit = 'km')}
				class="py-2 text-sm rounded-lg cursor-pointer transition-colors {unit === 'km'
					? 'bg-[var(--volt)] text-[color:var(--ink)] font-semibold'
					: 'bg-transparent text-[color:var(--ink2)]'}"
			>km</button>
			<button
				type="button"
				onclick={() => (unit = 'miles')}
				class="py-2 text-sm rounded-lg cursor-pointer transition-colors {unit === 'miles'
					? 'bg-[var(--volt)] text-[color:var(--ink)] font-semibold'
					: 'bg-transparent text-[color:var(--ink2)]'}"
			>miles</button>
		</div>

		{#if loading}
			<p class="text-sm text-[var(--ink3)] text-center py-8">Loading...</p>
		{:else if runs.length === 0}
			<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-6 text-center">
				<p class="text-sm text-[var(--ink3)]">No runs saved yet.</p>
				<a
					href="/"
					class="inline-block mt-3 text-sm text-[var(--ink)] font-medium hover:underline"
				>
					Calculate your first run
				</a>
			</div>
		{:else}
			{#each runs as run (run.id)}
				<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4">
					<div class="flex items-start justify-between mb-2">
						<div>
							{#if run.label}
								<p class="text-sm font-semibold text-[var(--ink)]">{run.label}</p>
							{/if}
							<p class="text-xs text-[var(--ink3)]">{formatDate(run.createdAt)}</p>
						</div>
						<span
							class="text-lg font-bold tabular-nums text-[color:var(--volt)]"
							style="text-shadow: 0 0 0 transparent"
						>
							{formatPace(unit === 'miles' ? run.pacePerMile : run.pacePerKm)}
							<span class="text-xs font-normal text-[var(--ink3)]">/{unit === 'miles' ? 'mi' : 'km'}</span>
						</span>
					</div>
					<div class="grid grid-cols-3 gap-2 text-center">
						<div>
							<p class="text-xs text-[var(--ink3)]">Distance</p>
							<p class="text-sm font-semibold tabular-nums">{formatDistance(run.distanceKm, unit)} {unit === 'miles' ? 'mi' : 'km'}</p>
						</div>
						<div>
							<p class="text-xs text-[var(--ink3)]">Time</p>
							<p class="text-sm font-semibold tabular-nums">{formatDuration(run.durationSeconds)}</p>
						</div>
						<div>
							<p class="text-xs text-[var(--ink3)]">{unit === 'miles' ? 'Per km' : 'Per mile'}</p>
							<p class="text-sm font-semibold tabular-nums">{formatPace(unit === 'miles' ? run.pacePerKm : run.pacePerMile)}</p>
						</div>
					</div>
				</div>
			{/each}
		{/if}

	</div>
</main>
