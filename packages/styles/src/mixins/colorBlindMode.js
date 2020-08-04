import { css } from '../style-system';
import { COLOR_BLIND_MODE_ATTR } from '../theme';

export function colorBlindMode(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);
	console.log(strings, interpolations);

	return css`
		${COLOR_BLIND_MODE_ATTR} & {
			${interpolatedStyles}
		}
	`;
}
