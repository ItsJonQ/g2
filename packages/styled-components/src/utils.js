import { is } from '@wp-g2/utils';

export function toPx(value) {
	return is.number(value) ? `${value}px` : value;
}
