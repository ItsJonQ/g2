import cssGridPlugin from 'styled-griddie';

import cssVariablesPlugin from './css-variables';
import specificityPlugin from './extra-specificity';
import rtlPlugin from './rtl';

const isProd = process.env.NODE_ENV === 'production';

/**
 * A collection of custom Stylis plugins to enhance the way the compiler (Emotion)
 * generates selectors and CSS rules.
 *
 * @param {object} options
 * @param {number} [options.specificityLevel=7]
 * @param {string} [options.key='css']
 * @param {boolean} [options.skipSupportedBrowsers]
 * @param {import('../../css-custom-properties').RootStore} [options.rootStore]
 * @return {import('@emotion/stylis').Plugin[]}
 */
export function createPlugins({
	specificityLevel = 7,
	key = 'css',
	rootStore,
	skipSupportedBrowsers = isProd,
}) {
	return [
		rtlPlugin,
		cssVariablesPlugin({ skipSupportedBrowsers, rootStore }),
		specificityPlugin({ level: specificityLevel, key }),
		// @ts-ignore styled-griddie imports StylisPlugin from `styled-components` which has different types from the actual one we're using here
		cssGridPlugin,
	];
}
