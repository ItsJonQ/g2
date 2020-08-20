import { css, get } from '@wp-g2/styles';

export const Menu = css`
	outline: none;
	padding: 0;
`;

export const MenuItem = css`
	appearance: none;
	background: none;
	border: none;
	border-radius: 6px;
	color: ${get('colorText')};
	cursor: pointer;
	display: block;
	outline: none;
	padding: 8px 12px;
	position: relative;
	text-align: left;
	text-decoration: none;
	transition: background ${get('transitionDurationFastest')} linear;
	width: 100%;

	&:hover,
	&:focus {
		background: ${get('controlBackgroundColor')};
		box-shadow: none;
	}

	&:active {
		background: ${get('controlBackgroundDimColor')};
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

export const showArrow = css`
	padding-right: 32px;
`;

export const showBackArrow = css`
	padding-left: 28px;
`;
