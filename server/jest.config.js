/** @type {import('ts-jest').JestConfigWithTsJest} */
require('dotenv').config({ path: '.test.env' });

module.exports = {
  preset: 'ts-jest',
  rootDir: './',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
};
