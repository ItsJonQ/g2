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

export function css(...args) {
	const [arg, ...rest] = args;

	if (is.plainObject(arg)) {
		return compile(responsive(arg));
	}

	if (is.array(arg)) {
		for (let i = 0, len = arg.length; i < len; i++) {
			const n = arg[i];
			if (is.plainObject(n)) {
				arg[i] = responsive(n);
			}
		}
		return compile(...[arg, ...rest]);
	}

	return compile(...args);
}
