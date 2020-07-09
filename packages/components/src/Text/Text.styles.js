import { css, styled } from '@wp-g2/css';

const baseStyles = ({ isBlock, theme }) => {
	const { config } = theme;
	const { isDark } = config;

	return css`
		color: ${config.colorText};

		${isDark &&
		css`
			color: ${theme.colorTextDark};
		`}

		${isBlock &&
		css`
			display: block;
		`}
	`;
};

const modifierStyles = ({ align, display, lineHeight, size, weight }) =>
	css({
		display,
		fontSize: size,
		fontWeight: weight,
		lineHeight,
		textAlign: align,
	});

const variantStyles = ({ variant }) => {
	switch (variant) {
		case 'muted':
			return css({ opacity: 0.5 });
		default:
			return '';
	}
};

export const TextView = styled.span`
	${baseStyles};
	${modifierStyles};
	${variantStyles};
`;
