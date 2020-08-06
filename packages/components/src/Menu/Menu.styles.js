import { css, get } from '@wp-g2/styles';

export const Menu = css`
	outline: none;
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

	.is-active > & {
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
	}
`;
