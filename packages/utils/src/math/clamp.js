import clamp from 'lodash.clamp';

import { getNumber, getPrecision } from './base';

export { default as clamp } from 'lodash.clamp';

/**
 * Clamps a value based on a min/max range with rounding
 *
 * @param {number} value The value.
 * @param {number} min The minimum range.
 * @param {number} max The maximum range.
 * @param {number} step A multiplier for the value.
 *
 * @return {number} The rounded and clamped value.
 */
export function roundClamp(
	value = 0,
	min = Infinity,
	max = Infinity,
	step = 1,
) {
	const baseValue = getNumber(value);
	const stepValue = getNumber(step);
	const precision = getPrecision(step);
	const rounded = Math.round(baseValue / stepValue) * stepValue;
	const clampedValue = clamp(rounded, min, max);

	return precision
		? getNumber(clampedValue.toFixed(precision))
		: clampedValue;
}

/**
 * Clamps a value based on a min/max range with rounding.
 * Returns a string.
 *
 * @param {any} args Arguments for roundClamp().
 * @property {number} value The value.
 * @property {number} min The minimum range.
 * @property {number} max The maximum range.
 * @property {number} step A multiplier for the value.
 *
 * @return {string} The rounded and clamped value.
 */
export function roundClampString(...args) {
	return roundClamp(...args).toString();
}
