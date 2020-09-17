import { css, styled, ui } from '@wp-g2/styles';

export const BaseFieldView = styled.div`
	${ui.background.control};
	${ui.borderRadius.round};
	border: 1px solid ${ui.get('controlBorderColor')};
	display: flex;
	flex: 1;
	font-family: ${ui.get('fontFamily')};
	font-size: ${ui.get('fontSize')};
	outline: none;
	padding-left: 8px;
	padding-right: 8px;
	position: relative;
	transition: all ${ui.get('transitionDurationFastest')} ease;
	width: 100%;

	&[disabled] {
		opacity: 0.6;
	}

	&:hover {
		border-color: ${ui.get('controlBorderColorHover')};
	}

	&:focus {
		border-color: ${ui.get('colorAdmin')};
		box-shadow: ${ui.get('controlBoxShadowFocus')};
		z-index: 1;
	}
`;

export const clickable = css`
	cursor: pointer;
`;

export const focus = css`
	border-color: ${ui.get('colorAdmin')};
	box-shadow: ${ui.get('controlBoxShadowFocus')};
	z-index: 1;

	&:hover {
		border-color: ${ui.get('colorAdmin')};
	}
`;

export const subtle = css`
	background-color: transparent;

	&:hover,
	&:active,
	&:focus {
		${ui.background.control};
	}
`;
