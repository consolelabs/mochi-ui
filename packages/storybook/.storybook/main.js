const path = require('path')

module.exports = {
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  staticDirs: ['./assets'],
  stories: [
    '../../components/**/src/*.stories.@(js|jsx|ts|tsx)',
    '../../components/**/stories/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-storysource',
    '@storybook/addon-styling-webpack',
  ],
  webpackFinal: async (config) => {
    // Resolve mjs files from libs
    // Here we need the absolute paths to our other libs that the ui package depends on
    config.module.rules.push({
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
