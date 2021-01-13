import { is } from '@wp-g2/utils';

import { css } from '../style-system';
import { toPx } from './units';

/**
 * @param {string | number | any} value
 * @return {value is string | number}
 */
function isValidOffset(value) {
	return typeof value === 'number' || typeof value === 'string';
}

/**
 *
 * @param {{x: number, y: number} | string | number} value
 * @param {number} valueY
 */
export function offset(value, valueY = 0) {
	if (isValidOffset(value)) {
		const finalY = isValidOffset(valueY) ? valueY : 0;
		return css({ transform: `translate(${toPx(value)}, ${toPx(finalY)})` });
	}

	if (is.plainObject(value)) {
		const { x = 0, y = 0 } = value;
		return css({ transform: `translate(${toPx(x)}, ${toPx(y)})` });
	}

	return '';
}

offset.x = (/** @type {string | number} */ value) =>
	css({ transform: `translateX(${toPx(value)})` });
offset.y = (/** @type {string | number} */ value) =>
	css({ transform: `translateY(${toPx(value)})` });

/**
 * @param {string | number} value
 */
export function scale(value) {
	return css({ transform: `scale(${value})` });
}

/**
 * @param {string | number} value
 */
export function scaleY(value) {
	return css({ transform: `scaleY(${value})` });
}

/**
 * @param {string | number} value
 */
export function scaleX(value) {
	return css({ transform: `scaleX(${value})` });
}

/**
 * @param {number} value Degrees.
 */
export function rotate(value) {
	return css({ transform: `rotate(${value}deg)` });
}
