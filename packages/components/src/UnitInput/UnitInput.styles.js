import { css, ui } from '@wp-g2/styles';

import * as textInputStyles from '../TextInput/TextInput.styles';

export const UnitInputSelect = css`
	${textInputStyles.Input};
	left: 8px;
	margin: 0 !important;
	overflow: hidden;
	position: absolute;
	top: 0;
`;

export const UnitInputSelectValue = css`
	${textInputStyles.inputFontSize};
	opacity: 0;
	pointer-events: none;
`;

export const UnitInputSelectUnit = css`
	${textInputStyles.inputFontSize};
	${ui.borderRadius.round};

	color: ${ui.get('colorAdmin')};
	cursor: pointer;
	position: relative;
	text-decoration-color: ${ui.get('colorAdmin')};
	text-decoration-line: underline;
	text-decoration-style: solid;
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
