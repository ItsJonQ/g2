import { transformContent } from '../../../cssCustomProperties/transformContent';
import { hasVariable } from '../../../cssCustomProperties/utils';

// Detects native CSS varialble support
// https://github.com/jhildenbiddle/css-vars-ponyfill/blob/master/src/index.js
let isNativeSupport =
	typeof window !== 'undefined' && window?.CSS?.supports?.('(--a: 0)');

/*
 * This plugin is for the stylis library. It's the CSS compiler used by
 * CSS-in-JS libraries like Emotion.
 *
 * https://github.com/thysultan/stylis.js
 */

const defaultOptions = {
	skipSupportedBrowsers: true,
};

/*
 * Generates fallback values for CSS rule declarations that contain CSS var().
 * This plugin parses uses specified fallback values within the var()
 * function. If one is not provided, it will attempt to use the matching
 * variable declared at the :root scope.
 */
export function stylisPluginCssVariables(
	/* istanbul ignore next */
	options = {},
) {
	const { rootVariables, skipSupportedBrowsers } = {
		...defaultOptions,
		...options,
	};

	const seen = new WeakSet();

	const plugin = (
		context,
		content,
		selectors,
		parents,
		line,
		column,
		length,
		type,
	) => {
		// Skip generating CSS variable fallbacks for supported browsers
		if (skipSupportedBrowsers && isNativeSupport) return;

		// Borrowed guard implementation from:
		// https://github.com/Andarist/stylis-plugin-extra-scope/blob/master/src/index.js#L15

		/* istanbul ignore next */
		if (context !== 2 || type === 107 || seen.has(selectors)) return;

		// We only need to process the content if a CSS var() is used.
		if (!hasVariable(content)) return;

		// Add to our seen cache, as implemented in stylis-plugin-extra-scope
		seen.add(selectors);

		// We'll parse the content to match variables to their custom properties (if possible).
		const nextContent = transformContent(content, rootVariables);

		// Lastly, we'll provide stylis with our enhanced CSS variable supported content.
		return nextContent;
	};

	return plugin;
}
