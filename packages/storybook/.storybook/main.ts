import { dirname, join } from 'path'
import type { StorybookConfig } from '@storybook/react-vite'

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

const storybookConfig: StorybookConfig = {
  staticDirs: ['./assets'],

  stories: [
    '../../components/**/stories/*.stories.@(js|jsx|ts|tsx|md|mdx)',
    '../../web3/**/stories/*.stories.@(js|jsx|ts|tsx|md|mdx)',
    '../src/*.stories.@(js|jsx|ts|tsx|md|mdx)',
  ],

  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('storybook-dark-mode'),
  ],

  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {
      strictMode: true,
    },
  },

  features: {
    buildStoriesJson: true,
  },

  core: {
    disableTelemetry: true,
  },

  typescript: {
    reactDocgen: 'react-docgen',
  },

  async viteFinal(config) {
    config.define = { 'process.env': {} }

    return config
  },
}

export default storybookConfig
