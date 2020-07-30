import { css, get } from '@wp-g2/styles';

export const Button = css`
	align-items: center;
	appearance: none;
	background-color: transparent;
	border-color: transparent;
	border-radius: ${get('controlBorderRadius')};
	border-style: solid;
	border-width: 1px;
	box-shadow: 0 0 0 2px transparent;
	color: ${get('colorAdmin')};
	cursor: pointer;
	display: inline-flex;
	font-weight: 600;
	height: ${get('controlHeight')};
	line-height: ${get('controlHeight')};
	outline: none;
	padding-left: ${get('controlPaddingXLarge')};
	padding-right: ${get('controlPaddingXLarge')};
	position: relative;
	text-decoration: none;
	user-select: none;
	width: auto;

	&:active {
		color: ${get('colorText')};
	}

	&:hover,
	&:active,
	&:focus {
		transition: all ${get('transitionDuration')}
			cubic-bezier(0.12, 0.8, 0.32, 1);
	}

	&[disabled],
	&[aria-disabled='true'] {
		cursor: auto;
		opacity: 0.5;
	}

	&:focus {
		box-shadow: 0 0 0 2px ${get('controlBackgroundDimColor')};
		z-index: 1;
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
	border-radius: 9999px;
`;

export const large = css`
	height: ${get('controlHeightLarge')};
	line-height: ${get('controlHeightLarge')};
`;

export const small = css`
	height: ${get('controlHeightSmall')};
	line-height: ${get('controlHeightSmall')};
`;

export const primary = css`
	background-color: ${get('colorAdmin')};
	color: ${get('controlPrimaryTextColor')};

	&:active {
		color: ${get('colorTextInverted')};
	}

	&:hover,
	&:focus {
		background-color: ${get('colorAdmin')};
	}

	&:focus {
		border-color: ${get('colorAdmin')};
	}

	&:active {
		background-color: ${get('colorText')};
	}
`;

export const secondary = css`
	background-color: transparent;
	border-color: ${get('colorAdmin')};
	color: ${get('colorAdmin')};

	&:hover,
	&:active,
	&:focus {
		border-color: ${get('colorAdmin')};
		color: ${get('colorAdmin')};
	}

	&:active {
		border-color: ${get('colorText')};
		color: ${get('colorText')};
	}

	&[data-destructive='true'] {
		border-color: ${get('colorDestructive')};
		color: ${get('colorDestructive')};

		&:hover,
		&:active,
		&:focus {
			border-color: ${get('colorDestructive')};
			color: ${get('colorDestructive')};
		}

		&:active {
			color: ${get('colorText')};
		}
	}
`;

export const tertiary = css`
	background-color: transparent;
`;

export const link = css`
	background: none;
	border-color: transparent;
	color: ${get('colorAdmin')};

	&[data-destructive='true'] {
		color: ${get('colorDestructive')};
	}
`;

export const subtle = css`
	border-color: transparent;

	&:focus {
		border-color: transparent;
	}
`;

export const plainLink = css`
	background: none;
	border-color: transparent;
	color: ${get('colorAdmin')};
	padding-left: 0;
	padding-right: 0;

	&[data-destructive='true'] {
		color: ${get('colorDestructive')};
	}

	&:hover,
	&:active,
	&:focus {
		background-color: transparent;
		text-decoration: underline;
	}
`;

export const loading = css`
	opacity: 0;
`;

export const Content = css`
	font-size: ${get('fontSize')};
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

export const CaretWrapper = css`
	margin-left: -8px;
	margin-right: -8px;
`;

export const LoadingOverlay = css`
	bottom: 0;
	left: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
`;
