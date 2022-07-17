// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
let config = {
  verbose: true,
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
};

module.exports = config;

// Or async function
module.exports = async () => ({
  verbose: true,
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
});
