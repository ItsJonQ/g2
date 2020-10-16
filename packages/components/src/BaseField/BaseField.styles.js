import { css, ui } from '@wp-g2/styles';

export const BaseField = css`
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
	transition: border-color ${ui.get('transitionDurationFastest')} ease,
		box-shadow ${ui.get('transitionDurationFastest')} ease;
	width: 100%;

	&[disabled] {
		opacity: 0.6;
	}

	&:hover {
		border-color: ${ui.get('controlBorderColorHover')};
	}

	&:focus,
	&[data-focused='true'] {
		border-color: ${ui.color.admin};
		box-shadow: ${ui.get('controlBoxShadowFocus')};
		z-index: 1;
	}
`;

export const clickable = css`
	cursor: pointer;
`;

export const focus = css`
	border-color: ${ui.color.admin};
	box-shadow: ${ui.get('controlBoxShadowFocus')};
	z-index: 1;

	&:hover {
		border-color: ${ui.color.admin};
	}
`;

export const subtle = css`
	background-color: transparent;

	&:hover,
	&:active,
	&:focus,
	&[data-focused='true'] {
		${ui.background.control};
	}
`;
