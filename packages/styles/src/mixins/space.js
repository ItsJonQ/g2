import { is } from '@wp-g2/utils';

import { get } from '../core';

/**
 * @param {number} value
 * @return {string}
 */
export function space(value) {
	return is.number(value) ? `calc(${get('gridBase')} * ${value})` : value;
}
