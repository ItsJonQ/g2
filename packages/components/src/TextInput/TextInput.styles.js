import { css, get, styled } from '@wp-g2/styles';

export { scrollableScrollbar } from '../Scrollable/Scrollable.styles';

export const focus = css`
	border-color: ${get('colorAdmin')};
	z-index: 1;
`;

export const multiline = css`
	padding-left: 0;
	padding-right: 0;
`;

export const inputMultiline = css`
	padding-left: 8px;
	padding-right: 8px;
`;

export const InputView = styled.input`
	appearance: none;
	background: transparent;
	border: none;
	color: ${get('colorText')};
	display: block;
	font-size: ${get('fontSizeInputMobile')};
	line-height: 18px;
	min-height: calc(${get('controlHeight')} - 2px);
	outline: none;
	padding-bottom: calc((${get('controlHeight')} - 2px - 18px) / 2);
	padding-top: calc((${get('controlHeight')} - 2px - 18px) / 2);
	resize: none;
	width: 100%;

	@media (min-width: 36em) {
		font-size: ${get('fontSize')};
	}
`;

export const large = css`
	min-height: calc(${get('controlHeightLarge')} - 2px);
	padding-bottom: calc((${get('controlHeightLarge')} - 2px - 18px) / 2);
	padding-top: calc((${get('controlHeightLarge')} - 2px - 18px) / 2);
`;

export const small = css`
	min-height: calc(${get('controlHeightSmall')} - 2px);
	padding-bottom: calc((${get('controlHeightSmall')} - 2px - 18px) / 2);
	padding-top: calc((${get('controlHeightSmall')} - 2px - 18px) / 2);
`;

export const resizable = css`
	resize: vertical;
`;
