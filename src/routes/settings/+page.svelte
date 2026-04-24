<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import type { DistanceUnit } from '$lib/types';

	let { data } = $props();

	let unitPreference = $state<DistanceUnit>(data.unitPreference);
	let unitSaving = $state(false);
	let unitSaved = $state(false);

	let currentPassword = $state('');
	let newPassword = $state('');
	let confirmPassword = $state('');
	let passwordLoading = $state(false);
	let passwordError = $state('');
	let passwordSuccess = $state(false);

	async function saveUnitPreference(unit: DistanceUnit) {
		unitPreference = unit;
		unitSaving = true;
		unitSaved = false;

		await fetch('/api/settings', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ unitPreference: unit })
		});

		await invalidateAll();
		unitSaving = false;
		unitSaved = true;
		setTimeout(() => (unitSaved = false), 2000);
	}

	async function changePassword() {
		passwordError = '';
		passwordSuccess = false;

		if (newPassword !== confirmPassword) {
			passwordError = 'Passwords do not match';
			return;
		}

		if (newPassword.length < 8) {
			passwordError = 'Password must be at least 8 characters';
			return;
		}

		passwordLoading = true;

		const result = await authClient.changePassword({
			currentPassword,
			newPassword,
			revokeOtherSessions: false
		});

		if (result.error) {
			passwordError = result.error.message ?? 'Failed to change password';
		} else {
			passwordSuccess = true;
			currentPassword = '';
			newPassword = '';
			confirmPassword = '';
		}

		passwordLoading = false;
	}
</script>

<svelte:head>
	<title>Settings — Pacen</title>
</svelte:head>

<main class="min-h-screen bg-[var(--bg)] px-4 py-8">
	<div class="max-w-md mx-auto space-y-4">

		<div class="flex items-center justify-between mb-2">
			<h1 class="text-xl font-semibold">Settings</h1>
			<a
				href="/"
				class="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"
			>
				Back
			</a>
		</div>

		<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4">
			<p class="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink3)] mb-3">
				Unit preference
			</p>

			<div class="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[var(--surface)]">
				<button
					type="button"
					onclick={() => saveUnitPreference('km')}
					disabled={unitSaving}
					class="py-2 text-sm rounded-lg cursor-pointer transition-colors {unitPreference === 'km'
						? 'bg-[var(--volt)] text-[color:var(--ink)] font-semibold'
						: 'bg-transparent text-[color:var(--ink2)]'}"
				>km</button>
				<button
					type="button"
					onclick={() => saveUnitPreference('miles')}
					disabled={unitSaving}
					class="py-2 text-sm rounded-lg cursor-pointer transition-colors {unitPreference === 'miles'
						? 'bg-[var(--volt)] text-[color:var(--ink)] font-semibold'
						: 'bg-transparent text-[color:var(--ink2)]'}"
				>miles</button>
			</div>

			{#if unitSaved}
				<p class="text-xs text-[var(--ink3)] mt-2 text-center">Saved</p>
			{/if}
		</div>

		<div class="bg-[var(--card)] border-[0.5px] rounded-2xl p-4">
			<p class="text-[10px] font-semibold uppercase tracking-widest text-[color:var(--ink3)] mb-3">
				Change password
			</p>

			{#if passwordError}
				<p class="text-sm text-red-600 mb-3">{passwordError}</p>
			{/if}

			{#if passwordSuccess}
				<p class="text-sm text-green-700 mb-3">Password changed successfully</p>
			{/if}

			<form onsubmit={changePassword} class="space-y-3">
				<input
					type="password"
					bind:value={currentPassword}
					placeholder="Current password"
					required
					class="w-full min-h-[44px] px-4 bg-[var(--surface)] border-[0.5px] rounded-xl text-sm"
				/>

				<input
					type="password"
					bind:value={newPassword}
					placeholder="New password"
					required
					minlength="8"
					class="w-full min-h-[44px] px-4 bg-[var(--surface)] border-[0.5px] rounded-xl text-sm"
				/>

				<input
					type="password"
					bind:value={confirmPassword}
					placeholder="Confirm new password"
					required
					minlength="8"
					class="w-full min-h-[44px] px-4 bg-[var(--surface)] border-[0.5px] rounded-xl text-sm"
				/>

				<button
					type="submit"
					disabled={passwordLoading}
					class="w-full min-h-[44px] bg-[var(--volt)] text-[var(--ink)] font-medium rounded-xl text-sm cursor-pointer transition-colors hover:bg-[var(--volt-muted)] disabled:opacity-50"
				>
					{passwordLoading ? '...' : 'Change password'}
				</button>
			</form>
		</div>

	</div>
</main>
