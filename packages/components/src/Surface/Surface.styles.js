import { css, get, styled } from '@wp-g2/styles';

export const SurfaceView = styled.div`
	background-color: ${get('surfaceColor')};
	color: ${get('colorText')};
	position: relative;
`;

export const background = css`
	background-color: ${get('surfaceBackgroundColor')};
`;
