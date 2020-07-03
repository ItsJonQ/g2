import { styled } from '@g2/css';

export const CollapsibleContentView = styled.div`
	contain: content;
	display: block !important;
	overflow: hidden;
	transition: height 300ms linear;
	transform: translateZ(0);
	will-change: height;
`;

export const InnerContentView = styled.div`
	contain: content;
`;
