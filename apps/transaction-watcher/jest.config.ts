export default {
  displayName: 'transaction-watcher',
  setupFilesAfterEnv: ['jest-extended/all'],
  preset: '../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  clearMocks: true,
  transform: {
    '^.+\\.(t|j)s?$': ['@swc/jest'],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['lcov'],
  modulePathIgnorePatterns: ['_not-integrated'],
};
