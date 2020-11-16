import { css, ui } from '@wp-g2/styles';

import * as textInputStyles from '../TextInput/TextInput.styles';

export const UnitInputSelect = css`
	margin: 0 -2px 0 0 !important;
	overflow: hidden;
`;

export const UnitInputSelectUnit = css`
	${textInputStyles.inputFontSize};
	${ui.borderRadius.round};

	border: 1px solid transparent;
	border-radius: ${ui.get('controlBorderRadius')};
	color: ${ui.get('controlInnerControltextColor')};
	cursor: pointer;
	padding: 0 4px;
	position: relative;

	&:hover {
		background-color: ${ui.get('controlBackgroundColorHover')};
	}
`;

export const disabled = css`
	pointer-events: none;
`;

export const UnitInputSelectElement = css`
	appearance: none;
	border: none;
	cursor: pointer;
	height: 100%;
	left: 0;
	opacity: 0;
	position: absolute;
	top: 0;
	width: 100%;
`;

export const unitSelectFocused = css`
	background-color: ${ui.get('controlBackgroundColorHover')};
	border-color: ${ui.get('colorAdmin')};
`;
