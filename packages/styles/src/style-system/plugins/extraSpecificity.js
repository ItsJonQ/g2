import { clamp, repeat } from '@wp-g2/utils';

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
			let item = selectors[i];
			const [match] = item.match(/.css-[\w|\d]*/g) || [];

			if (match) {
				item = item
					.replace(new RegExp(html, 'g'), '')
					.replace(new RegExp(match, 'g'), match)
					.replace(match, repeat(match, repeatLevel));
				selectors[i] = `${html}${item}`;
			}
		}
	};
}

export default stylisExtraSpecificityPlugin;
