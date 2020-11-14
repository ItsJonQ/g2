import { is } from '@wp-g2/utils';

/**
 * @param {string | number} value
 * @return {string | number}
 */
export function toPx(value) {
	if (is.numeric(value)) {
		return `${value}px`;
	}

	return value;
}
