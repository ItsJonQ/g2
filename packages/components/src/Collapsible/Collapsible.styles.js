import { css, styled } from '@wp-g2/styles';

export const CollapsibleContent = css`
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

export const CollapsibleTrigger = css`
	transform: translateZ(0);

	&:active {
		user-select: none;
	}
`;
