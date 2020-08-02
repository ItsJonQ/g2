import { is } from '@wp-g2/utils';

import { get } from './system';
export function toPx(value) {
	return is.number(value) ? `${value}px` : value;
}

export function space(value = 1) {
	return is.number(value) ? `calc(${get('gridBase')} * ${value})` : value;
}
