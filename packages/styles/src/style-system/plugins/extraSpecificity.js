import { clamp, repeat } from '@wp-g2/utils';

// https://github.com/thysultan/stylis.js#plugins
const STYLIS_CONTEXTS = {
	AT_RULE: 3,
	NEWLINE: 0,
	POST_PROCESS: -2,
	PREPARATION: -1,
	PROPERTY: 1,
	SELECTOR_BLOCK: 2,
};

export const STYLIS_PROPERTY_CONTEXT = STYLIS_CONTEXTS.PREPARATION;
const seen = new WeakSet();

const defaultOptions = {
	htmlPrefix: true,
	level: 3,
};

function stylisExtraSpecificityPlugin(options = defaultOptions) {
	const { htmlPrefix, level } = { ...defaultOptions, ...options };
	const repeatLevel = clamp(level, 0, 20);
	const html = htmlPrefix ? 'html ' : '';

	return (context, content, selectors) => {
		if (seen.has(selectors)) return;
		seen.add(selectors);

		for (let i = 0; i < selectors.length; i++) {
			const [match] = selectors[i].match(/.css-[\w|\d]*/g) || [];
			const prefix = `${html}${repeat(match, repeatLevel)}`;

			if (match && prefix) {
				selectors[i] = selectors[i].replace(prefix, '');
				selectors[i] = `${prefix}${selectors[i]}`;
			}
		}
	};
}

export default stylisExtraSpecificityPlugin;
