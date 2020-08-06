import { colorize } from '@wp-g2/utils';
import { is, kebabCase } from '@wp-g2/utils';

import { REDUCED_MOTION_MODE_ATTR } from './theme';

const NAMESPACE = '--wp-g2';

export function get(key) {
	return `var(${NAMESPACE}-${kebabCase(key)})`;
}

export function transformValuesToReferences(values = {}) {
	const next = {};
	for (const [key, value] of Object.entries(values)) {
		const ref = `var(${NAMESPACE}-${kebabCase(key)}, ${value})`;
		next[key] = ref;
	}
	return next;
}

export function transformValuesToVariables(values = {}) {
	const next = {};

	for (const [key, value] of Object.entries(values)) {
		const ref = value;
		next[`${NAMESPACE}-${kebabCase(key)}`] = ref;
	}

	return next;
}

export function transformValuesToVariablesString(
	selector = ':root',
	values = {},
) {
	const variables = transformValuesToVariables(values);
	const next = [`${selector} {`];

	for (const [key, value] of Object.entries(variables)) {
		const ref = value;
		if (is.defined(ref)) {
			next.push(`${key}: ${ref};`);
		}
	}

	next.push('}');

	return next.join('');
}

export function getIsReducedMotion() {
	return !!document.querySelector(REDUCED_MOTION_MODE_ATTR);
}

export function createTextColors(colors = {}) {
	const colorSet = {};
	const entries = Object.entries(colors);
	const light = entries[0][1];
	const lighter = colorize(light).lighten(15).toHexString();
	const dark = entries[entries.length - 1][1];
	const darker = colorize(dark).darken(15).toHexString();

	for (const [color, value] of entries) {
		colorSet[`${color}Text`] = colorize
			.mostReadable(value, [lighter, light, dark, darker])
			.toHexString();
	}

	return colorSet;
}

export function createRgbaColors(colors = {}, isDark = false) {
	const colorSet = {};
	const entries = Object.entries(colors);
	const [baseColorName, baseColorValue] = entries[5];
	const [colorName] = baseColorName.split(/\d+/);

	const ranges = entries.map((entry, index) => (index + 1) * 10);

	const mixBase = isDark ? '#000' : '#fff';
	const readabilityTextBase = isDark ? '#fff' : '#000';
	const adjustMethod = isDark ? 'darken' : 'lighten';

	entries.forEach((entry, index) => {
		const range = ranges[index];
		let enhancedColorValue = baseColorValue;

		enhancedColorValue = colorize(enhancedColorValue)
			.setAlpha(range / 100)
			.toRgbString();

		const testColor = colorize
			.mix(baseColorValue, mixBase, index)
			.toRgbString();

		const isReadable = colorize.isReadable(
			testColor,
			readabilityTextBase,
			{},
		);

		if (!isReadable) {
			enhancedColorValue = colorize(enhancedColorValue)
				[adjustMethod](20)
				.toRgbString();
		}

		colorSet[`${colorName}Rgba${range}`] = enhancedColorValue;
	});

	return colorSet;
}
