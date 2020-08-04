import { connect } from '@wp-g2/provider';
import React from 'react';
import { useTooltipState } from 'reakit/Tooltip';

import { TooltipContext } from './Tooltip.Context';

function Tooltip({
	animated = true,
	animationDuration = 160,
	children,
	gutter = 4,
	modal = true,
	placement,
	visible,
	...props
}) {
	const tooltip = useTooltipState({
		animated: animated ? animationDuration : undefined,
		gutter,
		placement,
		unstable_portal: modal,
		visible,
		...props,
	});
	const contextProps = {
		tooltip,
	};
	return (
		<TooltipContext.Provider value={contextProps}>
			{children}
		</TooltipContext.Provider>
	);
}

export default connect(Tooltip);
