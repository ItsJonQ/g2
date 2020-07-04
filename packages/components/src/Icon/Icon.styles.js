import { css, styled, toPx } from '@g2/css';

const baseStyles = ({ size }) => css`
	display: block;
	height: ${toPx(size)};
	user-select: none;
	width: ${toPx(size)};
`;

export const IconWrapper = styled.div`
	${baseStyles};
`;
