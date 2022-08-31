/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  testMatch: ['**/lib/**/*.test.ts', '**/lib/**/*.test.tsx'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/lib/**/*.{js,jsx,ts,tsx}',
    '!**/lib/testUtils/*.{js,jsx,ts,tsx}',
    '!**/lib/**/index.{js,jsx,ts,tsx}', // Index files are only used to export files
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  roots: ['<rootDir>', 'lib/'],
  modulePaths: ['<rootDir>', 'lib/'],
  moduleDirectories: ['node_modules'],
};
