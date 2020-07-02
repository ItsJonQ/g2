import colorize from 'tinycolor2';

import { toPx } from './utils';

export function rgba(hexValue = '', alpha = 1) {
	const { r, g, b } = colorize(hexValue).toRgb();
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Creates a space mixin. Used to retrieve space values based on theme.gridBase.
 * @param {number} gridBase The base grid value.
 * @returns {Function} The space function.
 */
export function createSpace(gridBase = 4) {
	return (value = 0) => {
		return toPx(value * gridBase);
	};
}
