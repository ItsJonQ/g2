import { css } from '@wp-g2/styles';

export const DropdownMenu = css`
	min-width: 200px;
	opacity: 0;
	transform-origin: top center;
	transition: opacity 120ms ease;

	&[data-enter] {
		opacity: 1;
	}
`;
