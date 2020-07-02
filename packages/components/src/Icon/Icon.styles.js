import { css, styled, toPx } from '@g2/css';

const baseStyles = ({ size }) => css`
	display: block;
	user-select: none;
	height: ${toPx(size)};
	width: ${toPx(size)};
`;

export const IconWrapper = styled.BaseView`
	${baseStyles};
`;
