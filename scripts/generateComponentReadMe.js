const fs = require('fs-extra');
const glob = require('fast-glob');
const path = require('path');

const { pathExistsSync, readFileSync, writeFileSync } = fs;

const excludeFileNames = ['index'];

function getFilePath(filePath) {
	return path.resolve(__dirname, filePath);
}

const markdownFiles = glob.sync([
	getFilePath('../packages/website/src/docs/components/**/*{.md,.mdx}'),
]);

/**
 * @param {string} filePath The file path.
 */
function getFilePathSlug(filePath) {
	return path.basename(filePath).split('.').slice(0, -1).join('.');
}

/**
 * @param {string} slug The file slug.
 */
function getTargetDirectoryPath(slug) {
	const [indexFile] = glob.sync(
		getFilePath(`../packages/components/src/${slug}/index.js`),
		{ caseSensitiveMatch: false },
	);

	if (!pathExistsSync(indexFile)) {
		return null;
	}

	return path.dirname(indexFile);
}

/**
 * @param {string} filePath The file path.
 */
function getFileData(filePath) {
	const content = readFileSync(filePath, 'utf-8');
	const slug = getFilePathSlug(filePath);
	const targetDirectory = getTargetDirectoryPath(slug);
	const relativeFilePath = path.relative(getFilePath('../'), filePath);

	return {
		targetDirectory,
		relativeFilePath,
		slug,
		filePath,
		content,
	};
}

/**
 * @param {string} filePath The file path.
 */
function excludeFilesFilter(filePath) {
	return !excludeFileNames.includes(getFilePathSlug(filePath));
}

/**
 * @param {string} filePath The file path.
 */
function writeReadMeFile(filePath) {
	const { content, relativeFilePath, targetDirectory } = getFileData(
		filePath,
	);
	const targetFilePathName = path.join(targetDirectory, 'README.md');
	const nextContent = [
		`<!-- Automatically Generated. Do not edit this file. -->`,
		`<!-- Instead, edit ${relativeFilePath} -->`,
		content,
	].join('\n');

	writeFileSync(targetFilePathName, nextContent);
}

function generateComponentReadMe() {
	console.log('Generating markdown docs from website...');
	try {
		markdownFiles.filter(excludeFilesFilter).forEach(writeReadMeFile);
		console.log('Completed markdown doc generation.');
	} catch (err) {
		console.log('Could not generate docs from website.');
	}
}

generateComponentReadMe();
