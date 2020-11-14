import { css } from '../style-system';

/**
 * @param {TemplateStringsArray} strings
 * @param  {import('create-emotion').Interpolation[]} interpolations
 */
export function getHighDpi(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);

	return css`
		@media (-webkit-min-device-pixel-ratio: 1.25),
			(min-resolution: 120dpi) {
			${interpolatedStyles}
		}
	`;
}
