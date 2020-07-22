import { styled } from '@wp-g2/styled-components';

import { Menu } from '../Menu';

export const DropdownMenuView = styled(Menu)`
	min-width: 200px;
	opacity: 0;
	transform-origin: top center;
	transition: opacity 120ms ease;

	&[data-enter] {
		opacity: 1;
	}
`;
