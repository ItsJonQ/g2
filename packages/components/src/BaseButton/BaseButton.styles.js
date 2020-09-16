import { css, get, space, ui } from '@wp-g2/styles';

export const Button = css`
	align-items: center;
	appearance: none;
	background-color: transparent;
	border-color: transparent;
	border-radius: ${get('controlBorderRadius')};
	border-style: solid;
	border-width: 1px;
	box-shadow: 0 0 0 2px transparent;
	color: ${get('colorText')};
	cursor: pointer;
	display: inline-flex;
	font-size: ${get('fontSize')};
	line-height: 1;
	min-height: ${get('controlHeight')};
	outline: none;
	padding-bottom: ${space(1)};
	padding-left: ${get('controlPaddingX')};
	padding-right: ${get('controlPaddingX')};
	padding-top: ${space(1)};
	position: relative;
	text-decoration: none;
	user-select: none;
	width: auto;

	&:hover,
	&:active,
	&:focus {
		transition: all ${get('transitionDuration')}
			cubic-bezier(0.12, 0.8, 0.32, 1);
	}

	&[disabled]:not([aria-busy='true']),
	&[aria-disabled='true']:not([aria-busy='true']) {
		cursor: auto;
		opacity: 0.5;
	}

	&:focus {
		box-shadow: ${get('controlBoxShadowFocus')};
		z-index: 1;
	}

	&[data-icon='true'] {
		min-width: ${get('controlHeight')};
	}

	svg {
		display: block;
	}
`;

export const destructive = css`
	color: ${get('colorDestructive')};
`;

export const block = css`
	display: flex;
	width: 100%;
`;

export const rounded = css`
	${ui.borderRadius.circle};
`;

export const large = css`
	min-height: ${get('controlHeightLarge')};

	&[data-icon='true'] {
		min-width: ${get('controlHeightLarge')};
	}
`;

export const small = css`
	min-height: ${get('controlHeightSmall')};
	padding-bottom: ${space(0.5)};
	padding-left: ${get('controlPaddingXSmall')};
	padding-right: ${get('controlPaddingXSmall')};
	padding-top: ${space(0.5)};

	&[data-icon='true'] {
		min-width: ${get('controlPaddingXSmall')};
	}
`;

export const xSmall = css`
	min-height: ${get('controlHeightXSmall')};
	padding-bottom: ${space(0.5)};
	padding-left: ${get('controlPaddingXXSmall')};
	padding-right: ${get('controlPaddingXXSmall')};
	padding-top: ${space(0.5)};

	&[data-icon='true'] {
		min-width: ${get('controlHeightXXSmall')};
	}
`;

export const xxSmall = css`
	min-height: ${get('controlHeightXXSmall')};
	padding-bottom: 0;
	padding-left: 0;
	padding-right: 0;
	padding-top: 0;

	&[data-icon='true'] {
		min-width: ${get('controlHeightXXSmall')};
	}
`;

export const icon = css`
	padding-left: 0;
	padding-right: 0;
`;

export const loading = css`
	opacity: 0;
`;

export const Content = css`
	font-size: ${get('fontSize')};
	/* line-height: 0; */
	opacity: 1;
	white-space: nowrap;
`;

export const PrefixSuffix = css`
	opacity: 1;

	svg {
		display: block;
		user-select: none;
	}
`;

export const LoadingOverlay = css`
	bottom: 0;
	left: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
`;

export const control = css`
	background-color: ${get('controlBackgroundColor')};
	border: 1px solid ${get('controlBorderColor')};
	color: ${get('colorText')};
	font-family: ${get('fontFamily')};
	font-size: ${get('fontSize')};

	&:hover,
	&:active,
	&:focus {
		color: ${get('colorText')};
	}

	&:focus {
		border-color: ${get('colorAdmin')};
		box-shadow: ${get('controlBoxShadowFocus')};
		z-index: 1;
	}
`;

export const subtleControl = css`
	background-color: transparent;

	&:hover,
	&:active,
	&:focus {
		background-color: ${get('controlBackgroundColor')};
	}
`;

export const narrow = css`
	padding-left: ${get('controlPaddingX')};
	padding-right: ${get('controlPaddingX')};
`;

export const currentColor = css`
	color: currentColor;

	&:hover,
	&:focus {
		color: currentColor;
	}
`;
