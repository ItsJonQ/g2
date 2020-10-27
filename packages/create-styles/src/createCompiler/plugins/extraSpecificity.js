import { clamp, repeat } from '@wp-g2/utils';

const seen = new WeakSet();

const defaultOptions = {
	key: 'wp-css',
	level: 7,
};

/**
 * Custom stylis plugin that increases the scope of generated selectors.
 * The default compounding "level" is 7.
 *
 * For example, a selector of `.css-ah12df` would result in a final selector
 * of `.css-ah12df.css-ah12df.css-ah12df.css-ah12df.css-ah12df.css-ah12df.css-ah12df`.
 *
 * @param {object} options Options to adjust the plugin
 */
function stylisExtraSpecificityPlugin(options = defaultOptions) {
	const { key, level } = { ...defaultOptions, ...options };
	const repeatLevel = clamp(level, 0, 20);

	return (context, content, selectors) => {
		if (seen.has(selectors)) return;
		seen.add(selectors);

		const regex = new RegExp(`.${key}-[\\w|\\d]*`, 'g');

		for (let i = 0; i < selectors.length; i++) {
			let item = selectors[i];
			const [match] = item.match(regex) || [];

			if (match) {
				item = item
					.replace(new RegExp(match, 'g'), match)
					.replace(match, repeat(match, repeatLevel));

				selectors[i] = item;
			}
		}
	};
}

export default stylisExtraSpecificityPlugin;
