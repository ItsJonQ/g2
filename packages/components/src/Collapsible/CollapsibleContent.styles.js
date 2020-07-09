import { styled } from '@wp-g2/css';

export const CollapsibleContentView = styled.div`
	display: block !important;
	overflow: hidden;
	transform: translateZ(0);
	transition: height 160ms ease, opacity 160ms ease;
	will-change: height;
`;

export const InnerContentView = styled.div`
	position: relative;
	transform: translateZ(0);
`;
