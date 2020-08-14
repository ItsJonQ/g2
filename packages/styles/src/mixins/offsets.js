import { is } from '@wp-g2/utils';

import { css } from '../style-system';
import { toPx } from './units';

function isValidOffset(value) {
	return is.number(value) || is.string(value);
}

export function offset(value, valueY = 0) {
	if (is.plainObject(value)) {
		const { x = 0, y = 0 } = value;
		return css({ transform: `translate(${toPx(x)}, ${toPx(y)})` });
	}

	if (isValidOffset(value)) {
		const finalY = isValidOffset(valueY) ? valueY : 0;
		return css({ transform: `translate(${toPx(value)}, ${toPx(finalY)})` });
	}

	return '';
}

offset.x = (value) => css({ transform: `translateX(${toPx(value)})` });
offset.y = (value) => css({ transform: `translateY(${toPx(value)})` });
