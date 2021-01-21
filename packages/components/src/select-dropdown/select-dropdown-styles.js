import { css, ui } from '@wp-g2/styles';

import * as baseFieldStyles from '../BaseField/BaseField.styles';

export const SelectDropdown = css`
	position: relative;
`;

export const Popover = css`
	${ui.zIndex('Dropdown')};
	outline: none;
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
