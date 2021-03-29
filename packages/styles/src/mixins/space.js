import { get } from '../core';

/**
 * @param {number} value
 * @return {string}
 */
export function space(value) {
	return `calc(${get('gridBase')} * ${value})`;
}
