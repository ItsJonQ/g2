import { css, ui } from '@wp-g2/styles';

import * as baseButtonStyles from '../BaseButton/BaseButton.styles';

export const Button = css`
	color: ${ui.color.admin};
	font-weight: 600;
	padding-left: ${ui.get('controlPaddingXLarge')};
	padding-right: ${ui.get('controlPaddingXLarge')};

	&:active {
		color: ${ui.color.text};
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
	background-color: ${ui.color.admin};
	color: ${ui.get('controlPrimaryTextColor')};

	&:active {
		color: ${ui.color.textInverted};
	}

	&:hover,
	&:focus {
		background-color: ${ui.color.admin};
	}

	&:focus {
		border-color: ${ui.color.admin};
	}

	&:active {
		background-color: ${ui.color.text};
	}
`;

export const secondary = css`
	background-color: transparent;
	border-color: ${ui.color.admin};
	color: ${ui.color.admin};

	&:hover,
	&:active,
	&:focus {
		border-color: ${ui.color.admin};
		color: ${ui.color.admin};
	}

	&:active {
		border-color: ${ui.color.text};
		color: ${ui.color.text};
	}

	&[data-destructive='true'] {
		border-color: ${ui.color.destructive};
		color: ${ui.color.destructive};

		&:hover,
		&:active,
		&:focus {
			border-color: ${ui.color.destructive};
			color: ${ui.color.destructive};
		}

		&:active {
			color: ${ui.color.text};
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
	color: ${ui.color.admin};

	&[data-destructive='true'] {
		color: ${ui.color.destructive};
	}
`;

export const plainLink = css`
	${ui.padding.x(0)};
	background: none;
	border-color: transparent;
	color: ${ui.color.admin};

	&[data-destructive='true'] {
		color: ${ui.color.destructive};
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
