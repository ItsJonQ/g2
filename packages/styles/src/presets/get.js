import { warning } from '@wp-g2/utils';

import { get } from '../core';
export { get } from '../core';
export { createToken } from '../system';

export function getTokenValue(token) {
	const cssVariable = get(token).replace('var(', '').replace(/\)$/g, '');
	const rawValue = window
		.getComputedStyle(document.documentElement)
		.getPropertyValue(cssVariable);

	warning(
		true,
		'@wp-g2/styles, ui.getTokenValue',
		`❗️This function is for debugging only.`,
		`The "${token}" value is a live CSS variable, and cannot be reliably depended upon.`,
		'',
		`ui.getTokenValue('${token}') = ${rawValue};`,
	);

	return rawValue;
}
