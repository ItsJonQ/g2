import { css } from '@wp-g2/styles';

export const CollapsibleContent = css`
	display: block !important;
	overflow: hidden;
	transform: translateZ(0);
	will-change: height;
`;

export const innerContent = css`
	position: relative;
	transform: translateZ(0);
`;

export const CollapsibleTrigger = css`
	transform: translateZ(0);

	&:active {
		user-select: none;
	}
`;
