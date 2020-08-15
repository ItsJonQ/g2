import { css, get, styled, ui } from '@wp-g2/styles';

export const BaseFieldView = styled.div`
	${ui.background.control};
	${ui.borderRadius.round};
	border: 1px solid ${get('controlBorderColor')};
	display: flex;
	flex: 1;
	font-family: ${get('fontFamily')};
	font-size: ${get('fontSize')};
	outline: none;
	padding-left: 8px;
	padding-right: 8px;
	position: relative;
	transition: all ${get('transitionDurationFastest')} ease;
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
