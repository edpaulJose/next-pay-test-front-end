module.exports = async () => {
  return {
    modulePaths: ['<rootDir>/src'],
    transform: { '^.+\\.js$': '<rootDir>/jest.transform.js' },
    verbose: true,
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      ".+\\.(css|styl|less|sass|scss|PNG|png|jpg|ttf|woff|woff2)$": "<rootDir>/empty-module.js"
    }
  };
};