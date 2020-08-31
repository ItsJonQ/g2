const jestConfig = require('@itsjonq/zero/jest');

delete jestConfig.roots;

module.exports = Object.assign(jestConfig, {
	projects: ['<rootDir>/packages/*/jest.config.js'],
});
