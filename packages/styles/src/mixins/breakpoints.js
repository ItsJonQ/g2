import { css } from '../style-system';

const BREAKPOINT_SIZES = {
	lg: 992,
	md: 768,
	sm: 576,
};

export function getBreakpoint(size = 'md') {
	return (strings, ...interpolations) => {
		const interpolatedStyles = css(strings, ...interpolations);

		if (size === 'xs') {
			return css`
				@media (max-width: ${BREAKPOINT_SIZES.sm - 1}px) {
					${interpolatedStyles}
				}
			`;
		}

		const minWidth = BREAKPOINT_SIZES[size] || BREAKPOINT_SIZES.md;

		return css`
			@media (min-width: ${minWidth}px) {
				${interpolatedStyles}
			}
		`;
	};
}
