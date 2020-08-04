import { is, kebabCase } from '@wp-g2/utils';

import { REDUCED_MOTION_MODE_ATTR } from './theme';

const NAMESPACE = '--wp-g2';

export function get(key) {
	return `var(${NAMESPACE}-${kebabCase(key)})`;
}

export function transformValuesToReferences(values = {}) {
	const next = {};
	for (const [key, value] of Object.entries(values)) {
		const ref = `var(${NAMESPACE}-${kebabCase(key)}, ${value})`;
		next[key] = ref;
	}
	return next;
}

export function transformValuesToVariables(values = {}) {
	const next = {};

	for (const [key, value] of Object.entries(values)) {
		const ref = value;
		next[`${NAMESPACE}-${kebabCase(key)}`] = ref;
	}

	return next;
}

export function transformValuesToVariablesString(
	selector = ':root',
	values = {},
) {
	const variables = transformValuesToVariables(values);
	const next = [`${selector} {`];

	for (const [key, value] of Object.entries(variables)) {
		const ref = value;
		if (is.defined(ref)) {
			next.push(`${key}: ${ref};`);
		}
	}

	next.push('}');

	return next.join('');
}

export function getIsReducedMotion() {
	return !!document.querySelector(REDUCED_MOTION_MODE_ATTR);
}
