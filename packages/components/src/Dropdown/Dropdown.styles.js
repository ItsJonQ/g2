import { css, ui } from '@wp-g2/styles';

export const DropdownMenu = css`
	${ui.zIndex('Dropdown', 9998)};
	min-width: 200px;
	opacity: 0;
	transform-origin: top center;
	transition: opacity ${ui.get('transitionDurationFastest')} ease;

	&[data-enter] {
		opacity: 1;
	}
`;

export const Card = css`
	max-height: 50vh;
	min-height: 24px;
`;

export const Scrollable = css`
	max-height: 50vh;
	padding: 4px;
`;
