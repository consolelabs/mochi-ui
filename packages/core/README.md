## Introduction

Console Labs UI is a UI library for React that helps you build beautiful and
accessible user interfaces, especially for web3 applications. It was built on
top of [Tailwind CSS](https://tailwindcss.com/) and
[Radix UI](https://www.radix-ui.com/).

Its primary goal is to streamline the development process, help to build web
applications faster while enhancing user experiences.

## Installation

Requirements:

- [React](https://react.dev/) >= 18
- [Tailwind CSS](https://tailwindcss.com/) >= 3

To use Console Labs UI in your project, you need to follow the following steps:

### Global Installation

The easiest way to get started with Console Labs UI is to use the global
installation. Which means that all the components are imported from a single
package.

**1. Install packages**

To install Console Labs UI, run one of the following commands in your terminal:

```sh
pnpm install @consolelabs/core @consolelabs/theme
```

**2. TailwindCSS setup**

Console Labs UI is built on top of Tailwind CSS, so you need to install Tailwind
CSS first. You can follow the official
[installation guide](https://tailwindcss.com/docs/installation) to install
Tailwind CSS. Then you need to add the following code to your
`tailwind.config.js` file:

```js
// tailwind.config.js
import { mochi } from '@consolelabs/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    './node_modules/@consolelabs/theme/src/components/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [mochi()],
}
```

### Individual Installation

Console Labs UI is also available as individual packages. You can install each
package separately. This is useful if you want to reduce the size of your CSS
bundle as it will only include styles for the components you're actually using.

> Note: JavaScript bundle size will not change due to tree shaking support in
> Console Labs UI.

Follow the steps below to install each package separately:

**1. Install Core Packages**

```sh
pnpm install @consolelabs/theme
```

**2. Install Component**

Now, let's install the component you want to use. For example, if you want to
use the Button component, you need to run one of the following commands in your
terminal:

```sh
pnpm install @consolelabs/button
```

**3. Tailwind CSS Setup**

TailwindCSS setup changes a bit when you use individual packages. You only need
to add the styles of the components your using to your `tailwind.config.js`
file. For example, for the Button component, you need to add the following code
to your `tailwind.config.js` file:

```js
// tailwind.config.js
import { mochi } from '@consolelabs/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // single component styles
    './node_modules/@consolelabs/theme/dist/components/button.js',
    // or you can use a glob pattern (multiple component styles)
    './node_modules/@consolelabs/theme/dist/components/(button|snippet|code|input).js',
  ],
  plugins: [mochi()],
}
```

**4. Use the Component**

Now, you can use the component you installed in your application:

```js
import * as React from 'react'
import { Button } from '@consolelabs/button'

function App() {
  return <Button>Press me</Button>
}
```

## Design Principles

TBD
