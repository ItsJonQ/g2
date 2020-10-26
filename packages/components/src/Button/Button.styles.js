import { css, ui } from '@wp-g2/styles';

import * as baseButtonStyles from '../BaseButton/BaseButton.styles';

export const Button = css`
	color: ${ui.get('buttonTextColor')};
	font-weight: 600;
	padding-left: ${ui.get('controlPaddingXLarge')};
	padding-right: ${ui.get('controlPaddingXLarge')};

	&:active {
		color: ${ui.get('buttonTextColorActive')};
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
	background-color: ${ui.get('buttonPrimaryColor')};
	color: ${ui.get('buttonPrimaryTextColor')};

	&:active {
		color: ${ui.get('buttonPrimaryTextColorActive')};
	}

	&:hover {
		background-color: ${ui.get('buttonPrimaryColorHover')};
		border-color: ${ui.get('buttonPrimaryBorderColorHover')};
	}

	&:focus,
	&[data-focused='true'] {
		background-color: ${ui.get('buttonPrimaryColorFocus')};
		border-color: ${ui.get('buttonPrimaryBorderColorFocus')};
	}

	&:active {
		background-color: ${ui.get('buttonPrimaryColorActive')};
		border-color: ${ui.get('buttonPrimaryBorderColorActive')};
	}

	&[data-destructive='true'] {
		background-color: ${ui.color.destructive};

		&:hover,
		&:focus,
		&[data-focused='true'] {
			background-color: ${ui.color.destructive};
		}

		&:focus,
		&[data-focused='true'] {
			background-color: ${ui.color.destructive};
			border-color: ${ui.color.destructive};
		}

		&:active {
			background-color: ${ui.color.text};
		}
	}
`;

export const secondary = css`
	background-color: ${ui.get('buttonSecondaryColor')};
	border-color: ${ui.get('buttonSecondaryBorderColor')};
	color: ${ui.get('buttonSecondaryTextColor')};

	&:hover {
		background-color: ${ui.get('buttonSecondaryColorHover')};
		border-color: ${ui.get('buttonSecondaryBorderColorHover')};
	}

	&:focus,
	&[data-focused='true'] {
		background-color: ${ui.get('buttonSecondaryColorFocus')};
		border-color: ${ui.get('buttonSecondaryBorderColorFocus')};
		color: ${ui.get('buttonSecondaryTextColorFocus')};
	}

	&:active {
		background-color: ${ui.get('buttonSecondaryColorActive')};
		border-color: ${ui.get('buttonSecondaryBorderColorActive')};
		color: ${ui.get('buttonSecondaryTextColorActive')};
	}

	&[data-destructive='true'] {
		border-color: ${ui.color.destructive};
		color: ${ui.color.destructive};

		&:hover,
		&:active,
		&:focus,
		&[data-focused='true'] {
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

	&[data-destructive='true'] {
		color: ${ui.color.destructive};

		&:active {
			color: ${ui.color.text};
		}
	}
`;

export const link = css`
	background: none;
	border-color: transparent;
	color: ${ui.get('linkColor')};

	&:active {
		color: ${ui.get('linkColorActive')};
	}

	&[data-destructive='true'] {
		color: ${ui.color.destructive};

		&:active {
			color: ${ui.color.text};
		}
	}
`;

export const plainLink = css`
	${ui.padding.x(0)};
	background: none;
	border-color: transparent;
	color: ${ui.get('linkColor')};

	&:hover,
	&:active,
	&:focus,
	&[data-focused='true'] {
		background-color: transparent;
		text-decoration: underline;
	}

	&:active {
		color: ${ui.get('linkColorActive')};
	}

	&[data-destructive='true'] {
		color: ${ui.color.destructive};

		&:active {
			color: ${ui.color.text};
		}
	}
`;

export const subtle = baseButtonStyles.subtle;
export const control = baseButtonStyles.control;
export const subtleControl = baseButtonStyles.subtleControl;
export const currentColor = baseButtonStyles.currentColor;
