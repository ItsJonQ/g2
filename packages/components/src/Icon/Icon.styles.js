import { css, styled, toPx } from '@wp-g2/css';

const baseStyles = ({ size }) => css`
	display: block;
	height: ${toPx(size)};
	user-select: none;
	width: ${toPx(size)};

	svg {
		display: block;
	}
`;

export const IconWrapper = styled.div`
	${baseStyles};
`;
