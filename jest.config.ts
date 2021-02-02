import type {Config} from '@jest/types';

// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

const config: Config.InitialOptions = {
  // An array of directory names to be searched recursively up from the requiring module's location
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'scss'],

  // A map from regular expressions to module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '@main/(.*)': '<rootDir>/src/main/$1',
    '@renderer/(.*)': '<rootDir>/src/renderer/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },

  modulePaths: ['node_modules', '<rootDir>/src', '<rootDir>'],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
  },
};

export default config;
