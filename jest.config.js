const jestConfig = {
    collectCoverageFrom: [
        '<rootDir>/src/lib/**/*.js',
        '<rootDir>/src/utils/**/*.js',
        '!<rootDir>/src/**/*.test.js',
        '!<rootDir>/src/**/*.stories.js',
    ],
    coverageDirectory: './coverage',
    coverageReporters: ['html', 'text', 'text-summary'],
    coverageThreshold: {
        global: {
            branches: 3,
            functions: 4,
            lines: 18,
            statements: 18,
        },
    },
    moduleNameMapper: {
        '\\.(css|scss|sass|less)$': '<rootDir>/src/styleMock.js',
    },
    resolver: require.resolve('jest-pnp-resolver'),
    setupFilesAfterEnv: ['jest-enzyme'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    testEnvironment: 'enzyme',
    testMatch: ['<rootDir>/src/**/*.test.js'],
};

module.exports = jestConfig;
