import { css, ui } from '@wp-g2/styles';

import * as baseFieldStyles from '../BaseField/BaseField.styles';

export const SelectDropdown = css`
	position: relative;
`;

export const MenuWrapper = css`
	${ui.zIndex('Dropdown')};
	outline: none;
`;

export const DropdownMenu = css`
	width: 100%;
`;

export const inline = baseFieldStyles.inline;
