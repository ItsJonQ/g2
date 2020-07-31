import { css, get, styled } from '@wp-g2/styles';

export const BaseFieldView = styled.div`
	background-color: ${get('controlBackgroundColor')};
	border: 1px solid ${get('controlBorderColor')};
	border-radius: ${get('controlBorderRadius')};
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

	&:focus {
		border-color: ${get('colorAdmin')};
		box-shadow: ${get('controlBoxShadowFocus')};
		z-index: 1;
	}
`;

export const focus = css`
	border-color: ${get('colorAdmin')};
	box-shadow: ${get('controlBoxShadowFocus')};
	z-index: 1;
`;
