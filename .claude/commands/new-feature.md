# new-feature

Scaffold a new feature for the running pace calculator.

## Arguments

$ARGUMENTS — the name and brief description of the feature to add

## Steps

1. Ask me to clarify the feature scope if $ARGUMENTS is vague
2. Create a new git branch named `feature/<kebab-case-feature-name>`
3. Scaffold any new Svelte components needed in `src/lib/components/`
4. Add any pure utility functions to `src/lib/utils/`
5. Add TypeScript interfaces to `src/lib/types/` if new data shapes are needed
6. Wire the feature into the relevant route
7. Run `pnpm typecheck` to confirm no type errors
8. Summarize what was created and what still needs attention

Always use Svelte 5 Runes ($state, $derived, $effect). Never use Svelte 4 reactive syntax.
Always use UnoCSS utility classes for styling. Never write inline styles.
