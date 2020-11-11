import { is } from '@wp-g2/utils';

import { breakpoints } from './utils';

/** @typedef {import('create-emotion').Emotion} Emotion */

/**
 * 
 * @param {Emotion['css']} compile 
 * @return {Emotion['css']}
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
	 * @param {Parameters<Emotion['css']>} args
	 * @returns {ReturnType<Emotion['css']>} The compiled CSS className associated with the styles.
	 */
	function css(...args) {
		const [arg, ...rest] = args;

		if (is.plainObject(arg)) {
			// @ts-ignore
			return compile(responsive(arg));
		}

		if (is.array(arg)) {
			for (let i = 0, len = arg.length; i < len; i++) {
				const n = arg[i];
				if (is.plainObject(n)) {
					// @ts-ignore
					arg[i] = responsive(n);
				}
			}
			return compile(...[arg, ...rest]);
		}

		return compile(...args);
	};

	// @ts-ignore
	return css;
}

// https://github.com/system-ui/theme-ui/blob/master/packages/css/src/index.ts#L224
/**
 * A utility function that generates responsive styles if the value is an array.
 *
 * @param {import('create-emotion').ObjectInterpolation<any>} styles A styles object
 * @returns {import('create-emotion').ObjectInterpolation<any>} An adjusted styles object with responsive styles (if applicable).
 */
export const responsive = (styles = {}) => {
	/** @type {Record<any, any>} */
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
