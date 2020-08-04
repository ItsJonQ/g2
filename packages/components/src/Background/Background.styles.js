import { get, styled } from '@wp-g2/styles';

export const BackgroundView = styled.div`
	position: relative;
`;

export const ContentView = styled.div`
	position: relative;
	z-index: 1;
`;

export const TintView = styled.div`
	background: ${get('surfaceBackgroundTintColor')};
	bottom: 0;
	left: 0;
	pointer-events: none;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 0;
`;
