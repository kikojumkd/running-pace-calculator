# audit

Run a full quality audit on the current state of the project.

## Steps

1. Run `pnpm typecheck` and report TypeScript errors
2. Run `pnpm build` and check for build warnings
3. Check all interactive elements have minimum 44px touch targets (mobile)
4. Check all inputs have associated labels for accessibility
5. Check color contrast on pace zone indicators
6. Verify the km/miles toggle works correctly end to end
7. Verify the reset button clears all state properly
8. Check that all $derived values update correctly when inputs change
9. Look for any hardcoded magic numbers that should be constants
10. Report a summary with: what passed, what needs fixing, and suggested priority order
