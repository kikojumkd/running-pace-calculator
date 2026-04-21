# MCP Servers Setup Guide

Instructions for setting up MCP servers in Claude Code for this project.
Run all commands from your project root.

---

## 1. GitHub MCP (highest priority)

Lets Claude Code create branches, commit, push, open PRs, and manage issues
without you touching the terminal.

### Install

```bash
claude mcp add github -- npx -y @modelcontextprotocol/server-github
```

### Authenticate

You need a GitHub Personal Access Token (classic).

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "claude-code-pace-calculator"
4. Select scopes: `repo` (full), `workflow`
5. Generate and copy the token

Then set it as an environment variable in your shell profile (~/.zshrc or ~/.bashrc):

```bash
export GITHUB_PERSONAL_ACCESS_TOKEN=ghp_your_token_here
```

Reload your shell: `source ~/.zshrc`

### What you can now say to Claude Code

- "Commit everything with a meaningful message and push"
- "Create a feature branch for the split calculator"
- "Open a PR from this branch to main"
- "Show me recent commits"

---

## 2. Playwright MCP (for UI testing)

Lets Claude Code open a real browser, interact with your running app,
and catch visual or functional bugs automatically.

### Install

```bash
claude mcp add playwright -- npx -y @playwright/mcp@latest
```

### Usage

Make sure your dev server is running first (`pnpm dev`), then ask Claude Code:

- "Open the app in the browser and test the km/miles toggle"
- "Check if the pace zones update correctly when I change the distance"
- "Take a screenshot of the calculator on mobile viewport"
- "Test the full input flow: set 10km, 55 minutes, verify the pace output"

---

## 3. Vercel MCP (optional but nice)

Lets Claude Code check deployment status and manage environment variables.

### Install

```bash
claude mcp add vercel -- npx -y @vercel/mcp-adapter
```

### Authenticate

```bash
vercel login
```

### What you can now say to Claude Code

- "Check the latest deployment status"
- "What was the build output for the last deploy?"

---

## Verify Everything Is Connected

```bash
claude mcp list
```

You should see github, playwright, and vercel listed as active servers.

---

## Quick Reference — MCP Commands in Claude Code Session

| What you want | What to say |
|---|---|
| Commit and push | "Commit all changes with a good message and push to main" |
| New branch | "Create a branch called feature/split-calculator" |
| Open PR | "Open a pull request from this branch to main" |
| Test UI | "Open the browser and test the pace calculator flow" |
| Screenshot | "Take a screenshot of the app on a 390px mobile viewport" |
| Deployment | "Check if the latest Vercel deployment succeeded" |
