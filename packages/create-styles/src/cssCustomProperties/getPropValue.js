import { sanitizeParens, VAR_REG_EXP } from './utils';

/**
 * Interprets and retrieves the CSS property and value of a declaration rule.
 *
 * @param {string} declaration A CSS declaration rule to parse.
 * @param {object} rootVariables A collection of fallback :root CSS variables.
 * @returns {Array<string, ?string>} [prop, value] parsed from the declaration.
 */
export function getPropValue(declaration, rootVariables) {
	let hasFallbackValue = false;
	// Start be separating (and preparing) the prop and value from the declaration.
	let [prop, value] = declaration.split(/:/);
	prop = prop.trim();

	// Searching for uses of var().
	const matches =
		value.match(VAR_REG_EXP) ||
		/* istanbul ignore next */
		[];

	for (let match of matches) {
		match = match.trim();
		// Splitting again allows us to traverse through nested vars().
		const entries = match.replace(/ /g, '').split('var(').filter(Boolean);

		for (const entry of entries) {
			// Removes extra parentheses
			const parsedValue = sanitizeParens(entry);
			/**
			 * Splits a CSS variable into it's custom property name and fallback.
			 *
			 * Before:
			 * '--bg, black'
			 *
			 * After:
			 * ['--bg', 'black']
			 */
			const [customProp, ...fallbacks] = parsedValue.split(',');
			const customFallback = fallbacks.join(',');

			// Attempt to get the CSS variable from rootVariables. Otherwise, use the provided fallback.
			const fallback =
				(rootVariables && rootVariables[customProp]) || customFallback;

			if (fallback) {
				hasFallbackValue = true;
				/*
				 * If a valid fallback value is discovered, we'll replace it in
				 * our value.
				 */
				value = value.replace(match, fallback);
			}
		}
	}

	// We only want to return a value if we're able to locate a fallback value.
	value = hasFallbackValue ? sanitizeParens(value) : undefined;

	return [prop, value];
}
