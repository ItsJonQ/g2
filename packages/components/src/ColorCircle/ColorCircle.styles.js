import { css, styled, ui } from '@wp-g2/styles';

export const ColorCircleView = styled.div`
	${ui.borderRadius.circle};
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1) inset;
	outline: none;
`;

export const medium = css`
	height: 24px;
	width: 24px;
`;

export const small = css`
	height: 20px;
	width: 20px;
`;
