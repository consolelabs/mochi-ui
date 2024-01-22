/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    // 'apps/**/*.{ts,tsx}',
    'packages/**/*.{ts,tsx}',
    '!packages/**/*.stories.{ts,tsx}',
    '!packages/{storybook,theme,icons,core}/**/*',
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
    '<rootDir>/config',
    '<rootDir>/packages/(icons|theme|storybook)/',
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
  transformIgnorePatterns: [`node_modules/(?!(?:.pnpm/)?(flat))`],
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
