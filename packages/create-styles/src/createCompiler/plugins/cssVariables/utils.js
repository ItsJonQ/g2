export const VAR_REG_EXP = new RegExp(/var\(.*?\)[ ) ]*/, 'g');

let htmlRootNode;
/* istanbul ignore next */
if (typeof window !== 'undefined') {
	htmlRootNode = window?.document?.documentElement;
}

/*
 * Caching the computedStyle instance for document.documentElement.
 * We do this so to prevent additional getComputedStyle calls, which greatly
 * improves performance. We use the .getPropertyValue() method from this
 * reference to retrieve CSS variable values.
 *
 * Although the instance is cached, the values retrieved by .getPropertyValue()
 * are up to date. This is important in cases where global :root variables
 * are updated.
 */
const rootComputedStyles =
	htmlRootNode && window.getComputedStyle(htmlRootNode);

/**
 * Repeats a character x amount of times.
 * @param {string} char Character to repeat.
 * @param {number} n Number of times to repeat.
 * @return {string} String with repeated characters
 */
function repeat(char, n, a) {
	return (a = []).join((a[n - 1] = char));
}

/**
 * Retrieves the custom CSS variable from the :root selector.
 *
 * @param {string} key The CSS variable property to retrieve.
 * @return {?string} The value of the CSS variable.
 */
export function getRootPropertyValue(key) {
	// We'll attempt to get the CSS variable from :root.
	let rootStyles = rootComputedStyles;

	/* istanbul ignore next */
	if (process.env.NODE_ENV === 'test') {
		/*
		 * The cached rootComputedStyles does not retrieve the latest values
		 * in our environment (JSDOM). In that case, we'll create a fresh
		 * instance computedStyles on the root HTML element.
		 */
		rootStyles =
			typeof window !== 'undefined' &&
			window.getComputedStyle(document.documentElement);
	}

	return rootStyles?.getPropertyValue?.(key)?.trim();
}

/**
 * Checks to see if a CSS declaration rule is a CSS variable (e.g. --font: 14px)
 *
 * @param {string} declaration  A CSS declaration rule.
 * @return {boolean} Result of whether declaration is a CSS variable.
 */
export function isCustomProperty(declaration) {
	return declaration.indexOf('--') === 0;
}

/**
 * Checks to see if a CSS declaration rule uses var().
 *
 * @param {string} declaration  A CSS declaration rule.
 * @return {boolean} Result of whether declaration contains a CSS variable.
 */
export function hasVariable(declaration) {
	return declaration.includes('var(');
}

/**
 * Appends or trims parens from a value.
 *
 * @param {string} value Value to sanitize.
 * @return {string} The sanitized value
 */
export function sanitizeParens(value) {
	const parenStartCount = value.match(/\(/g)?.length || 0;
	const parenEndCount = value.match(/\)/g)?.length || 0;

	const parenAppendCound = parenStartCount - parenEndCount;
	const parenTrimCount = parenEndCount - parenStartCount;

	let result;

	if (parenStartCount > parenEndCount) {
		// We need to append ) to the end if there are any missing.
		const append = repeat(')', parenAppendCound);
		result = `${value}${append}`;
	} else {
		// Otherwise, we need to trim the extra parens at the end.
		const trimRegExp = new RegExp(`((\\)){${parenTrimCount}})$`, 'gi');
		result = value.replace(trimRegExp, '');
	}

	return result?.trim();
}
