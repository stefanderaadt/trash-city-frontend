module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|jsx|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|jsx|js)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  setupTestFrameworkScriptFile: '<rootDir>/src/setupTests.js',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|css)$':
      '<rootDir>/src/utils/empty-module.js'
  },
  setupFiles: ['jest-canvas-mock'],
  collectCoverage: true,
  coverageReporters: ['html']
};
