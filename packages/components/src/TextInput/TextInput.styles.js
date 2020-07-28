import { css, get, styled } from '@wp-g2/styles';

export { scrollableScrollbar } from '../Scrollable/Scrollable.styles';

export const Root = css`
	background-color: ${get('controlBackgroundColor')};
	border: 1px solid transparent;
	border-color: transparent;
	border-radius: 4px;
	display: flex;
	flex: 1;
	font-family: ${get('fontFamily')};
	font-size: ${get('fontSize')};
	outline: none;
	padding-left: 8px;
	padding-right: 8px;
	position: relative;
	transition: all 100ms ease;
	width: 100%;

	&[disabled] {
		opacity: 0.6;
	}
`;

export const first = css`
	border-bottom-right-radius: 0;
	border-top-right-radius: 0;
`;

export const middle = css`
	border-radius: 0;
`;

export const last = css`
	border-bottom-left-radius: 0;
	border-top-left-radius: 0;
`;

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
	background: transparent;
	border: none;
	color: ${get('colorText')};
	display: block;
	line-height: 18px;
	min-height: calc(36px - 2px);
	outline: none;
	padding-bottom: calc(8px - 1px);
	padding-top: calc(8px - 1px);
	resize: none;
	width: 100%;
`;

export const large = css`
	min-height: 38px;
	padding-bottom: 10px;
	padding-top: 10px;
`;

export const small = css`
	min-height: 28px;
	padding-bottom: 4px;
	padding-top: 4px;
`;

export const resizable = css`
	resize: vertical;
`;
