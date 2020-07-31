import { css } from '@wp-g2/styles';

export const PopoverContent = css`
	opacity: 0;
	outline: none;
	transform-origin: top center;
	transition: opacity 120ms ease;
	width: 100%;

	&[data-enter] {
		opacity: 1;
	}
`;
