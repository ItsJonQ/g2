import { css, ui } from '@wp-g2/styles';

export const BaseField = css`
	${ui.background.control};
	${ui.borderRadius.round};
	border: 1px solid;
	border-color: ${ui.get('controlBorderColor')};
	box-shadow: ${ui.get('controlBoxShadow')};
	display: flex;
	flex: 1;
	font-family: ${ui.get('fontFamily')};
	font-size: ${ui.get('fontSize')};
	outline: none;
	padding: 0 8px;
	position: relative;
	transition: border-color ${ui.get('transitionDurationFastest')} ease;
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
	}
`;

export const clickable = css`
	cursor: pointer;
`;

export const focus = css`
	border-color: ${ui.color.admin};
	box-shadow: ${ui.get('controlBoxShadowFocus')};

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

export const error = css`
	border-color: ${ui.get('controlDestructiveBorderColor')};

	&:hover,
	&:active {
		border-color: ${ui.get('controlDestructiveBorderColor')};
	}

	&:focus,
	&[data-focused='true'] {
		border-color: ${ui.get('controlDestructiveBorderColorFocus')};
		box-shadow: ${ui.get('controlDestructiveBoxShadowFocus')};
	}
`;

export const errorFocus = css`
	border-color: ${ui.get('controlDestructiveBorderColorFocus')};
	box-shadow: ${ui.get('controlDestructiveBoxShadowFocus')};

	&:hover {
		border-color: ${ui.get('controlDestructiveBorderColorFocus')};
	}
`;

export const inline = css`
	display: inline-flex;
	vertical-align: baseline;
	width: auto;

	${ui.browsers.safari(`
			vertical-align: middle;
	`)}
`;
