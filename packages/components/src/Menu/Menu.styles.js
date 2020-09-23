import { css, highContrastMode, ui } from '@wp-g2/styles';

export const Menu = css`
	outline: none;
	padding: 0;
`;

export const MenuItem = css`
	${ui.font.color.text};
	${ui.font.size()};
	border-color: transparent;
	cursor: pointer;
	outline: none;
	position: relative;
	text-decoration: none;
	transition: background ${ui.get('transitionDurationFastest')} linear;
	width: 100%;

	a:hover > &,
	&:hover {
		background: ${ui.get('controlBackgroundBrightColor')};
	}

	a:focus > &,
	&:focus {
		${ui.zIndex('ControlFocus')};
		background: ${ui.get('controlBackgroundColor')};
		border-color: ${ui.color.admin};
		box-shadow: ${ui.get('controlBoxShadowFocus')};
	}

	a:active > &,
	&:active {
		background: ${ui.get('controlBackgroundColor')};
	}

	&.is-active,
	&[aria-current='page'],
	&[aria-selected='true'] {
		background-color: ${ui.get('surfaceBackgroundSubtleColor')};
		color: ${ui.color.text};

		&:active {
			color: ${ui.color.textInverted};
		}

		&:hover,
		&:focus {
			background-color: ${ui.get('surfaceBackgroundSubtleColor')};
		}

		&:focus {
			border-color: ${ui.get('surfaceBackgroundSubtleColor')};
		}

		&:active {
			background-color: ${ui.color.text};
		}
	}

	${highContrastMode`
		&:hover,
		&:focus {
			border-color: ${ui.get('controlBorderColor')};
		}
	`}
`;

export const offset = css`
	${ui.margin.x(-2)};
	${ui.margin.y(-1)};
	${ui.padding.y(2)};
	min-height: calc(${ui.get('controlHeight')} + ${ui.space(1)});
	width: calc(100% + ${ui.space(4)});
`;

export const showArrow = css`
	${ui.padding.right(1)};
`;

export const showBackArrow = css`
	${ui.padding.left(1)};
`;
