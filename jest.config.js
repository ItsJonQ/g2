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
	moduleNameMapper: {
		'^@wp-g2/(.*)$': '<rootDir>/packages/$1/src/',
	},
	testMatch: [
		'<rootDir>/packages/*/src/**/*.test.{js,jsx}',
		'!<rootDir>/packages/website/**/*',
	],
});
