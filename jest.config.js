module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@cross/(.*)': '<rootDir>/src/cross/$1',
    '@user/(.*)': '<rootDir>/src/user/$1',
    '@gateways/(.*)': '<rootDir>/src/gateways/$1',
  }
};
