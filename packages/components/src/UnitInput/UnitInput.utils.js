/**
 * External dependencies
 */
import { is } from '@wp-g2/utils';

export const CSS_UNITS = [
	{ value: 'px', label: 'px', default: 0 },
	{ value: '%', label: '%', default: 10 },
	{ value: 'em', label: 'em', default: 0 },
	{ value: 'rem', label: 'rem', default: 0 },
	{ value: 'vw', label: 'vw', default: 10 },
	{ value: 'vh', label: 'vh', default: 10 },
];

export const DEFAULT_UNIT = CSS_UNITS[0];

const __styleTestNode = document.createElement('div');
const __computedStyleMap = __styleTestNode.style;

export const getCSSValue = (initialValue) => {
	const [value, unit] = baseParseUnit(initialValue);
	const next = !unit ? value : `${value}${unit}`;

	return next;
};

export const isValidCSSValueForProp = (prop, value) => {
	if (!is.string(prop)) return true;
	if (is.undefined(__computedStyleMap[prop])) return true;

	// Reset
	__computedStyleMap[prop] = '';

	const next = getCSSValue(value);
	__computedStyleMap[prop] = next;

	return __computedStyleMap[prop] === value;
};

export const isValidNumericUnitValue = (value) => {
	if (is.numeric(value)) return true;

	// Disallow values that contains spaces
	if (/ /g.test(value)) {
		return false;
	}

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

	return parseUnit(initialValue, units);
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
export function baseParseUnit(initialValue) {
	const value = String(initialValue).trim();

	let num = parseFloat(value, 10);
	num = isNaN(num) ? '' : num;

	const unitMatch = value.match(/[\d.\-\+]*\s*(.*)/)[1];

	let unit = unitMatch !== undefined ? unitMatch : '';
	unit = unit.toLowerCase();

	return [num, unit];
}

/**
 * Parses a number and unit from a value.
 *
 * @param {string} initialValue Value to parse
 * @param {Array<Object>} units Units to derive from.
 * @return {Array<number, string>} The extracted number and unit.
 */
export function parseUnit(initialValue, units = CSS_UNITS) {
	const [num, _unit] = baseParseUnit(initialValue);
	let unit;

	if (hasUnits(units)) {
		const match = units.find((item) => item.value === _unit);
		unit = match?.value;
	} else {
		unit = DEFAULT_UNIT.value;
	}

	return [num, unit];
}

/**
 * Parses a number and unit from a value. Validates parsed value, using fallback
 * value if invalid.
 *
 * @param {number|string} next The next value.
 * @param {Array<Object>} units Units to derive from.
 * @param {number|string} fallbackValue The fallback value.
 * @param {string} fallbackUnit The fallback value.
 * @return {Array<number, string>} The extracted number and unit.
 */
export function getValidParsedUnit(next, units, fallbackValue, fallbackUnit) {
	const [parsedValue, parsedUnit] = parseUnit(next, units);
	let baseValue = parsedValue;
	let baseUnit;

	if (isNaN(parsedValue) || parsedValue === '') {
		baseValue = fallbackValue;
	}

	baseUnit = parsedUnit || fallbackUnit;

	/**
	 * If no unit is found, attempt to use the first value from the collection
	 * of units as a default fallback.
	 */
	if (hasUnits(units) && !baseUnit) {
		baseUnit = units[0]?.value;
	}

	return [baseValue, baseUnit];
}

export function createUnitValue(value, unit) {
	if (!unit || !is.string(unit)) return value;

	return `${value}${unit}`;
}
