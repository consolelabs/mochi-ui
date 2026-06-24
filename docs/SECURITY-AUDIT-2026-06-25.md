# Security audit: mochi-ui (2026-06-25)

Bounded security triage , Console Labs consolidation hardening pass (lighter adoption).

## Secret scan

gitleaks: no leaks found.

## Dependency audit

`pnpm audit --audit-level=high` added to CI; Dependabot enabled. Findings surfaced non-blocking until triaged; remediation is deliberate.

## What this PR changes

CLAUDE.md + docs/ARCHITECTURE.md + .gitleaks.toml + .github/workflows/security.yml. No source/logic change, no dependency bump.
