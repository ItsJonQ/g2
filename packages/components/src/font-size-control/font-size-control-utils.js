import { __ } from '@wordpress/i18n';
import { createUnitValue, is, parseUnitValue } from '@wp-g2/utils';

const DEFAULT_FONT_SIZE = 'default';
const CUSTOM_FONT_SIZE = 'custom';
const MAX_FONT_SIZE_DISPLAY = '25px';

export function hasUnit(value) {
	const [, unit] = parseUnitValue(value);
	return !!unit;
}

function isCustomValue(values = [], value) {
	const item = values.find((item) => item.size === value);
	return !!item;
}

export function getSelectValueFromFontSize(fontSizes, value) {
	if (!value) return DEFAULT_FONT_SIZE;

	const fontSizeValue = fontSizes.find((font) => font.size === value);
	return fontSizeValue ? fontSizeValue.slug : CUSTOM_FONT_SIZE;
}

export function getSelectOptions({ disableCustomFontSizes, options, value }) {
	if (disableCustomFontSizes && !options.length) {
		return null;
	}

	options = [
		{ slug: DEFAULT_FONT_SIZE, name: __('Default'), size: undefined },
		...options,
	];

	if (!isCustomValue(options, value) && !disableCustomFontSizes) {
		options.push({ slug: CUSTOM_FONT_SIZE, name: __('Custom') });
	}

	return options.map((option) => {
		const fontSize = is.number(option.size)
			? createUnitValue(option.size, 'px')
			: option.size;

		return {
			key: option.slug,
			name: option.name,
			size: option.size,
			style: {
				fontSize: `min( ${fontSize}, ${MAX_FONT_SIZE_DISPLAY} )`,
			},
		};
	});
}

export function getInputValue(fontSizes = [], value) {
	const hasUnits = hasUnit(value || fontSizes[0]?.size);

	let noUnitsValue;
	if (!hasUnits) {
		noUnitsValue = value;
	} else {
		noUnitsValue = parseInt(value);
	}

	const isPixelValue =
		is.number(value) || (is.string(value) && value.endsWith('px'));

	const inputValue = (isPixelValue && noUnitsValue) || '';

	return inputValue;
}
