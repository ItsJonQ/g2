import { styled } from '@g2/css';

export const CollapsibleContentView = styled.div`
	display: block !important;
	overflow: hidden;
	transition: height 160ms ease, opacity 160ms ease;
	transform: translateZ(0);
	will-change: height;
`;

export const InnerContentView = styled.div`
	position: relative;
	transform: translateZ(0);
`;
