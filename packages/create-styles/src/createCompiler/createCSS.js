import { is } from '@wp-g2/utils';

import { breakpoints } from './utils';

/**
 * @param {CSS} compile
 * @return {CSS}
 */
export function createCSS(compile) {
	/**
	 * An enhanced version of the compiler's (Emotion) CSS function.
	 * This enhanced CSS supports dynamic responsive (breakpoint-based) styles if
	 * the value is an array of values.
	 *
	 * @example
	 * ```js
	 * // The following will render a CSS rule where the widths will be:
	 * // 100px for mobile
	 * // 200px for tablet
	 * // 500px for desktop
	 * css({
	 * 		width: [100, 200, 500]
	 * })
	 * ```
	 * @param {Parameters<CSS>} args
	 * @returns {ReturnType<CSS>} The compiled CSS className associated with the styles.
	 */
	function css(...args) {
		const [arg, ...rest] = args;

		if (is.objectInterpolation(arg)) {
			return compile(responsive(arg));
		}

		if (is.array(arg)) {
			for (let i = 0, len = arg.length; i < len; i++) {
				const n = arg[i];
				if (is.objectInterpolation(n)) {
					arg[i] = responsive(n);
				}
			}
			return compile(...[arg, ...rest]);
		}

		return compile(...args);
	}

	// @ts-ignore No amount of zhuzhing will convince TypeScript that a function with the parameters and return type for CSS is in fact the same type
	return css;
}

// https://github.com/system-ui/theme-ui/blob/master/packages/css/src/index.ts#L224
/**
 * A utility function that generates responsive styles if the value is an array.
 *
 * @param {import('@emotion/serialize').ObjectInterpolation<any>} styles A styles object
 * @param {(key: string, value: any) => any} [getScaleValue]
 * @returns {import('@emotion/serialize').ObjectInterpolation<any>} An adjusted styles object with responsive styles (if applicable).
 */
export const responsive = (
	styles = {},
	getScaleValue = (_, value) => value,
) => {
	/** @type {import('@emotion/serialize').ObjectInterpolation<any>} */
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
				next[key] = getScaleValue(key, value[i]);
				continue;
			}
			next[media] = next[media] || {};
			if (value[i] === null) continue;
			// @ts-ignore One line above we ensure that it is not null
			next[media][key] = getScaleValue(key, value[i]);
		}
	}

	return next;
};

/** @typedef {import('create-emotion').Emotion['css']} CSS */
