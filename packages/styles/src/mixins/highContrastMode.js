import { css } from '../style-system';
import { HIGH_CONTRAST_MODE_MODE_ATTR } from '../theme';

export function highContrastMode(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);

	return css`
		${HIGH_CONTRAST_MODE_MODE_ATTR} & {
			${interpolatedStyles}
		}
	`;
}
