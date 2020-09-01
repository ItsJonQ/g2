const jestConfig = require('@itsjonq/zero/jest');

delete jestConfig.roots;

module.exports = Object.assign(jestConfig, {
	projects: ['<rootDir>/packages/*/jest.config.js'],
	collectCoverageFrom: [
		'<rootDir>/packages/components/src/**/*.{js,jsx}',
		'<rootDir>/packages/create-styles/src/**/*.{js,jsx}',
	],
	modulePathIgnorePatterns: ['<rootDir>/.remake/'],
	testPathIgnorePatterns: ['<rootDir>/.remake/'],
	testMatch: [
		'<rootDir>/packages/components/src/**/*.test.{js,jsx}',
		'<rootDir>/packages/create-styles/src/**/*.test.{js,jsx}',
	],
});
