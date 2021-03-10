import { css, styled, ui } from '@wp-g2/styles';

export const AspectRatioView = styled.div`
	max-width: 100%;
	position: relative;
	width: 100%;
`;

export const content = css`
	height: 100%;
	${ui.start(0)}
	position: absolute;
	top: 0;
	width: 100%;
`;

export const AspectRatioResizer = styled.div`
	height: 0;
	pointer-events: none;
`;
