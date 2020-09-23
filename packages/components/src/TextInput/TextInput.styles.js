import { css, styled, ui } from '@wp-g2/styles';

export { scrollableScrollbar } from '../Scrollable/Scrollable.styles';

export const focus = css`
	border-color: ${ui.color.admin};
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
	color: ${ui.color.text};
	display: block;
	font-size: ${ui.get('fontSizeInputMobile')};
	line-height: 18px;
	min-height: calc(${ui.get('controlHeight')} - 2px);
	outline: none;
	padding-bottom: calc((${ui.get('controlHeight')} - 2px - 18px) / 2);
	padding-top: calc((${ui.get('controlHeight')} - 2px - 18px) / 2);
	resize: none;
	width: 100%;

	@media (min-width: 36em) {
		font-size: ${ui.get('fontSize')};
	}
`;

export const large = css`
	min-height: calc(${ui.get('controlHeightLarge')} - 2px);
	padding-bottom: calc((${ui.get('controlHeightLarge')} - 2px - 18px) / 2);
	padding-top: calc((${ui.get('controlHeightLarge')} - 2px - 18px) / 2);
`;

export const small = css`
	min-height: calc(${ui.get('controlHeightSmall')} - 2px);
	padding-bottom: calc((${ui.get('controlHeightSmall')} - 2px - 18px) / 2);
	padding-top: calc((${ui.get('controlHeightSmall')} - 2px - 18px) / 2);
`;

export const resizable = css`
	resize: vertical;
`;
