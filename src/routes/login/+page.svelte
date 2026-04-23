<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let email = $state('');
	let password = $state('');
	let name = $state('');
	let isSignUp = $state($page.url.searchParams.get('mode') === 'register');
	let error = $state('');
	let loading = $state(false);

	async function handleEmailAuth() {
		error = '';
		loading = true;

		if (isSignUp) {
			const result = await authClient.signUp.email({ email, password, name });
			if (result.error) {
				error = result.error.message ?? 'Sign up failed';
			} else {
				goto('/');
			}
		} else {
			const result = await authClient.signIn.email({ email, password });
			if (result.error) {
				error = result.error.message ?? 'Sign in failed';
			} else {
				goto('/');
			}
		}

		loading = false;
	}

	async function handleGoogleSignIn() {
		await authClient.signIn.social({ provider: 'google', callbackURL: '/' });
	}
</script>

<svelte:head>
	<title>{isSignUp ? 'Sign Up' : 'Sign In'} — Running Pace Calculator</title>
</svelte:head>

<main class="min-h-screen bg-[var(--bg)] px-4 py-8 flex items-center justify-center">
	<div class="w-full max-w-sm space-y-4">

		<h1 class="text-xl font-semibold text-center">
			{isSignUp ? 'Create account' : 'Sign in'}
		</h1>

		{#if error}
			<p class="text-sm text-red-600 text-center">{error}</p>
		{/if}

		<form onsubmit={handleEmailAuth} class="space-y-3">
			{#if isSignUp}
				<input
					type="text"
					bind:value={name}
					placeholder="Name"
					required
					class="w-full min-h-[44px] px-4 bg-[var(--card)] border-[0.5px] rounded-2xl text-sm"
				/>
			{/if}

			<input
				type="email"
				bind:value={email}
				placeholder="Email"
				required
				class="w-full min-h-[44px] px-4 bg-[var(--card)] border-[0.5px] rounded-2xl text-sm"
			/>

			<input
				type="password"
				bind:value={password}
				placeholder="Password"
				required
				minlength="8"
				class="w-full min-h-[44px] px-4 bg-[var(--card)] border-[0.5px] rounded-2xl text-sm"
			/>

			<button
				type="submit"
				disabled={loading}
				class="w-full min-h-[44px] bg-[var(--volt)] text-[var(--ink)] font-medium rounded-2xl text-sm cursor-pointer transition-colors hover:bg-[var(--volt-muted)] disabled:opacity-50"
			>
				{loading ? '...' : isSignUp ? 'Sign Up' : 'Sign In'}
			</button>
		</form>

		<div class="flex items-center gap-3 text-[var(--ink3)] text-xs">
			<div class="flex-1 h-px bg-[var(--border)]"></div>
			<span>or</span>
			<div class="flex-1 h-px bg-[var(--border)]"></div>
		</div>

		<button
			type="button"
			onclick={handleGoogleSignIn}
			class="w-full min-h-[44px] bg-[var(--card)] border-[0.5px] font-medium rounded-2xl text-sm cursor-pointer transition-colors hover:bg-black/5"
		>
			Continue with Google
		</button>

		<p class="text-sm text-center text-[var(--ink3)]">
			{isSignUp ? 'Already have an account?' : "Don't have an account?"}
			<button
				type="button"
				onclick={() => { isSignUp = !isSignUp; error = ''; }}
				class="text-[var(--ink)] font-medium cursor-pointer bg-transparent"
			>
				{isSignUp ? 'Sign in' : 'Sign up'}
			</button>
		</p>

	</div>
</main>
