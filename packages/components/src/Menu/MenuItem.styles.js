import { css, styled } from '@wp-g2/styled';
import { MenuItem } from 'reakit/Menu';

const baseStyles = ({ theme }) => {
	const { config } = theme;
	const { isDark } = config;

	return css`
		appearance: none;
		background: none;
		border: none;
		border-radius: 6px;
		color: ${config.colorText};
		cursor: pointer;
		display: block;
		outline: none;
		text-align: left;
		text-decoration: none;
		width: 100%;

		${theme.sx({
			px: 3,
			py: 2,
		})}

		&:focus {
			background: ${config.menuHoverBackgroundColor};
		}
		&:active {
			background: ${config.menuActiveBackgroundColor};
		}

		${isDark &&
		css`
			color: ${config.colorTextDark};
			&:focus {
				background: ${config.menuHoverBackgroundColorDark};
			}
			&:active {
				background: ${config.menuActiveBackgroundColorDark};
			}
		`}
	`;
};

export const MenuItemView = styled(MenuItem)`
	${baseStyles};
`;
