import { css, styled } from '@wp-g2/css';
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

		${theme.sx({
			px: 3,
			py: 2,
		})}
	`;
};

export const DropdownMenuItemView = styled(MenuItem)`
	${baseStyles};
`;
