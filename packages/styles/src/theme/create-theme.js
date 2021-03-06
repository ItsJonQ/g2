import { get } from '@wp-g2/create-styles';
import { colorize, getComputedColor } from '@wp-g2/utils';

import { space } from '../mixins/space';
import { config } from './config';
import { generateColorAdminColors } from './utils';

const baseTheme = Object.freeze(Object.assign({}, config));

/**
 * @param {(props: { get: typeof get, theme: typeof baseTheme, color: typeof colorize, space: typeof space }) => Record<string, string>} callback
 * @return {Record<string, string>}
 */
export function createTheme(callback) {
	const props = {
		get,
		theme: baseTheme,
		color: colorize,
		space,
	};

	const customConfig = callback(props);

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
