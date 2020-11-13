import { createStyleSystem, get as getConfig } from '@wp-g2/create-styles';

import {
	config,
	darkHighContrastModeConfig,
	darkModeConfig,
	highContrastModeConfig,
} from './theme';

/** @type {import('@wp-g2/create-styles').CreateStyleSystemOptions<typeof config, typeof darkModeConfig, typeof highContrastModeConfig, typeof darkHighContrastModeConfig>} */
const systemConfig = {
	baseStyles: {
		MozOsxFontSmoothing: 'grayscale',
		WebkitFontSmoothing: 'antialiased',
		fontFamily: getConfig('fontFamily'),
		fontSize: getConfig('fontSize'),
		margin: 0,
	},
	config,
	// @ts-ignore
	darkModeConfig,
	// @ts-ignore
	highContrastModeConfig,
	// @ts-ignore
	darkHighContrastModeConfig,
};

export const {
	ThemeProvider,
	compiler,
	core,
	createCoreElement,
	createToken,
	get,
	styled,
} = createStyleSystem(systemConfig);
