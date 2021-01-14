import { colorize, is } from '@wp-g2/utils';

import { css } from '../style-system';
import { toPx } from './units';

/**
 * @param {number} value
 * @return {string}
 */
export function getBoxShadow(value) {
	const boxShadowColor = `rgba(0 ,0, 0, ${value / 20})`;
	const boxShadow = `0 ${toPx(value)} ${toPx(value * 2)} 0
	${boxShadowColor}`;

	return boxShadow;
}

/**
 * @param {number | { color: string, radius: number, x: number, y: number }} value
 * @return {string}
 */
export function getShadow(value) {
	if (typeof value === 'number') {
		return css({ boxShadow: getBoxShadow(value) });
	}
	if (!is.plainObject(value)) {
		return '';
	}

	const { color = 'black', radius = 10, x = 0, y = 5 } = value;
	const shadowColor =
		colorize(color).setAlpha(0.3).toRgbString() || 'rgba(0, 0, 0, 0.3)';

	return css({
		boxShadow: `${toPx(x)} ${toPx(y)} ${toPx(radius)} ${shadowColor}`,
	});
}
