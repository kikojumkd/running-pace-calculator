# deploy

Run full pre-deploy checks and push to main.

## Steps

1. Run `pnpm typecheck` and report any TypeScript errors
2. Run `pnpm build` to verify the production build succeeds
3. If both pass, stage all changes with `git add -A`
4. Commit using conventional commit format based on what changed
5. Push to origin main
6. Confirm the push succeeded and remind me to check the Vercel dashboard for deployment status

If typecheck or build fails, stop and report the errors. Do not commit broken code.
