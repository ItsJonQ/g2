import { styled, toPx } from '@wp-g2/styles';

export const ElevationView = styled.div`
	background: transparent;
	display: block;
	margin: 0 !important;
	pointer-events: none;
	position: absolute;
	will-change: box-shadow;
`;

export function getBoxShadow(value) {
	const boxShadowColor = `rgba(0 ,0, 0, ${value / 20})`;
	const boxShadow = `0 ${toPx(value)} ${toPx(value * 2)} 0
	${boxShadowColor}`;

	return boxShadow;
}
