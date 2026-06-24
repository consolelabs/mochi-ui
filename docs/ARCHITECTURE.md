# mochi-ui architecture

TypeScript/JS app for Console Labs / Mochi. Package manager: pnpm. Scripts: build, dev, build:packages, typecheck, build:packages-dryrun, dev:mochi-web, build:mochi-web, analyze:mochi-web, dev:mochi-vault, build:mochi-vault, analyze:mochi-vault, build:icons, dev:icons, storybook, build:storybook, lint, lint:fix, test, test:cov, turbo:clean, clean:node-modules, clean:dist, clean:lock, clean:jest, clean, clean:install, release:notify, format, format:check, changeset, create:component, version-packages, release, postinstall.

## Notes for agents

- Build/run via the pnpm scripts above. Config + secrets via env, not source.
- Live product surface: prefer additive changes; verify with `pnpm test` / `pnpm build`.
