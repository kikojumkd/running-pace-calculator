<script lang="ts">
	import 'virtual:uno.css';
	import '../app.css';
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';

	let { children, data } = $props();

	async function signOut() {
		await authClient.signOut();
		await invalidateAll();
	}
</script>

{#if $page.url.pathname !== '/login' && $page.url.pathname !== '/settings'}
	<header class="flex items-center justify-between px-4 py-3 max-w-md mx-auto">
		{#if data.user}
			<span class="text-sm text-[var(--ink3)]">{data.user.name}</span>
			<div class="flex items-center gap-3">
				<a
					href="/settings"
					class="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"
				>
					Settings
				</a>
				<button
					type="button"
					onclick={signOut}
					class="text-sm text-[var(--ink3)] cursor-pointer bg-transparent hover:text-[var(--ink)]"
				>
					Sign out
				</button>
			</div>
		{:else}
			<span class="text-sm text-[var(--ink3)]">Running Pace Calculator</span>
			<div class="flex items-center gap-3">
				<a
					href="/login"
					class="text-sm text-[var(--ink3)] hover:text-[var(--ink)] transition-colors"
				>
					Sign in
				</a>
				<a
					href="/login?mode=register"
					class="text-sm min-h-[36px] px-4 flex items-center bg-[var(--volt)] text-[var(--ink)] font-medium rounded-full transition-colors hover:bg-[var(--volt-muted)]"
				>
					Register
				</a>
			</div>
		{/if}
	</header>
{/if}

{@render children()}
