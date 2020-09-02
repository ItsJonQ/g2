import cssGridPlugin from 'styled-griddie';
import cssVariablesPlugin from 'stylis-plugin-css-variables';

import specificityPlugin from './extraSpecificity';
import rtlPlugin from './rtl';

const isProd = process.env.NODE_ENV === 'production';

/**
 * A collection of custom Stylis plugins to enhance the way the compiler (Emotion)
 * generates selectors and CSS rules.
 */
export const plugins = [
	rtlPlugin,
	cssVariablesPlugin({ skipSupportedBrowsers: isProd }),
	specificityPlugin({ level: 7 }),
	cssGridPlugin,
];
