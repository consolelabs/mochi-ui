> **Status (2026-09-04):** frozen. MochiUI has had no development since 2024; https://mochiui.com still serves the docs. Its one remaining consumer is the sticker site in `consolelabs/console-apps`. Kept public for that and for reference; no releases planned.

<p align="center">
  <a href="https://github.com/consolelabs/mochi-ui">
    <img src="https://github.com/consolelabs/mochi-ui/assets/12707960/94788d57-5c95-428e-a374-8ec1a460851b" alt="Mochi logo" width="100" />
  </a>
</p>

<h1 align="center">MochiUI</h1>
<br />

> **Please note**: MochiUI is still an active work in progress, do not expect it
> to be complete.

Mochi UI is a beautifully designed and accessible React UI library, specifically
tailored for building innovative web3 applications. This comprehensive
collection of reusable and composable React components is crafted to accelerate
the development of cutting-edge web interfaces.

## Documentation

- For contribution details, see our
  [Contribution Guidelines](./CONTRIBUTING.md).
- Explore our [UI Documentation](https://ds.mochiui.com/) for design system
  insights.

## Community

Your participation in our frontend ecosystem is highly valued. Whether it's
sharing ideas, reporting bugs, or showcasing your projects, your engagement
helps us grow and improve.

- Share your thoughts and issues on
  [Github](https://github.com/consolelabs/mochi-ui/issues/new/choose).
- Join our conversation on [Discord](https://discord.com/invite/HNdcU8Kvfh).

## Contribution

We warmly welcome your contributions!

Please refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to
start contributing.

Adherence to our [Code of Conduct](./CODE_OF_CONDUCT.md) is expected and
appreciated.

## License

This project is licensed under the
[MIT License](https://choosealicense.com/licenses/mit/).


<!-- consolidation-hardening: dev-docs -->
## Development & docs

This repo was reindexed in the Console Labs org-consolidation hardening pass (2026-06).

- `CLAUDE.md` , guidance for AI agents + humans (stack, conventions, commands).
- `docs/ARCHITECTURE.md` , what's here and how it fits together.
- `docs/SECURITY-AUDIT-2026-06-25.md` , secret-scan + dependency baseline.
- CI: `.github/workflows/security.yml` runs gitleaks + a dependency audit on every PR.

Build / test:

```
pnpm install
pnpm build
pnpm lint
pnpm test
```

Secrets come from env / the platform, never hardcoded.
