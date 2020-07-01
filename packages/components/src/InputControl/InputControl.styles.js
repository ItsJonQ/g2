import { styled, css, getTheme } from '@g2/css';
import { BaseView } from '../BaseView';
import { Flex } from '../Flex';

const baseStyles = ({ isFocused, isRounded, isSeamless, theme }) => {
	const { config } = getTheme(theme);

	const hoverStyles =
		!isFocused &&
		!isSeamless &&
		css`
			&:hover {
				background-color: ${config.inputBackgroundColorHover};
				border-color: ${config.inputBackgroundColorHover};
			}
		`;

	return css`
		background-color: ${config.inputBackgroundColor};
		border-radius: ${isRounded
			? config.inputBorderRadiusRound
			: config.inputBorderRadius};
		border-width: ${config.inputBorderWidth};
		border-style: ${config.inputBorderStyle};
		border-color: ${config.inputBorderColor};
		box-shadow: ${config.inputBoxShadow};
		color: ${config.colorText};
		display: flex;
		flex: 1;
		font-family: ${config.inputFontFamily};
		font-size: ${config.inputFontSize};
		outline: none;
		padding-left: ${config.inputPaddingX};
		padding-right: ${config.inputPaddingX};
		position: relative;
		transition: ${config.inputTransition};
		width: 100%;

		${hoverStyles};

		&:active,
		&:focus {
			border-color: ${config.inputBorderColorFocus};
			box-shadow: ${config.inputBoxShadowFocus};
		}

		&[disabled] {
			opacity: 0.6;
		}
	`;
};

const focusStyles = ({ isFocused, theme }) => {
	if (!isFocused) return '';
	const { config } = getTheme(theme);

	return css`
		border-color: ${config.inputBorderColorFocus};
		box-shadow: ${config.inputBoxShadowFocus};
	`;
};

const seamlessStyles = ({ isSeamless, theme }) => {
	if (!isSeamless) return '';
	const { config } = getTheme(theme);
	const { isDark } = config;

	return css`
		background-color: transparent;
		border-color: transparent;
		&:active {
			border-color: ${isDark
				? config.controlBorderColorDark
				: config.controlBorderColor};
			box-shadow: none;
		}
	`;
};

const focusSeamlessStyles = ({ isSeamless, isFocused, theme }) => {
	if (!isSeamless && !isFocused) return '';
	const { config } = getTheme(theme);
	const { isDark } = config;

	return css`
		border-color: ${isDark
			? config.controlBorderColorDark
			: config.controlBorderColor};
		box-shadow: none;
	`;
};

const darkStyles = ({ isFocused, isSeamless, theme }) => {
	const { config } = getTheme(theme);
	const { isDark } = config;

	if (!isDark) return;

	const hoverStyles =
		!isFocused &&
		!isSeamless &&
		css`
			&:hover {
				background-color: ${config.inputBackgroundColorHoverDark};
				border-color: ${config.inputBackgroundColorHoverDark};
			}
		`;

	return css`
		background-color: ${config.inputBackgroundColorDark};
		border-color: ${config.inputBorderColorDark};
		color: ${config.colorTextDark};
		${hoverStyles}
	`;
};

export const RootView = styled(Flex)`
	${baseStyles};
	${focusStyles};
	${seamlessStyles};
	${focusSeamlessStyles};
	${darkStyles};
`;

const sizeStyles = ({ size, theme }) => {
	const { config } = getTheme(theme);
	switch (size) {
		case 'large':
			return css`
				min-height: ${config.inputHeightLarge};
				padding-bottom: ${config.inputPaddingLarge};
				padding-top: ${config.inputPaddingLarge};
			`;

		case 'small':
			return css`
				min-height: ${config.inputHeightSmall};
				padding-bottom: ${config.inputPaddingSmall};
				padding-top: ${config.inputPaddingSmall};
			`;

		default:
			return '';
	}
};

const inputStyles = ({ theme }) => {
	const { config } = getTheme(theme);

	return css`
		background: transparent;
		border: none;
		color: currentColor;
		display: block;
		line-height: ${config.inputLineHeight};
		min-height: ${config.inputHeight};
		outline: none;
		padding-bottom: ${config.inputPadding};
		padding-top: ${config.inputPadding};
		width: 100%;
	`;
};

export const InputView = styled(BaseView)`
	${inputStyles};
	${sizeStyles};
`;
