import { colorize } from '@wp-g2/utils';

import { REDUCED_MOTION_MODE_ATTR } from '../create-style-system/constants';

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
	const [baseColorName, baseColorValue] = entries[2];
	const [colorName] = baseColorName.split(/\d+/);

	const ranges = [10, 20, 30, 40, 50, 60, 70, 80, 90];

	const mixBase = isDark ? '#000' : '#fff';
	const readabilityTextBase = isDark ? '#fff' : '#000';
	const adjustMethod = isDark ? 'darken' : 'lighten';

	ranges.forEach((entry, index) => {
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
