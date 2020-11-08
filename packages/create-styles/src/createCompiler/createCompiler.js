import createEmotion from 'create-emotion';
import mitt from 'mitt';

import { createCSS } from './createCSS';
import { createPlugins } from './plugins';
import { breakpoints } from './utils';

const defaultOptions = {
	key: 'css',
	specificityLevel: 7,
	rootVariables: {},
};

export function createCompiler(options = {}) {
	const mergedOptions = {
		...defaultOptions,
		...options,
	};

	const { key, rootVariables, specificityLevel } = mergedOptions;

	mergedOptions.stylisPlugins = [
		createPlugins({ key, specificityLevel, rootVariables }),
	];

	if (options.stylisPlugins) {
		mergedOptions.stylisPlugins = [
			...mergedOptions.stylisPlugins,
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

	/**
	 * Exposing the breakpoints used in the internal Style system.
	 */
	customEmotionInstance.breakpoints = breakpoints;

	/**
	 * Enhance the base css function from Emotion to add features like responsive
	 * value handling and compiling an Array of css() calls.
	 */
	const { css } = customEmotionInstance;
	customEmotionInstance.css = createCSS(css);

	/**
	 * An internal custom event emitter (pub/sub) for Emotion.
	 * This is currently used in <StyleFrameProvider /> from `@wp-g2/styled`
	 * to subscribe to and sync style injection.
	 */
	customEmotionInstance.__events = mitt();

	/**
	 * Modify the sheet.insert method to emit a `sheet.insert` event
	 * within the internal custom event emitter.
	 */
	const __insert = customEmotionInstance.sheet.insert;
	customEmotionInstance.sheet.insert = (...args) => {
		__insert.apply(customEmotionInstance.sheet, [...args]);
		customEmotionInstance.__events.emit('sheet.insert', ...args);
	};

	return customEmotionInstance;
}
