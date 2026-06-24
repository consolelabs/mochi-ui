# CLAUDE.md

Guidance for AI agents (and humans) working in `mochi-ui`.

## What this is

`mochi-ui` is a TypeScript/JS app in the Console Labs / Mochi product line. Package manager: pnpm (pnpm@8.6.10).

## Commands

- Install: `pnpm install --frozen-lockfile`
- build: `pnpm build`
- dev: `pnpm dev`
- lint: `pnpm lint`
- test: `pnpm test`

## Conventions

- Secrets come from env (`env` module / `process.env`), NEVER hardcoded. Discord client/user/role IDs in source are public snowflakes, not secrets.
- Follow the existing lint/format config; feature branches off the default branch.

## Security / quality (consolidation hardening pass, 2026-06-25, lighter adoption)

- gitleaks: no leaks found.
- CI (`.github/workflows/security.yml`) runs gitleaks (with `.gitleaks.toml` allowlist) + `pnpm audit --audit-level=high` on PRs.
- Dependency audit: `pnpm audit --audit-level=high`; Dependabot enabled. Bump deliberately.
