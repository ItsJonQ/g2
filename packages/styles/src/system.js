import { createStyleSystem, get as getConfig } from '@wp-g2/create-styles';

import {
	config,
	darkHighContrastModeConfig,
	darkModeConfig,
	highContrastModeConfig,
} from './theme';

const systemConfig = {
	baseStyles: {
		MozOsxFontSmoothing: 'grayscale',
		WebkitFontSmoothing: 'antialiased',
		fontFamily: getConfig('fontFamily'),
		fontSize: getConfig('fontSize'),
		margin: 0,
	},
	config,
	darkModeConfig,
	highContrastModeConfig,
	darkHighContrastModeConfig,
};

export const {
	ThemeProvider,
	compiler,
	core,
	createCoreElement,
	get,
	styled,
} = createStyleSystem(systemConfig);
