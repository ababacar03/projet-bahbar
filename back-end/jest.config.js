module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'], // setup global
  testEnvironment: 'node', // pas besoin de JSDOM
  testMatch: ['**/tests/**/*.test.js'], // cherche les tests ici
};
