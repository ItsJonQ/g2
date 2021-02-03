import { css, ui } from '@wp-g2/styles';

import * as baseFieldStyles from '../BaseField/BaseField.styles';

export const SelectDropdown = css`
	position: relative;
`;

export const Popover = css`
	${ui.zIndex('Dropdown')};
	opacity: 1;
	outline: none;
	transition: 40ms opacity linear;
	transition-delay: 20ms; // Allows for the popover to reposition without being seen.
`;

export const popoverHidden = css`
	opacity: 0;
`;

export const MenuWrapper = css`
	outline: none;
`;

export const DropdownMenu = css`
	width: 100%;
`;

export const hidden = css`
	display: none;
`;

export const inline = baseFieldStyles.inline;
