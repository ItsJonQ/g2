import { css, get } from '@wp-g2/styles';

export const Button = css`
	color: ${get('colorAdmin')};
	font-weight: 600;
	padding-left: ${get('controlPaddingXLarge')};
	padding-right: ${get('controlPaddingXLarge')};

	&:active {
		color: ${get('colorText')};
	}
`;

export const large = css`
	min-height: ${get('controlHeightLarge')};

	&[data-icon='true'] {
		min-width: ${get('controlHeightLarge')};
	}
`;

export const small = css`
	min-height: ${get('controlHeightSmall')};
	padding-left: ${get('controlPaddingX')};
	padding-right: ${get('controlPaddingX')};

	&[data-icon='true'] {
		min-width: ${get('controlHeightSmall')};
	}
`;

export const xSmall = css`
	min-height: ${get('controlHeightXSmall')};
	padding-left: ${get('controlPaddingXSmall')};
	padding-right: ${get('controlPaddingXSmall')};

	&[data-icon='true'] {
		min-width: ${get('controlHeightXSmall')};
	}
`;

export const xxSmall = css`
	min-height: ${get('controlHeightXXSmall')};
	padding-left: 0;
	padding-right: 0;

	&[data-icon='true'] {
		min-width: ${get('controlHeightXXSmall')};
	}
`;

export const half = css`
	min-height: calc(${get('controlHeight')} / 2);

	&[data-icon='true'] {
		min-width: ${get('controlHeight')};
	}
`;

export const halfLarge = css`
	min-height: calc(${get('controlHeightLarge')} / 2);

	&[data-icon='true'] {
		min-width: ${get('controlHeightLarge')};
	}
`;

export const halfSmall = css`
	min-height: calc(${get('controlHeightSmall')} / 2);

	&[data-icon='true'] {
		min-width: ${get('controlHeightSmall')};
	}
`;

export const icon = css`
	padding-left: 0;
	padding-right: 0;
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
	border-color: ${get('controlBorderColor')};
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
	color: ${get('colorText')};

	&:hover,
	&:active,
	&:focus {
		border-color: transparent;
		color: ${get('colorText')};
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
