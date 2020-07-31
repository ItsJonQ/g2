import { css, get, styled } from '@wp-g2/styles';

export const ColorPickerButtonView = styled.button`
	appearance: none;
	background-color: ${get('controlBackgroundColor')};
	border: 1px solid ${get('controlBorderColor')};
	border-radius: ${get('controlBorderRadius')};
	cursor: pointer;
	display: block;
	height: ${get('controlHeight')};
	padding: 3px;
	width: 100%;

	&:focus {
		border-color: ${get('colorAdmin')};
		box-shadow: 0 0 0 2px ${get('controlBackgroundDimColor')};
		outline: none;
		z-index: 1;
	}
`;

export const large = css`
	height: ${get('controlHeightLarge')};
`;

export const small = css`
	height: ${get('controlHeightSmall')};
`;
