const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'] }],
    '\\.css$': 'jest-css-modules-transform'
  },
  setupFilesAfterEnv: [path.join(__dirname, 'src/setupTests.ts')],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'css'],
  rootDir: '.',
  transformIgnorePatterns: [
    'node_modules/(?!(@testing-library)/)'
  ]
}