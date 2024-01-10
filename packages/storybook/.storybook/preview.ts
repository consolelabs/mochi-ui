import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import './styles.css'
import { Parameters, StoryContext } from '@storybook/react'

// Reference: https://github.com/storybookjs/storybook/tree/next/code/lib/source-loader
function loadSource(c: StoryContext, input: string) {
  const storySource = c.parameters.storySource
  const { source: loaderSource, locationsMap } = storySource
  const { __isArgsStory: isArgsStory } = c.parameters

  // If has hardcoded
  if (c.parameters.code !== undefined) {
    return c.parameters.code
  }

  const currentLocationIndex = locationsMap
    ? Object.keys(locationsMap).find((key: string) => {
        const sourceLoaderId = key.split('--')
        return c.id.endsWith(sourceLoaderId[sourceLoaderId.length - 1])
      })
    : undefined
  const currentLocation =
    locationsMap && currentLocationIndex
      ? locationsMap[currentLocationIndex]
      : undefined
  // If not has location or is an story display by argument
  if (!currentLocation || isArgsStory) {
    return input
  }

  const lines = loaderSource.split('\n')

  const { startBody: start, endBody: end } = currentLocation
  if (start.line === end.line && lines[start.line - 1] !== undefined) {
    return lines[start.line - 1].substring(start.col, end.col)
  }
  const startLine = lines[start.line - 1]
  const endLine = lines[end.line - 1]
  if (startLine === undefined || endLine === undefined) {
    return null
  }
  return [
    startLine.substring(start.col),
    ...lines.slice(start.line, end.line - 1),
    endLine.substring(0, end.col),
  ].join('\n')
}

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  docs: {
    source: {
      transform(input: string, c: StoryContext) {
        return loadSource(c, input)
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
    current: 'light',
    classTarget: 'html',
    stylePreview: true,
  },
}
