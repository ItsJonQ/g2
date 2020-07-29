import { css, styled } from '@wp-g2/styled-components';
import { get } from '@wp-g2/styles';

import { FlexBlock, FlexItem } from '../Flex';

const baseStyles = ({ isDestructive, theme }) => {
	const { config, isDark } = theme;
	const buttonTransition = `all ${config.buttonTransitionDuration}
	${config.buttonTransitionTimingFunction}`;

	return css`
		align-items: center;
		appearance: none;
		background-color: ${config.buttonBackgroundColor};
		border-color: transparent;
		border-radius: ${config.buttonBorderRadius};
		border-style: solid;
		border-width: ${config.buttonBorderWidth};
		box-shadow: ${config.buttonBoxShadow};
		color: ${config.buttonTextColor};
		cursor: pointer;
		display: inline-flex;
		font-weight: ${config.buttonFontWeight};
		height: ${config.buttonHeight};
		line-height: ${config.buttonHeight};
		outline: none;
		padding-left: ${config.buttonPaddingX};
		padding-right: ${config.buttonPaddingX};
		position: relative;
		text-decoration: none;
		transform: ${config.buttonTransform};
		user-select: none;
		width: auto;

		&:active {
			color: ${config.buttonTextColorActive};
			transform: ${config.buttonTransformActive};
			transform-origin: center center;
		}

		&:hover,
		&:active,
		&:focus {
			transition: ${buttonTransition};
		}

		&[disabled],
		&[aria-disabled='true'] {
			cursor: auto;
			opacity: 0.5;
		}

		&:focus {
			box-shadow: ${config.buttonBoxShadowFocus};
			z-index: 1;
		}

		svg {
			display: block;
		}

		${isDark &&
		css`
			&:active {
				color: ${config.buttonTextColorActiveDark};
			}
		`}

		${isDestructive &&
		css`
			color: ${config.colorDestructive};
		`}
	`;
};

const blockStyles = ({ isBlock }) => {
	if (!isBlock) return;

	return css`
		display: flex;
		width: 100%;

		&:active {
			transform: scale(1);
		}
	`;
};

const roundedStyles = ({ isRounded, theme }) => {
	if (!isRounded) return '';

	const { config } = theme;

	return css`
		border-radius: ${config.buttonBorderRadiusRound};
	`;
};

const sizeStyles = ({ size, theme }) => {
	const { config } = theme;

	switch (size) {
		case 'large':
			return css`
				height: ${config.buttonHeightLarge};
				line-height: ${config.buttonHeightLarge};
			`;

		case 'small':
			return css`
				height: ${config.buttonHeightSmall};
				line-height: ${config.buttonHeightSmall};
			`;

		default:
			return '';
	}
};

const primaryStyles = ({ isDestructive, theme }) => {
	const { config, isDark } = theme;

	return css`
		background-color: ${config.buttonBackgroundColorPrimary};
		color: ${config.buttonTextColorPrimary};

		&:hover,
		&:focus,
		&:active {
			color: ${config.buttonTextColorPrimary};
		}

		&:hover,
		&:focus {
			background-color: ${config.buttonBackgroundColorPrimaryHover};
		}

		&:focus {
			border-color: ${config.buttonBorderColorFocus};
			box-shadow: ${config.buttonBoxShadowFocus};
		}

		&:active {
			background-color: ${config.buttonBackgroundColorPrimaryActive};
		}

		${isDark &&
		css`
			&:active {
				background-color: ${config.buttonTextColorActiveDark};
				color: ${config.buttonTextColorPrimaryDark};
			}
		`}

		${isDestructive &&
		css`
			background-color: ${config.colorDestructive};

			&:hover,
			&:focus {
				background-color: ${config.colorDestructiveHover};
			}

			&:focus {
				border-color: ${config.buttonBorderColorFocus};
				box-shadow: ${config.buttonBoxShadowDestructiveFocus};
			}

			&:active {
				background-color: ${config.colorDestructiveActive};
			}
		`}
	`;
};

const secondaryStyles = ({ isDestructive, isSubtle, theme }) => {
	const { config, isDark } = theme;

	return css`
		background-color: transparent;
		border-color: ${config.buttonBackgroundColorPrimary};
		color: ${config.buttonBackgroundColorPrimary};

		&:hover,
		&:active,
		&:focus {
			border-color: ${config.buttonBackgroundColorPrimaryHover};
			color: ${config.buttonBackgroundColorPrimaryHover};
		}

		&:active {
			border-color: ${config.buttonTextColorActive};
			color: ${config.buttonTextColorActive};
		}

		${
			isDark &&
			css`
				&:active {
					border-color: ${config.buttonTextColorActiveDark};
					color: ${config.buttonTextColorActiveDark};
				}
			`
		}

		${
			isSubtle &&
			css`
				border-color: ${config.buttonBorderColorOutline};

				&:hover {
					border-color: ${config.buttonBorderColorOutlineHover};
				}

				${isDark &&
				css`
					border-color: ${config.buttonBorderColorOutlineDark};

					&:hover {
						border-color: ${config.buttonBorderColorOutlineDark};
					}
				`}
			`
		}

		${
			isDestructive &&
			css`
				border-color: ${config.colorDestructive};
				color: ${config.colorDestructive};

				&:hover,
				&:active,
				&:focus {
					border-color: ${config.colorDestructive};
					color: ${config.colorDestructive};
				}

				&:focus {
					box-shadow: ${config.buttonBoxShadowDestructiveFocus};
				}

				&:active {
					color: ${config.buttonTextColorActive};
				}

				${isDark &&
				css`
					&:active {
						color: ${config.buttonTextColorActiveDark};
					}
				`}
			`
		}
	`;
};

const tertiaryStyles = ({ isDestructive, theme }) => {
	const { config, isDark } = theme;

	return css`
		background-color: transparent;

		${isDark &&
		css`
			&:active {
				color: ${config.buttonTextColorActiveDark};
			}
		`}

		${isDestructive &&
		css`
			&:focus {
				box-shadow: ${config.buttonBoxShadowDestructiveFocus};
			}

			&:focus,
			&:active {
				border-color: ${config.colorDestructive};
			}
		`}
	`;
};

const linkStyles = ({ isDestructive, theme }) => {
	const { config } = theme;

	return css`
		background: none;
		border-color: transparent;
		color: ${config.buttonBackgroundColorPrimary};

		${isDestructive &&
		css`
			color: ${config.colorDestructive};
		`}
	`;
};

const plainLinkStyles = (props) => css`
	${linkStyles(props)};

	padding-left: 0;
	padding-right: 0;

	&:hover,
	&:active,
	&:focus {
		background-color: transparent;
		text-decoration: underline;
	}
`;

const variantStyles = ({ variant, ...props }) => {
	switch (variant) {
		case 'primary':
			return primaryStyles(props);
		case 'secondary':
			return secondaryStyles(props);
		case 'tertiary':
			return tertiaryStyles(props);
		case 'link':
			return linkStyles(props);
		case 'plain-link':
			return plainLinkStyles(props);
		default:
			return '';
	}
};

const controlGroupStyles = ({ isFirst, isLast, isMiddle }) => {
	if (isFirst) {
		return css`
			border-bottom-right-radius: 0;
			border-top-right-radius: 0;
		`;
	}
	if (isMiddle) {
		return css`
			border-radius: 0;
		`;
	}
	if (isLast) {
		return css`
			border-bottom-left-radius: 0;
			border-top-left-radius: 0;
		`;
	}
};

export const ButtonView = styled.button`
	${baseStyles};
	${blockStyles};
	${variantStyles};
	${roundedStyles};
	${sizeStyles};
	${controlGroupStyles};
`;

export const ButtonLinkView = styled.a`
	${baseStyles};
	${blockStyles};
	${variantStyles};
	${roundedStyles};
	${sizeStyles};
`;

const contentStyles = ({ theme }) => {
	const { config } = theme;

	return css`
		font-size: ${get('fontSize')};
		line-height: ${config.buttonContentLineHeight};
		min-height: ${config.buttonLineHeight};
		white-space: nowrap;
	`;
};

const loadingStyles = ({ isLoading }) => css`
	opacity: 1;

	${isLoading &&
	`
    opacity: 0;
`}
`;

export const ContentView = styled(FlexBlock)`
	${contentStyles};
	${loadingStyles};
`;

const prefixSuffixStyles = ({ theme }) => {
	const { config } = theme;

	return css`
		line-height: ${config.inputLineHeight};

		svg {
			display: block;
			user-select: none;
		}
	`;
};

export const PrefixSuffixView = styled(FlexItem)`
	${prefixSuffixStyles};
	${loadingStyles};
`;

const caretWrapperStyles = ({ theme }) => {
	return theme.sx({ mr: -2 });
};

export const CaretWrapperView = styled(FlexItem)`
	${caretWrapperStyles};
	${loadingStyles};
`;
