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
