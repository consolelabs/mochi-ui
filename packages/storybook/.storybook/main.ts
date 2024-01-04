import type { StorybookConfig } from '@storybook/nextjs'

const storybookConfig: StorybookConfig = {
  framework: {
    name: '@storybook/nextjs',
    options: { builder: { useSWC: true } },
  },
  staticDirs: ['./assets'],
  stories: [
    '../../(components|web3)/**/stories/*.stories.@(js|jsx|ts|tsx|md|mdx)',
    '../src/*.stories.@(js|jsx|ts|tsx|md|mdx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-styling-webpack',
    '@storybook/addon-a11y',
    'storybook-dark-mode',
  ],
  webpackFinal: async (config) => {
    // Resolve mjs files from libs
    // Here we need the absolute paths to our other libs that the ui package depends on
    config.module?.rules?.push({
      test: /\.mjs$/,
      include: [
        /node_modules/,
        // path.join(__dirname, '../../utils'),
        // path.join(__dirname, '../../hooks'),
      ],
      type: 'javascript/auto',
    })

    return config
  },
}

export default storybookConfig
