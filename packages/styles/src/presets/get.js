import { get } from '../core';
export { get } from '../core';
export { createToken } from '../system';

export function getTokenValue(token) {
	const cssVariable = get(token).replace('var(', '').replace(/\)$/g, '');
	const rawValue = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue(cssVariable);

	return rawValue;
}
