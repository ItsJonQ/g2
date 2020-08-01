import cssVariablesPlugin from 'stylis-plugin-css-variables';

import specificityPlugin from './extraSpecificity';
import rtlPlugin from './rtl';

const isProd = process.env.NODE_ENV === 'production';

export const plugins = [
	rtlPlugin,
	cssVariablesPlugin({ skipSupportedBrowsers: isProd }),
	specificityPlugin({ htmlPrefix: true, level: 3 }),
];
