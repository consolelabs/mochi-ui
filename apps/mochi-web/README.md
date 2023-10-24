# mochi-web

Front-end repo for Mochi Web.

| Name             | URL                                    |
| ---------------- | -------------------------------------- |
| Production       | https://mochi.gg                       |
| Core UI Document | https://mochi.gg/dashboard/_components |

## Getting Started

1. Install dependencies:

```
pnpm
```

2. Prepare env by looking into the `.env.example` file. At the moment, you can
   run the app by simply copy `.env.example` into `.env`. Feel free to reach out
   to other maintainers for the envs if you need further help.

## Development

Run development server:

NOTE: this will run the localhost on a _**secure**_ protocol so the url is
https://localhost:3000, the reason for this extra setup is because in order to
debug wallet connect to mobile locally the origin must be a secure protocol in
order to generate the connection URI.

```
pnpm dev:https
```

### Development for Profile Dashboard

1. Please refer to the
   [Core UI Document](https://mochi.gg/dashboard/_components) for a list of
   re-usable components & their variants
2. You can also check detailed their implementation in
   [pages/dashboard/\_components.tsx](./pages/dashboard/_components.tsx) if you
   need more references

## Deployment

We are using Vercel for auto deployment.

1. Preview builds on PR
2. Production build on merging into `master`

## Contribution

### Commit

Please follow
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

```
feat: do something
chore: do something trivial
fix: something that's broken
...
```

### Merge

Our PR process is simple - just create a PR into `master` when your changes are
ready. Some tips for creating PRs:

1. PR name should follow conventional commit. E.g.: `feat: add X page`
2. PR description should include relevant details:
   1. What does this PR do?
   2. How to test?
   3. Media (Image/Video) if applicable

## Built With

- [NextJS](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [wagmi](https://wagmi.sh/)
- [iconify](https://iconify.design/)
- [headlessui](https://headlessui.com/)
- [@dwarvesf/react-hooks](https://www.npmjs.com/package/@dwarvesf/react-hooks)
- [@dwarvesv/react-utils](https://www.npmjs.com/package/@dwarvesf/react-utils)
- ...
