import { css } from '../style-system';
import { DARK_MODE_MODE_ATTR } from '../theme';

export function darkMode(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);

	return css`
		${DARK_MODE_MODE_ATTR} & {
			${interpolatedStyles}
		}
	`;
}
