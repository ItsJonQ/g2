import { css, styled } from '@wp-g2/styled-components';
import { get } from '@wp-g2/styles';
import { MenuItem } from 'reakit/Menu';

const baseStyles = ({ theme }) => {
	return css`
		appearance: none;
		background: none;
		border: none;
		border-radius: 6px;
		color: ${get('colorText')};
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
			background: ${get('controlBackgroundColor')};
			box-shadow: none;
		}

		&:active {
			background: ${get('controlBackgroundDimColor')};
		}
	`;
};

export const MenuItemView = styled(MenuItem)`
	${baseStyles};
`;
