import createEmotion from 'create-emotion';

import { createCSS } from './createCSS';
import { plugins } from './plugins';
import { breakpoints } from './utils';

const defaultOptions = {
	stylisPlugins: plugins,
};

export function createCompiler(options = {}) {
	const mergedOptions = { ...defaultOptions, ...options };

	if (options.stylisPlugins) {
		mergedOptions.stylisPlugins = [
			...defaultOptions.stylisPlugins,
			...options.stylisPlugins,
		];
	}

	/**
	 * We're creating a custom Emotion instance to ensure that the style system
	 * does not conflict with (potential) existing Emotion instances.
	 *
	 * We're also able to provide createEmotion with our custom Stylis plugins.
	 */
	const customEmotionInstance = createEmotion(mergedOptions);
	const { css } = customEmotionInstance;

	customEmotionInstance.css = createCSS(css);
	customEmotionInstance.breakpoints = breakpoints;

	return { ...customEmotionInstance, css: createCSS(css) };
}
