import { is } from '@wp-g2/utils';

const NAMESPACE = '--wp-g2';

export function get(key) {
	return () => key;
}

export function transformValuesToReferences(values = {}) {
	const next = {};
	for (const [key, value] of Object.entries(values)) {
		let ref;

		if (is.function(value)) {
			ref = `var(${NAMESPACE}-${key})`;
		} else {
			ref = `var(${NAMESPACE}-${key}, ${value})`;
		}

		next[key] = ref;
	}
	return next;
}

export function transformValuesToVariables(values = {}) {
	const next = {};

	for (const [key, value] of Object.entries(values)) {
		let ref = value;

		if (is.function(value)) {
			try {
				ref = `var(${NAMESPACE}-${value()})`;
				// eslint-disable-next-line
			} catch {}
		}

		next[`${NAMESPACE}-${key}`] = ref;
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
		if (is.defined(value)) {
			next.push(`${key}: ${value};`);
		}
	}

	next.push('}');

	return next.join('');
}
