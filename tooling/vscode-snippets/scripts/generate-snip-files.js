const fs = require('fs');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');

const { DATA_DIR } = require('./utils');
const PACKAGES_DIR = path.resolve(__dirname, '../../../packages');
const MD_FILES = path.join(PACKAGES_DIR, '/website/src/docs/**/*.mdx');

const {
	getDataFromFile,
} = require('../../../packages/website/scripts/get-post-data');

async function generateSnipFiles() {
	const files = glob.sync(MD_FILES);

	mkdirp(DATA_DIR);

	files.forEach(async (file) => {
		const data = await getDataFromFile(file);
		const { slug, snippet, title, type } = data;

		if (type === 'components' && snippet) {
			let content = `
---
title: ${title}
slug: ${slug}
---

${snippet}
      `;

			content = content.trim();

			/* Wrap text content with selectionText */

			// const matches = content.match(/(\>)(.*?)(\<\/)/g);
			// if (matches && matches.length) {
			// 	matches.forEach((match, index) => {
			// 		const next = match
			// 			.replace('>', [`>$`, `{`, index + 1, `:`].join(''))
			// 			.replace('</', `}</`);

			// 		content = content.replace(match, next);
			// 	});
			// }

			const snipFilePath = path.join(DATA_DIR, `${slug}.snip`);

			fs.writeFileSync(snipFilePath, content);
		}
	});
}

generateSnipFiles();
