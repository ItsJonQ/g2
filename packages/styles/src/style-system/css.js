import { is } from '@wp-g2/utils';

import { css as compile } from './emotion';
import { breakpoints } from './utils';

// https://github.com/system-ui/theme-ui/blob/master/packages/css/src/index.ts#L224
export const responsive = (styles = {}) => {
	const next = {};
	const mediaQueries = [
		null,
		...breakpoints.map((n) => `@media screen and (min-width: ${n})`),
	];

	for (const k in styles) {
		const key = k;
		let value = styles[key];

		if (value === null) continue;

		if (!is.array(value)) {
			next[key] = value;
			continue;
		}

		for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
			const media = mediaQueries[i];
			if (!media) {
				next[key] = value[i];
				continue;
			}
			next[media] = next[media] || {};
			if (value[i] === null) continue;
			next[media][key] = value[i];
		}
	}

	return next;
};

export function responsiveValue(value, transform = (v) => v) {}

export function css(...args) {
	if (is.plainObject(args[0])) {
		return compile(responsive(args[0]));
	}
	return compile(...args);
}
