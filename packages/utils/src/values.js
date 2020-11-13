import { is } from './is';

/**
 * Determines if a value is empty, null, or undefined.
 *
 * @param {any} value The value to check.
 * @return {boolean} Whether value is empty.
 */
export function isValueEmpty(value) {
	const isEmptyString = value === '';

	return !is.defined(value) || isEmptyString;
}

/**
 * Attempts to get a defined/non-null value from a collection of arguments.
 *
 * @param {Array<any>} values Values to derive from.
 * @param {any} fallbackValue Fallback value if there are no defined values.
 * @return {any} A defined value or the fallback value.
 */
export function getDefinedValue(values = [], fallbackValue) {
	return values.find(is.defined) ?? fallbackValue;
}
