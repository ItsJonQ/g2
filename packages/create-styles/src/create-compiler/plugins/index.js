import cssGridPlugin from 'styled-griddie';

import specificityPlugin from './extra-specificity';

/**
 * A collection of custom Stylis plugins to enhance the way the compiler (Emotion)
 * generates selectors and CSS rules.
 *
 * @param {object} options
 * @param {number} [options.specificityLevel=7]
 * @param {string} [options.key='css']
 * @return {import('@emotion/stylis').Plugin[]}
 */
export function createPlugins({ key = 'css', specificityLevel = 1 }) {
	return [
		specificityPlugin({ level: specificityLevel, key }),
		// @ts-ignore styled-griddie imports StylisPlugin from `styled-components` which has different types from the actual one we're using here
		cssGridPlugin,
	];
}
