const NAMESPACE = '--wp-g2';

export function transformValuesToReferences(values = {}) {
	const next = {};
	for (const [key, value] of Object.entries(values)) {
		next[key] = `var(${NAMESPACE}-${key}, ${value})`;
	}
	return next;
}

export function transformValuesToVariables(values = {}) {
	const next = {};
	for (const [key, value] of Object.entries(values)) {
		next[`${NAMESPACE}-${key}`] = value;
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
		next.push(`${key}: ${value};`);
	}

	next.push('}');

	return next.join('');
}
