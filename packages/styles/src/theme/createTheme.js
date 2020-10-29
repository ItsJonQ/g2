import { get } from '@wp-g2/create-styles';
import { colorize, getComputedColor, is, noop } from '@wp-g2/utils';

import { space } from '../mixins/space';
import { config } from './config';
import { generateColorAdminColors } from './utils';

const baseTheme = Object.freeze(Object.assign({}, config));

export function createTheme(callback = noop) {
	if (!is.function(callback)) return {};

	const props = {
		get,
		theme: baseTheme,
		color: colorize,
		space,
	};

	const customConfig = callback(props);

	if (!is.plainObject(customConfig)) return {};

	let colorAdminColors = {};

	if (customConfig.colorAdmin) {
		const colorAdminValue = getComputedColor(customConfig.colorAdmin);
		colorAdminColors = generateColorAdminColors(colorAdminValue);
	}

	return {
		...customConfig,
		...colorAdminColors,
	};
}
