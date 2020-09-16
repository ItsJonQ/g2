import { css, get, space } from '@wp-g2/styles';

export const Menu = css`
	outline: none;
	padding: 0;
`;

export const MenuItem = css`
	border: none;
	color: ${get('colorText')};
	cursor: pointer;
	font-size: ${get('fontSize')};
	outline: none;
	position: relative;
	text-decoration: none;
	transition: background ${get('transitionDurationFastest')} linear;
	width: 100%;

	a:hover > &,
	&:hover {
		background: ${get('controlBackgroundBrightColor')};
		box-shadow: none;
	}

	a:focus > &,
	&:focus {
		background: ${get('controlBackgroundColor')};
		box-shadow: none;
	}

	a:active > &,
	&:active {
		background: ${get('controlBackgroundColor')};
	}

	&.is-active,
	&[aria-current='page'] {
		background-color: ${get('surfaceBackgroundSubtleColor')};
		color: ${get('colorText')};

		&:active {
			color: ${get('colorTextInverted')};
		}

		&:hover,
		&:focus {
			background-color: ${get('surfaceBackgroundSubtleColor')};
		}

		&:focus {
			border-color: ${get('surfaceBackgroundSubtleColor')};
		}

		&:active {
			background-color: ${get('colorText')};
		}
	}
`;

export const offset = css`
	margin-bottom: ${space(-1)};
	margin-left: ${space(-2)};
	margin-right: ${space(-2)};
	margin-top: ${space(-1)};
	min-height: calc(${get('controlHeight')} + ${space(1)});
	padding-bottom: ${space(2)};
	padding-top: ${space(2)};
	width: calc(100% + ${space(4)});
`;

export const showArrow = css`
	padding-right: ${space(1)};
`;

export const showBackArrow = css`
	padding-left: ${space(1)};
`;
