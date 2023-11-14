module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    // 'apps/**/*.{ts,tsx}',
    'packages/**/*.{ts,tsx}',
    '!packages/**/*.stories.{ts,tsx}',
    '!packages/{storybook,tsconfig,theme,eslint-config-custom,icons,ui,tailwind-config}/**/*',
  ],
  // TODO: update test cases and uncomment this
  // coverageThreshold: {
  //   'apps/**/*.{ts,tsx}': {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  //   'packages/**/*.{ts,tsx}': {
  //     branches: 80,
  //     functions: 80,
  //     lines: 80,
  //     statements: -10,
  //   },
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: [
    // Add patterns to ignore
    '[/\\\\](dist|build|.next)[/\\\\].+\\.(js|jsx|d.ts)$',
    '<rootDir>/packages/(icons|ui|theme|eslint-config-custom|tsconfig|storybook|tailwind-config)/',
    '[/\\\\](packages|apps)[/\\\\].+\\.(config|stories).(js|ts|tsx)$',
  ],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  moduleNameMapper: {
    // Handle module aliases
    '^~cpn/(.*)$': '<rootDir>/apps/mochi-web/components/$1',
    '^~(.*)$': '<rootDir>/apps/mochi-web/$1',
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  setupFilesAfterEnv: ['@testing-library/jest-dom', './scripts/setup-test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
