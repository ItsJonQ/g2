import { is, kebabCase } from '@wp-g2/utils';

import { NAMESPACE } from './constants';

export const DEFAULT_STYLE_SYSTEM_OPTIONS = {
	baseStyles: undefined,
	config: {},
	darkModeConfig: {},
	highContrastModeConfig: {},
	darkHighContrastModeConfig: {},
	compilerOptions: undefined,
};

/**
 * The primary mechanism to retrieve Style system configs values - values that
 * have been transformed into CSS variables with a dedicated namespace.
 *
 * @example
 * ```js
 * get('colorAdmin'); // var(--wp-g2-color-admin, 'blue');
 * ```
 * @param {string} key The config variable to retrieve.
 * @returns {string} The compiled CSS variable associated with the config key.
 */
export function get(key) {
	return `var(${NAMESPACE}-${kebabCase(key)})`;
}

/**
 * Transforms a series of config values into set of namespaced CSS
 * references for the Style system.
 *
 * @param {object} values Style config values to transform into CSS variables.
 * @returns {object} The set of CSS variables, transformed from config values.
 */
export function transformValuesToReferences(values = {}) {
	const next = {};
	for (const [key, value] of Object.entries(values)) {
		const ref = `var(${NAMESPACE}-${kebabCase(key)}, ${value})`;
		next[key] = ref;
	}
	return next;
}

/**
 * Transforms a series of config values into set of namespaced CSS
 * variables for the Style system. These values can then be safely and predictable
 * retrieved using the get() function.
 *
 * @param {object} values Style config values to transform into CSS variables.
 * @returns {object} The set of CSS variables, transformed from config values.
 */
export function transformValuesToVariables(values = {}) {
	const next = {};

	for (const [key, value] of Object.entries(values)) {
		const ref = value;
		next[`${NAMESPACE}-${kebabCase(key)}`] = ref;
	}

	return next;
}

/**
 * Transforms a series of config values into set of namespaced CSS
 * references for the Style system. These values are then transformed into
 * a CSS style value (`string`) that can be injected into the DOM, within a
 * <style> tag.
 *
 * @param {string} selector The selector to attach the config values to.
 * @param {object} values Style config values to transform into CSS variables.
 * @returns {string} Compiled innerHTML styles to be injected into a <style /> tag.
 */
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

/**
 * Retrieves the displayName of a component.
 * @param {any} Component The component to retrieve the tagName from.
 * @returns Either the component's displayName or a fallback of "Component".
 */
export function getDisplayName(Component) {
	let displayName = is.string(Component)
		? Component
		: Component?.displayName || Component?.name || 'Component';

	return displayName;
}
