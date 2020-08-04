import { usePopoverState } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import React from 'react';

import { PopoverContext } from './Popover.Context';

function Popover({
	animated = true,
	animationDuration = 160,
	children,
	label,
	modal = true,
	placement,
	visible,
	...props
}) {
	const popover = usePopoverState({
		animated: animated ? animationDuration : undefined,
		modal,
		placement,
		visible,
		...props,
	});
	const uniqueId = `popover-${popover.baseId}`;
	const contextProps = {
		label: label || uniqueId,
		popover,
	};

	return (
		<PopoverContext.Provider value={contextProps}>
			{children}
		</PopoverContext.Provider>
	);
}

export default connect(Popover);
