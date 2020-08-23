const fs = require('fs');
const path = require('path');
const glob = require('glob');
const matter = require('gray-matter');

const { DATA_FILES } = require('./utils');

async function getSnippetData() {
	const files = glob.sync(DATA_FILES);
	const data = files.map(getDataFromFile);

	return data;
}

function getSnippetNames() {
	const files = glob.sync(DATA_FILES);
	const data = files.map((file) => {
		const basename = path.basename(file);
		return basename.replace('.snip', '');
	});

	return data;
}

function getDataFromFile(file) {
	const fileContent = fs.readFileSync(file, 'utf-8');
	const markdownData = matter(fileContent);
	const { content: originalContent, data } = markdownData;
	const { slug } = data;
	const content = transformContent(originalContent);
	const body = content.split('\n');
	const prefix = `g2-${slug}`;

	const name = `g2-components-${slug}`;

	return {
		...markdownData,
		...data,
		body,
		command: prefix,
		content,
		name,
		prefix,
	};
}

function transformContent(content) {
	return content.trim();
}

exports.getSnippetData = getSnippetData;
exports.getSnippetNames = getSnippetNames;
