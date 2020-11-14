import { css } from '../style-system';

/**
 * @param {TemplateStringsArray} strings
 * @param  {import('create-emotion').Interpolation[]} interpolations
 */
export function ieOnly(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);

	return css`
		@media screen and (-ms-high-contrast: active),
			(-ms-high-contrast: none) {
			${interpolatedStyles};
		}
	`;
}

/**
 * @param {TemplateStringsArray} strings
 * @param  {import('create-emotion').Interpolation[]} interpolations
 */
export function firefoxOnly(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);

	return css`
		@-moz-document url-prefix() {
			${interpolatedStyles};
		}
	`;
}

/**
 * @param {TemplateStringsArray} strings
 * @param  {import('create-emotion').Interpolation[]} interpolations
 */
export function safariOnly(strings, ...interpolations) {
	const interpolatedStyles = css(strings, ...interpolations);

	return css`
		@media not all and (min-resolution: 0.001dpcm) {
			@supports (-webkit-appearance: none) {
				${interpolatedStyles}
			}
		}
	`;
}
