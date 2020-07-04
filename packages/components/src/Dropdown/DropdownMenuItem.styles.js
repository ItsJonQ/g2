import { css, styled, themeCss } from '@g2/css';
import { MenuItem } from 'reakit/Menu';

const baseStyles = ({ theme }) => {
	return css`
		appearance: none;
		background: none;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		display: block;
		outline: none;
		text-align: left;
		text-decoration: none;
		width: 100%;

		&:focus {
			background: #f6f6f6;
		}

		&:active {
			background: #eee;
		}

		${themeCss({
			px: 3,
			py: 2,
		})(theme)}
	`;
};

export const DropdownMenuItemView = styled.div`
	${baseStyles};
`.withComponent(MenuItem);
