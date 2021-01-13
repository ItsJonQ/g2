import { get } from '../core';

/**
 * @param {number} value
 * @return {string}
 */
export function space(value) {
	return typeof value === 'number'
		? `calc(${get('gridBase')} * ${value})`
		: value;
}
