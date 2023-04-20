const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleDirectories: ['node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src' }),
  modulePathIgnorePatterns: ['<rootDir>/build'],
  testEnvironment: 'node',
  projects: [
    {
      displayName: 'test',
      testMatch: [
        '<rootDir>/tests/**/*.test.ts',
        '<rootDir>/src/**/*.test.ts',
      ],
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: [
        '<rootDir>/src/**/*.ts',
      ],
    },
  ],
};
