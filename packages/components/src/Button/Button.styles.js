import { css, styled } from '@g2/css';

import { FlexItem } from '../Flex';

const baseStyles = ({ isDestructive, theme }) => {
	const { config } = theme;
	const { isDark } = config;
	const buttonTransition = `all ${config.buttonTransitionDuration}
    ${config.buttonTransitionTimingFunction}`;

	return css`
		align-items: center;
		appearance: none;
		background-color: ${config.buttonBackgroundColor};
		border-radius: ${config.buttonBorderRadius};
		border-color: transparent;
		border-style: solid;
		border-width: ${config.buttonBorderWidth};
		box-shadow: ${config.buttonBoxShadow};
		color: ${config.colorText};
		cursor: pointer;
		display: inline-flex;
		font-weight: ${config.buttonFontWeight};
		height: ${config.buttonHeight};
		line-height: ${config.buttonHeight};
		outline: none;
		padding-left: ${config.buttonPaddingX};
		padding-right: ${config.buttonPaddingX};
		position: relative;
		transform: ${config.buttonTransform};
		text-decoration: none;
		user-select: none;
		width: auto;

		&:hover,
		&:focus {
			background-color: ${config.buttonBackgroundColorHover};
		}

		&:active {
			background-color: ${config.buttonBackgroundColorActive};
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

		svg {
			display: block;
		}

		${isDark &&
		css`
			background-color: ${config.buttonBackgroundColorDark};
			color: ${config.colorTextDark};

			&:hover,
			&:focus {
				background-color: ${config.buttonBackgroundColorHoverDark};
			}

			&:active {
				background-color: ${config.buttonBackgroundColorActiveDark};
			}

			${isDestructive &&
			css`
				color: ${config.colorDestructive};
			`}
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

const primaryStyles = ({ isDestructive, isOutline, theme }) => {
	const { config } = theme;

	return css`
		background-color: ${config.buttonBackgroundColorPrimary};
		color: ${config.buttonTextColorPrimary};

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

		${isOutline &&
		css`
			background-color: transparent;
			border-color: ${config.buttonBackgroundColorPrimary};
			color: ${config.buttonBackgroundColorPrimary};

			&:hover,
			&:active,
			&:focus {
				color: ${config.buttonTextColorPrimary};
			}
		`}
	`;
};

const secondaryStyles = ({ isDestructive, isOutline, theme }) => {
	if (!isOutline) return '';

	const { config } = theme;
	const { isDark } = config;

	return css`
		background-color: transparent;
		border-color: ${config.buttonBorderColorOutline};

		${isDark &&
		`
			border-color: ${config.buttonBorderColorOutlineDark};
		`}

		&:hover,
		&:active,
		&:focus {
			border-color: transparent;
		}

		${isDestructive &&
		`
			color: ${config.colorDestructive};
			border-color: ${config.colorDestructive};
		`}
	`;
};

const tertiaryStyles = () => {
	return css`
		background-color: transparent;
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

export const ButtonView = styled.BaseView`
	${baseStyles};
	${blockStyles};
	${variantStyles};
	${roundedStyles};
	${sizeStyles};
`;

const contentStyles = ({ theme }) => {
	const { config } = theme;

	return css`
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

export const ContentView = styled(FlexItem)`
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
	const { space } = theme?.utils;
	return css`
		margin-right: ${space(-1.5)};
	`;
};

export const CaretWrapperView = styled(FlexItem)`
	${caretWrapperStyles};
	${loadingStyles};
`;
