import { clamp, repeat } from '@wp-g2/utils';

const seen = new WeakSet();

const defaultOptions = {
	level: 7,
};

function stylisExtraSpecificityPlugin(options = defaultOptions) {
	const { level } = { ...defaultOptions, ...options };
	const repeatLevel = clamp(level, 0, 20);

	return (context, content, selectors) => {
		if (seen.has(selectors)) return;
		seen.add(selectors);

		for (let i = 0; i < selectors.length; i++) {
			let item = selectors[i];
			const [match] = item.match(/.css-[\w|\d]*/g) || [];

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
