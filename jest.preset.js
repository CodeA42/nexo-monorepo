const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: [
    ...(nxPreset?.globals?.setupFilesAfterEnv ?? []),
    'jest-extended/all',
  ],
  globals: {
    ...(nxPreset.globals || {}),
    TextEncoder: require('util').TextEncoder,
  },
};
