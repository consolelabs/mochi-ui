## Introduction

Console Labs UI is a React-based UI toolkit designed to create beautiful and
accessible interfaces, particularly for web3 projects. It leverages the
capabilities of [Tailwind CSS](https://tailwindcss.com/) and
[Radix UI](https://www.radix-ui.com/) as its foundation.

The main objective of this library is to simplify the development workflow,
enabling faster creation of web applications with an improved user experience.

## Installation

Prerequisites:

- [React](https://react.dev/) >= 18
- [Tailwind CSS](https://tailwindcss.com/) >= 3

To integrate Console Labs UI into your project, follow these steps:

### Global Installation

For a quick start, the global setup is recommended. This approach involves
importing all components from a single package.

**1. Install packages**

Execute the following command in your terminal to install Console Labs UI:

```sh
pnpm add @consolelabs/core
```

**2. TailwindCSS setup**

Since Console Labs UI is based on Tailwind CSS, it's necessary to install
Tailwind CSS first. Follow the official
[guide for installation](https://tailwindcss.com/docs/installation). Afterward,
add this code to your `tailwind.config.js`:

```js
// tailwind.config.js
import { consolelabs } from '@consolelabs/core'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    './node_modules/@consolelabs/theme/dist/components/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [consolelabs()],
}
```

**3. Configuring pnpm (Optional)**

For those utilizing pnpm, it's necessary to modify your `.npmrc` file with the
following code. This step ensures that the package paths align correctly,
allowing TailwindCSS to accurately interpret Tailwind class names:

```sh
public-hoist-pattern[]=*@consolelabs/*
```

Once you've updated the `.npmrc` file, execute pnpm install once more to
guarantee proper installation of the dependencies.

### Individual Installation

Console Labs UI also supports modular installation, allowing you to install
components individually. This approach is beneficial for reducing your CSS
bundle size, as it includes only the styles for the components in use.

> Note: The JavaScript bundle size remains unaffected due to Console Labs UI's
> tree shaking feature.

To install components individually, follow these steps:

**1. Core Package Installation**

```sh
pnpm add @consolelabs/theme
```

**2. Component Installation**

Install the desired component. For instance, to use the Button component, run:

```sh
pnpm add @consolelabs/button
```

**3. Tailwind CSS Configuration**

When using individual packages, modify your `tailwind.config.js` to include only
the styles of the components you are using. For the Button component, add:

```js
// tailwind.config.js
import { consolelabs } from '@consolelabs/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // single component styles
    './node_modules/@consolelabs/theme/dist/components/button.js',
    // or you can use a glob pattern (multiple component styles)
    './node_modules/@consolelabs/theme/dist/components/(button|snippet|code|input).js',
  ],
  plugins: [consolelabs()],
}
```

**4. Use the Component**

You can now use the installed component in your application:

```js
import * as React from 'react'
import { Button } from '@consolelabs/button'

function App() {
  return <Button>Press me</Button>
}
```

**5. Configuring pnpm (Optional)**

For those utilizing pnpm, it's necessary to modify your `.npmrc` file with the
following code. This step ensures that the package paths align correctly,
allowing TailwindCSS to accurately interpret Tailwind class names:

```sh
public-hoist-pattern[]=*@consolelabs/*
```

Once you've updated the `.npmrc` file, execute pnpm install once more to
guarantee proper installation of the dependencies.

## Design Philosophy

Console Labs UI adheres to key principles ensuring consistency and reliability
in its components. Understanding these principles is crucial for effective
contribution to the library.

Our aim is to craft straightforward, modular components that address common UI
design challenges. We adhere to a set of guidelines to maintain this focus.

#### Simplicity

We prioritize simplicity in our component APIs, showcasing practical use cases.

#### Composition

We design components as small, manageable units with minimal properties,
allowing for easy composition and ensuring style and functionality are both
flexible and extendable.

#### Accessibility

Accessibility is a core consideration in our component design, encompassing
aspects like keyboard navigation, focus management, color contrast, voice-over
compatibility, and appropriate use of `aria-*` attributes.

#### API Consistency

Console Labs UI maintains a uniform API across all components. Common attributes
are consistently named, using auxiliary verbs like `does`, `has`, `is`, `and`
`should`, facilitating predictability and easing the learning process for
developers.

#### Adherence to Web Standards

Our components mirror native web attributes. For instance, form components
include `value` and `onChange` props, and the Button component supports
attributes like `disabled` and `loading`.
