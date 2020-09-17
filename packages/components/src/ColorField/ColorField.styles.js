import { css, styled, ui } from '@wp-g2/styles';

export const ColorPickerButtonView = styled.button`
	appearance: none;
	background-color: ${ui.get('controlBackgroundColor')};
	border: 1px solid ${ui.get('controlBorderColor')};
	border-radius: ${ui.get('controlBorderRadius')};
	cursor: pointer;
	display: block;
	height: ${ui.get('controlHeight')};
	padding: 3px;
	width: 100%;

	&:focus {
		border-color: ${ui.get('colorAdmin')};
		box-shadow: ${ui.get('controlBoxShadowFocus')};
		outline: none;
		z-index: 1;
	}
`;

export const large = css`
	height: ${ui.get('controlHeightLarge')};
`;

export const small = css`
	height: ${ui.get('controlHeightSmall')};
`;
