import { css, get, styled } from '@wp-g2/styles';

export const ColorPickerButtonView = styled.button`
	appearance: none;
	background-color: ${get('controlBackgroundColor')};
	border: 1px solid transparent;
	border-radius: 3px;
	cursor: pointer;
	display: block;
	height: ${get('controlHeight')};
	padding: 3px;
	width: 100%;

	&:focus {
		border-color: ${get('colorAdmin')};
		outline: none;
	}
`;

export const large = css`
	height: ${get('controlHeightLarge')};
`;

export const small = css`
	height: ${get('controlHeightSmall')};
`;
