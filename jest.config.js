const jestConfig = require('@itsjonq/zero/jest');

delete jestConfig.roots;

module.exports = Object.assign(jestConfig, {
	projects: ['<rootDir>/packages/*/jest.config.js'],
	collectCoverageFrom: [
		'<rootDir>/packages/components/src/**/*.{js,jsx}',
		'<rootDir>/packages/create-styles/src/**/*.{js,jsx}',
		'<rootDir>/packages/styles/src/**/*.{js,jsx}',
	],
	modulePathIgnorePatterns: ['<rootDir>/.remake/'],
	testPathIgnorePatterns: ['<rootDir>/.remake/'],
	testEnvironment: 'jest-environment-jsdom-sixteen',
	moduleNameMapper: {
		'^@wp-g2/a11y': '<rootDir>/packages/a11y/src/',
		'^@wp-g2/animations': '<rootDir>/packages/animations/src/',
		'^@wp-g2/context': '<rootDir>/packages/context/src/',
		'^@wp-g2/gestures': '<rootDir>/packages/gestures/src/',
		'^@wp-g2/hint': '<rootDir>/packages/hint/src/',
		'^@wp-g2/icons': '<rootDir>/packages/icons/src/',
		'^@wp-g2/styles': '<rootDir>/packages/styles/src/',
		'^@wp-g2/substate': '<rootDir>/packages/substate/src/',
		'^@wp-g2/utils': '<rootDir>/packages/utils/src/',
	},
	testMatch: [
		'<rootDir>/packages/*/src/**/*.test.{js,jsx}',
		'!<rootDir>/packages/website/**/*',
	],
});
