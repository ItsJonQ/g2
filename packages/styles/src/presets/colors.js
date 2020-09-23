import { colorize } from '@wp-g2/utils';

import { get } from '../core';
import { SUPPORTED_COLORS } from '../theme/config';
import { G2_COLORS } from '../theme/tokens';

export function color(value) {
	return colorize(value);
}

color.admin = get('admin');
color.text = get('colorText');
color.textInverted = get('colorTextInverted');
color.border = get('surfaceBorderColor');

/**
 * Add supported colors to the color() method
 */
SUPPORTED_COLORS.forEach((value) => {
	const shades = [null, 100, 300, 500, 700, 900];
	shades.forEach((shade) => {
		if (!shade) {
			color[value] = get(`${value}500`);
		} else {
			color[`${value}${shade}`] = get(`${value}${shade}`);
		}
	});
});

/**
 * Add G2 colors to the color() method
 */
Object.keys(G2_COLORS).forEach((value) => {
	color[value] = get(value);
});
