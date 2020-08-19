import colorize from 'tinycolor2';

import { is } from './is';
export { default as colorize } from 'tinycolor2';

export function isColor(value) {
	if (!is.string(value)) return false;
	const test = colorize(value);

	return test.isValid();
}
