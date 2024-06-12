import jestConfig from './jest.config';

const ONE_MINUTE = 60_000;

export default {
  ...jestConfig,
  globalSetup: './test/util/jestSetup.ts',
  testMatch: ['**/test/**/*.integration-spec.ts'],
  moduleFileExtensions: ['ts', 'js'],
  testTimeout: ONE_MINUTE,
};
