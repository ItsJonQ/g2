import { css, ui } from '@wp-g2/styles';

import { Divider } from '../Divider';

export const DropdownMenu = css`
	${ui.zIndex('Dropdown', 9998)};
	min-width: 200px;
	opacity: 0;
	transform-origin: top center;
	transition: opacity ${ui.get('transitionDurationFastest')} ease;

	&[data-enter] {
		opacity: 1;
	}

	${Divider} {
		margin-left: ${ui.space(-1)};
		margin-right: ${ui.space(-1)};
	}
`;

export const Card = css`
	${ui.zIndex('Dropdown')};
	max-height: 50vh;
	min-height: 24px;
	outline: none;
`;

export const Scrollable = css`
	max-height: 50vh;
	padding: ${ui.space(1)};
`;
