import { css } from '@wp-g2/styles';

export const CollapsibleContent = css`
	display: block !important;
	overflow: hidden;
	will-change: height;
`;

export const innerContent = css`
	position: relative;
`;

export const CollapsibleTrigger = css`
	&:active {
		user-select: none;
	}
`;
