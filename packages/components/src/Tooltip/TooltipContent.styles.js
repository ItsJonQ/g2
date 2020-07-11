import { styled } from '@wp-g2/styled';
import { Tooltip } from 'reakit/Tooltip';

export const TooltipContentView = styled(Tooltip)`
	opacity: 0;
	opacity: 0;
	outline: none;
	transform-origin: top center;
	transition: opacity 120ms ease;

	&[data-enter] {
		opacity: 1;
	}
`;

export const TooltipPopoverView = styled.div`
	background: rgba(0, 0, 0, 0.8);
	border-radius: 6px;
	box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04);
	color: white;
	padding: 4px 8px;
`;
