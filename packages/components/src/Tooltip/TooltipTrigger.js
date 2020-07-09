import { connect } from '@wp-g2/provider';
import React from 'react';

import { useTooltipContext } from './Tooltip.utils';
import { TooltipTriggerView } from './TooltipTrigger.styles';

function TooltipTrigger({ as = 'span', forwardedRef, ...props }) {
	const { tooltip } = useTooltipContext();
	return (
		<TooltipTriggerView
			{...props}
			{...tooltip}
			as={as}
			ref={forwardedRef}
		/>
	);
}

export default connect(TooltipTrigger);
