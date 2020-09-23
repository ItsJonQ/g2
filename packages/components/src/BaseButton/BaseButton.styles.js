import { css, ui } from '@wp-g2/styles';

export const Button = css`
	align-items: center;
	appearance: none;
	background-color: transparent;
	border-color: transparent;
	border-radius: ${ui.get('controlBorderRadius')};
	border-style: solid;
	border-width: 1px;
	box-shadow: 0 0 0 2px transparent;
	color: ${ui.color.text};
	cursor: pointer;
	display: inline-flex;
	font-size: ${ui.get('fontSize')};
	line-height: 1;
	min-height: ${ui.get('controlHeight')};
	outline: none;
	padding-bottom: ${ui.space(1)};
	padding-left: ${ui.get('controlPaddingX')};
	padding-right: ${ui.get('controlPaddingX')};
	padding-top: ${ui.space(1)};
	position: relative;
	text-decoration: none;
	user-select: none;
	width: auto;

	&:hover,
	&:active,
	&:focus {
		transition: all ${ui.get('transitionDuration')}
			cubic-bezier(0.12, 0.8, 0.32, 1);
	}

	&[disabled]:not([aria-busy='true']),
	&[aria-disabled='true']:not([aria-busy='true']) {
		${ui.opacity.muted};
		cursor: auto;
	}

	&:focus {
		${ui.zIndex('ControlFocus')};
		box-shadow: ${ui.get('controlBoxShadowFocus')};
	}

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeight')};
	}

	svg {
		display: block;
	}
`;

export const destructive = css`
	color: ${ui.get('colorDestructive')};
`;

export const block = css`
	display: flex;
	width: 100%;
`;

export const rounded = css`
	${ui.borderRadius.circle};
`;

export const large = css`
	min-height: ${ui.get('controlHeightLarge')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightLarge')};
	}
`;

export const small = css`
	${ui.padding.y(ui.space(0.5))};
	${ui.padding.x(ui.get('controlPaddingXSmall'))};
	min-height: ${ui.get('controlHeightSmall')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlPaddingXSmall')};
	}
`;

export const xSmall = css`
	${ui.padding.y(ui.space(0.5))};
	${ui.padding.x(ui.get('controlPaddingXXSmall'))};
	min-height: ${ui.get('controlHeightXSmall')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightXXSmall')};
	}
`;

export const xxSmall = css`
	${ui.padding(0)};
	min-height: ${ui.get('controlHeightXXSmall')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightXXSmall')};
	}
`;

export const icon = css`
	${ui.padding.x(0)};
`;

export const loading = css`
	opacity: 0;
`;

export const Content = css`
	font-size: ${ui.get('fontSize')};
	/* line-height: 0; */
	opacity: 1;
`;

export const noWrap = css`
	white-space: nowrap;
`;

export const PrefixSuffix = css`
	opacity: 1;

	svg {
		display: block;
		user-select: none;
	}
`;

export const CaretWrapper = css`
	margin-right: ${ui.space(-2)};
`;

export const LoadingOverlay = css`
	bottom: 0;
	left: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
`;

export const subtle = css`
	border-color: ${ui.get('controlBorderColorSubtle')};
	color: ${ui.color.text};

	&:hover,
	&:active,
	&:focus {
		border-color: ${ui.get('controlBorderColorSubtle')};
		color: ${ui.color.text};
	}
`;

export const control = css`
	background-color: ${ui.get('controlBackgroundColor')};
	border: 1px solid ${ui.get('controlBorderColor')};
	color: ${ui.color.text};
	font-family: ${ui.get('fontFamily')};
	font-size: ${ui.get('fontSize')};

	&:hover,
	&:active,
	&:focus {
		color: ${ui.color.text};
	}

	&:focus {
		border-color: ${ui.color.admin};
		box-shadow: ${ui.get('controlBoxShadowFocus')};
		z-index: 1;
	}
`;

export const subtleControl = css`
	background-color: transparent;

	&:hover,
	&:active,
	&:focus {
		background-color: ${ui.get('controlBackgroundColor')};
	}
`;

export const narrow = css`
	padding-left: ${ui.get('controlPaddingX')};
	padding-right: ${ui.get('controlPaddingX')};
`;

export const currentColor = css`
	color: currentColor;

	&:hover,
	&:focus {
		color: currentColor;
	}
`;
