import { is } from '@wp-g2/utils';

import { responsive } from './responsive';

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

		if (Array.isArray(arg)) {
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

/** @typedef {import('create-emotion').Emotion['css']} CSS */
