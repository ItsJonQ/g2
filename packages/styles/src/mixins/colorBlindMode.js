import { COLOR_BLIND_MODE_ATTR } from '@wp-g2/create-styles';

import { css } from '../style-system';

/**
 * @param {TemplateStringsArray} strings
 * @param  {import('create-emotion').Interpolation[]} interpolations
 */
export function colorBlindMode(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);

	return css`
		${COLOR_BLIND_MODE_ATTR} & {
			${interpolatedStyles}
		}
	`;
}
