import { get } from '../core';

/**
 * @param {import('react').ReactText} value
 * @return {string}
 */
export function space(value) {
	return typeof value === 'number'
		? `calc(${get('gridBase')} * ${value})`
		: value;
}
