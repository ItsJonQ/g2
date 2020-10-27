import { get } from '@wp-g2/create-styles';
import { colorize, is, noop } from '@wp-g2/utils';

import { space } from '../mixins/space';
import { config } from './config';

export function createTheme(callback = noop) {
	if (!is.function(callback)) return {};

	const props = {
		get,
		theme: Object.assign({}, config),
		color: colorize,
		space,
	};

	const customConfig = callback(props);

	if (!is.plainObject(customConfig)) return {};

	return customConfig;
}
