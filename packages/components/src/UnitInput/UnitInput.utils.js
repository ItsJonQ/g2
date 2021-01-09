import { is, isValidCSSValueForProp, parseUnitValue } from '@wp-g2/utils';

export const UNITS = ['px', '%', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax'];

export function findUnitMatch({ units = UNITS, value = '' }) {
	const match = units.find((unit) => unit.indexOf(value.toLowerCase()) === 0);
	return match;
}

export function findUnitMatchExact({ units = UNITS, value = '' }) {
	const match = units.find(
		(unit) => unit.toLowerCase() === value.toLowerCase(),
	);
	return match;
}

export const isPotentialUnitValue = (value) => {
	return is.numeric(value) && Number(value) !== 0;
};

export function getInitialParsedUnitValue({ cssProp, value }) {
	const [parsedValue, unit] = parseUnitValue(value);
	const isUndefinedParsedValue =
		!is.defined(parsedValue) || is.empty(parsedValue);

	const evalutedValue = isUndefinedParsedValue ? value : parsedValue;

	// Validation without cssProp
	if (!cssProp) {
		if (isUndefinedParsedValue) {
			return [evalutedValue, undefined];
		} else {
			return [parsedValue, unit];
		}
	}

	// Validation with cssProp
	if (isValidCSSValueForProp(cssProp, value)) {
		if (isUndefinedParsedValue) {
			return [evalutedValue, undefined];
		} else {
			return [parsedValue, unit];
		}
	}

	return [undefined, undefined];
}
