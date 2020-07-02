import { css, styled } from '@g2/css';
import { BaseView } from '@g2/css';

const baseStyles = ({ theme }) => {
	const { config } = theme;
	const { isDark } = config;

	return css`
		color: ${config.colorText};

		${isDark &&
		css`
			color: ${theme.colorTextDark};
		`}
	`;
};

const modifierStyles = ({ display, size, weight, lineHeight, align }) =>
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
			return css({ opacity: 0.6 });
		default:
			return '';
	}
};

export const TextView = styled(BaseView)`
	${baseStyles};
	${modifierStyles};
	${variantStyles};
`;
