Welcome to Web Foundation by Console Labs' team! 🌟 Your interest and enthusiasm
mean a lot to us. This repository, like many open-source projects, thrives on
collaboration and we're excited to have you on board.

Whether you're fixing bugs, proposing new features, or enhancing documentation,
your contributions are immensely valuable. Let's get you started on how you can
contribute to the repository.

## Setting Up the Project

To begin contributing to Web Foundation, follow these steps to set up the
project on your local machine:

1. **Fork the Repository**: Start by forking the repository. Click the
   <kbd>Fork</kbd> button at the top right of this page.
2. **Clone Your Fork**: Clone your fork to your local machine for development.

```sh
git clone https://github.com/<your_github_username>/mochi-ui.git
cd web-foundation
```

3. **Install Dependencies**: Execute `pnpm install` to set up all the necessary
   dependencies and packages. This command ensures everything you need is
   installed.

> Encountering issues? Don’t hesitate to reach out to the
> [ConsoleLabs team](https://discord.com/invite/HNdcU8Kvfh) for support.

## Development Process

Web Foundation operates on a monorepo structure, containing both UI packages and
applications. Each component and application is treated as an independent unit.

### Packages Development

For package development, we use the following tools:

- [PNPM](https://pnpm.io/): Manages packages and dependencies.
- [Tsup](https://tsup.egoist.dev/): Bundles packages.
- [Storybook](https://storybook.js.org/): Facilitates UI component development
  and testing.
- [Testing Library](https://testing-library.com/): Tests components and hooks.
- [Changeset](https://github.com/changesets/changesets): Manages changes
  documentation, changelog generation, and release.

**Commands**

- `pnpm install`: Bootstraps the project, symlinks dependencies, and builds
  components.
- `pnpm storybook`: Launches Storybook server for UI component development.
- `pnpm build:packages`: Builds all component packages.
- `pnpm test:packages`: Runs tests across all component packages.

### Application Development

For developing applications within the monorepo, the process is streamlined:

**Commands**

- `pnpm install`: Bootstraps the project, symlinks dependencies, and builds
  components.
- `pnpm dev:app-slug`: Starts the development server for a specific application.
  Replace `app-slug`` with the appropriate application identifier.
- `pnpm build:app-slug`: Builds a specific application.
- `pnpm test:app-slug`: Runs tests for a specific application.

## Reporting Bugs

If you encounter a bug, please follow the issue template and provide a detailed
description and a path to reproduce the issue.

## Making a Pull Request

For a pull request (PR) to be merged, it requires the approval of at least two
collaborators. If a collaborator is the PR author, their approval counts as one.

### Visual Changes

When you propose a visual change, kindly include screenshots and/or screencasts.
This assists in making the intended change more comprehensible.

### Commit Convention

Ensure your commits follow our convention: `category(scope or module): message`,
using categories like `feat`, `fix`, `refactor`, `docs`, `build`, `test`, `ci`,
and `chore`. For more details, visit
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Steps to Submit a PR

- Fork and clone your fork of the repository.
- Create a new branch following the `[type/scope]` convention.
- Commit your changes adhering to our commit convention.
- Use `pnpm changeset` for detailed change descriptions, crucial for changelog
  generation.
- For minor changes, use `pnpm changeset add --empty`.

### Tests

All bug fixes or feature additions must be accompanied by appropriate tests.

## License

By contributing to the Web Foundation GitHub repository, you agree to license
your contribution under our project's license.

Your participation and contributions are what make the project exciting and
evolving. We look forward to your creative and innovative input!
