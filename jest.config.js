module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'apps/**/*.{ts,tsx}',
    'packages/**/*.{ts,tsx}',
    '!packages/**/*.stories.{ts,tsx}',
    '!packages/tailwind-config',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: [
    // Add patterns to ignore
    '<rootDir>/examples',
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
      tsconfig: 'tsconfig.spec.json',
    },
  },
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}
