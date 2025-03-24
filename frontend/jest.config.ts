module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      "\\.(css|less)$": "<rootDir>/styleMock.js"
    },
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
      "^.+\\.js$": "babel-jest"
    },
  };
  