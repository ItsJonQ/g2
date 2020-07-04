import { connect } from '@g2/provider';
import React from 'react';

import { useTooltipContext } from './Tooltip.utils';
import {
	TooltipContentView,
	TooltipPopoverView,
} from './TooltipContent.styles';

function TooltipContent({ children, forwardedRef, ...props }) {
	const { tooltip } = useTooltipContext();

	return (
		<TooltipContentView {...props} {...tooltip} ref={forwardedRef}>
			<TooltipPopoverView>{children}</TooltipPopoverView>
		</TooltipContentView>
	);
}

export default connect(TooltipContent);
