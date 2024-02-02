import './styles.css'
import { Preview, StoryContext } from '@storybook/react'
import prettier from 'prettier/standalone'
// @ts-ignore
import prettierTypescript from 'prettier/parser-babel'
import {
  DocsContainer,
  DocsContainerProps,
  Source,
} from '@storybook/addon-docs'
import { themes } from '@storybook/theming'

import { useDarkMode } from 'storybook-dark-mode'
import React from 'react'

function replaceStart(input: string) {
  const lines = input.split('\n')
  const firstLine = lines[0]?.trim()
  const secondLine = lines[1]?.trim()
  const renderFunctions = ['render() {', 'render()', 'render({', 'render(']
  const isStartWithRenderFnc = renderFunctions.some(
    (r) => secondLine?.startsWith(r),
  )
  // Modify function render to fix prettier error formatting
  if (isStartWithRenderFnc && firstLine === '{') {
    lines[1] = `function ${lines[1]}`
    return lines.slice(1, lines.length - 1).join('\n')
  }
  return lines.join('\n')
}

function isIncludedComponentName(input: string) {
  return !input.includes('<[object Object]')
}

const baseBrand = {
  brandTitle: 'Mochi UI',
  brandUrl: 'https://www.mochiui.com/',
  brandTarget: '_self',
}

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
      container: (props: DocsContainerProps) => {
        const isDark = useDarkMode()
        return (
          <DocsContainer
            {...props}
            theme={isDark ? themes.dark : themes.light}
          />
        )
      },
      source: {
        container: (props: any) => {
          return <Source {...props} dark />
        },
        transform(input: string, c: StoryContext) {
          const { __isArgsStory: isArgsStory, docs } = c.parameters
          if (isArgsStory && isIncludedComponentName(input)) {
            return input
          }
          const originalStory = docs.source?.originalSource || input
          try {
            return prettier.format(replaceStart(originalStory), {
              parser: 'babel-ts',
              plugins: [prettierTypescript],
              bracketSpacing: true,
              bracketSameLine: false,
              jsxSingleQuote: false,
              printWidth: 80,
              proseWrap: 'always',
              semi: false,
              singleQuote: true,
              tabWidth: 2,
              trailingComma: 'all',
              htmlWhitespaceSensitivity: 'ignore',
            })
          } catch (err) {
            console.error(err)
            return input
          }
        },
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'Introduction',
          ['Welcome', 'Installation', 'Design Philosophy'],
          'Icons',
          'Components',
        ],
      },
    },
    darkMode: {
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
      dark: {
        ...themes.dark,
        ...baseBrand,
        brandImage: './logo-white.png',
      },
      light: { ...themes.light, ...baseBrand, brandImage: './logo-black.png' },
    },
  },
}

export default preview
