import createEmotion from 'create-emotion';

import { plugins } from './plugins';

const options = {
	stylisPlugins: plugins,
};

/**
 * We're creating a custom Emotion instance to ensure that the style system
 * does not conflict with (potential) existing Emotion instances.
 *
 * We're also able to provide createEmotion with our custom Stylis plugins.
 */
const customEmotionInstance = createEmotion(options);

/**
 * Exporting all of the props from our custom Emotion instance, just like
 * an emotion package would.
 */
export const {
	cache,
	css,
	cx,
	flush,
	getRegisteredStyles,
	hydrate,
	injectGlobal,
	keyframes,
	merge,
	sheet,
} = customEmotionInstance;
