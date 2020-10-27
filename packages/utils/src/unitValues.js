import { is } from './is';

let __styleTestNode = null;

const getComputedStyledMap = () => {
	if (!__styleTestNode) {
		__styleTestNode = document.createElement('div');
	}

	return __styleTestNode.style;
};

export const getCSSValue = (initialValue) => {
	const [value, unit] = parseUnitValue(initialValue);
	const next = !unit ? value : `${value}${unit}`;

	return next;
};

export const isValidCSSValueForProp = (prop, value) => {
	if (!is.string(prop)) return true;

	const computedStyleMap = getComputedStyledMap();

	if (is.undefined(computedStyleMap[prop])) return true;

	// Reset
	computedStyleMap[prop] = '';

	const next = getCSSValue(value);
	computedStyleMap[prop] = next;

	return computedStyleMap[prop].includes(value);
};

export const isValidNumericUnitValue = (value) => {
	// Disallow values that contains spaces
	if (/ /g.test(value)) {
		return false;
	}

	// Disallow values that start with 0 that isn't a decimal.
	if (/^0[0-9]/g.test(value)) {
		return false;
	}

	// Disallow values where the last character is a symbol
	if (/[-!$^&*()_+|~=`{}[\]:";'<>?,./]$/g.test(value)) {
		return false;
	}

	// Allow numerics.
	if (is.numeric(value)) return true;

	// Disallow values that do not start with alphanumeric characters.
	if (/^\W/g.test(value)) {
		// Allow for negative numbers, e.g. -1
		if (!/^-\w/g.test(value)) {
			return false;
		}
	}

	// Disallow values where a dot follows a character, e.g. 1.p
	if (/\.[a-zA-Z]/g.test(value)) {
		return false;
	}

	// Disable values where there are multiple . chracters.
	if (/\d+\.\d+\.\d+/g.test(value)) {
		return false;
	}

	return true;
};

/**
 * Handles legacy value + unit handling.
 * This component use to manage both incoming value and units separately.
 *
 * Moving forward, ideally the value should be a string that contains both
 * the value and unit, example: '10px'
 *
 * @param {number|string} value Value
 * @param {string} unit Unit value
 * @param {Array<Object>} units Units to derive from.
 * @return {Array<number, string>} The extracted number and unit.
 */
export function getParsedValue(value, unit, units) {
	const initialValue = unit ? `${value}${unit}` : value;

	return parseUnitValue(initialValue, units);
}

/**
 * Checks if units are defined.
 *
 * @param {any} units Units to check.
 * @return {boolean} Whether units are defined.
 */
export function hasUnits(units) {
	return !is.empty(units) && units.length > 1 && units !== false;
}

/**
 * Parses a number and unit from a value.
 *
 * @param {string} initialValue Value to parse
 * @return {Array<number, string>} The extracted number and unit.
 */
export function parseUnitValue(initialValue) {
	if (!is.defined(initialValue)) {
		return [undefined, undefined];
	}

	const value = String(initialValue).trim();

	let num = parseFloat(value, 10);
	num = isNaN(num) ? '' : num;

	const unitMatch = value.match(/[\d.\-+]*\s*(.*)/)[1];

	let unit = is.defined(unitMatch) ? unitMatch : '';
	unit = unit.toLowerCase();

	return [num, unit];
}

export function createUnitValue(value, unit) {
	if (!unit || !is.string(unit) || !is.numeric(value)) return value;

	return `${value}${unit}`;
}
