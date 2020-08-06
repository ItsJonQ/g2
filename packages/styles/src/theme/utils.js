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

export function createRgbaColors(colorName, baseColorValue, isDark = false) {
	const range = [10, 20, 30, 40, 50, 60, 70, 80, 90];
	const colorSet = {};

	const mixBase = isDark ? '#000' : '#fff';
	const readabilityTextBase = isDark ? '#fff' : '#000';
	const adjustMethod = isDark ? 'darken' : 'lighten';

	for (const index of range) {
		let enhancedColorValue = baseColorValue;

		enhancedColorValue = colorize(enhancedColorValue)
			.setAlpha(index / 100)
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

		colorSet[`${colorName}Rgba${index}`] = enhancedColorValue;
	}

	return colorSet;
}
