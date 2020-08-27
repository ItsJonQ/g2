import { createStyleSystem } from '@wp-g2/create-styles';

import {
	config,
	darkHighContrastModeConfig,
	darkModeConfig,
	highContrastModeConfig,
} from './theme';

const systemConfig = {
	baseStyles: {
		fontFamily: config.fontFamily,
		fontSize: config.fontSize,
	},
	config,
	darkModeConfig,
	highContrastModeConfig,
	darkHighContrastModeConfig,
};

export const {
	compiler,
	core,
	createCoreElement,
	get,
	styled,
} = createStyleSystem(systemConfig);
