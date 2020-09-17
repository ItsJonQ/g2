import { css, ui } from '@wp-g2/styles';

import * as baseButtonStyles from '../BaseButton/BaseButton.styles';

export const Button = css`
	color: ${ui.get('colorAdmin')};
	font-weight: 600;
	padding-left: ${ui.get('controlPaddingXLarge')};
	padding-right: ${ui.get('controlPaddingXLarge')};

	&:active {
		color: ${ui.get('colorText')};
	}
`;

export const large = css`
	min-height: ${ui.get('controlHeightLarge')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightLarge')};
	}
`;

export const small = css`
	${ui.padding.x(ui.get('controlPaddingX'))};
	min-height: ${ui.get('controlHeightSmall')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightSmall')};
	}
`;

export const xSmall = css`
	${ui.padding.x(ui.get('controlPaddingXSmall'))};
	min-height: ${ui.get('controlHeightXSmall')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightXSmall')};
	}
`;

export const xxSmall = css`
	${ui.padding.x(ui.get('controlHeightXXSmall'))};
	min-height: ${ui.get('controlHeightXXSmall')};

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightXXSmall')};
	}
`;

export const half = css`
	min-height: calc(${ui.get('controlHeight')} / 2);

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeight')};
	}
`;

export const halfLarge = css`
	min-height: calc(${ui.get('controlHeightLarge')} / 2);

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightLarge')};
	}
`;

export const halfSmall = css`
	min-height: calc(${ui.get('controlHeightSmall')} / 2);

	&[data-icon='true'] {
		min-width: ${ui.get('controlHeightSmall')};
	}
`;

export const icon = css`
	${ui.padding(0)};
`;

export const primary = css`
	background-color: ${ui.get('colorAdmin')};
	color: ${ui.get('controlPrimaryTextColor')};

	&:active {
		color: ${ui.get('colorTextInverted')};
	}

	&:hover,
	&:focus {
		background-color: ${ui.get('colorAdmin')};
	}

	&:focus {
		border-color: ${ui.get('colorAdmin')};
	}

	&:active {
		background-color: ${ui.get('colorText')};
	}
`;

export const secondary = css`
	background-color: transparent;
	border-color: ${ui.get('colorAdmin')};
	color: ${ui.get('colorAdmin')};

	&:hover,
	&:active,
	&:focus {
		border-color: ${ui.get('colorAdmin')};
		color: ${ui.get('colorAdmin')};
	}

	&:active {
		border-color: ${ui.get('colorText')};
		color: ${ui.get('colorText')};
	}

	&[data-destructive='true'] {
		border-color: ${ui.get('colorDestructive')};
		color: ${ui.get('colorDestructive')};

		&:hover,
		&:active,
		&:focus {
			border-color: ${ui.get('colorDestructive')};
			color: ${ui.get('colorDestructive')};
		}

		&:active {
			color: ${ui.get('colorText')};
		}
	}
`;

export const tertiary = css`
	background-color: transparent;
	border-color: ${ui.get('controlBorderColor')};
`;

export const link = css`
	background: none;
	border-color: transparent;
	color: ${ui.get('colorAdmin')};

	&[data-destructive='true'] {
		color: ${ui.get('colorDestructive')};
	}
`;

export const plainLink = css`
	${ui.padding.x(0)};
	background: none;
	border-color: transparent;
	color: ${ui.get('colorAdmin')};

	&[data-destructive='true'] {
		color: ${ui.get('colorDestructive')};
	}

	&:hover,
	&:active,
	&:focus {
		background-color: transparent;
		text-decoration: underline;
	}
`;

export const subtle = baseButtonStyles.subtle;
export const control = baseButtonStyles.control;
export const subtleControl = baseButtonStyles.subtleControl;
export const currentColor = baseButtonStyles.currentColor;
