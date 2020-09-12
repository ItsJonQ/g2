import { css, get, ui } from '@wp-g2/styles';

export const DropdownMenu = css`
	${ui.zIndex('Dropdown', 9998)};
	margin-top: -10px;
	min-width: 200px;
	opacity: 0;
	transform-origin: top center;
	transition: opacity ${get('transitionDurationFastest')} ease,
		margin-top ${get('transitionDurationFastest')} ease;

	&[data-enter] {
		margin-top: 0px;
		opacity: 1;
	}
`;
