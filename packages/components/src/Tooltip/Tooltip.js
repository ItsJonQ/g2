import { TooltipReference, useTooltipState } from '@wp-g2/a11y';
import { connect } from '@wp-g2/context';
import React from 'react';

import { TooltipContext } from './Tooltip.Context';
import TooltipContent from './TooltipContent';

function Tooltip({
	animated = true,
	animationDuration = 160,
	baseId,
	children,
	content,
	gutter = 4,
	id,
	modal = true,
	placement,
	visible = false,
	...props
}) {
	const tooltip = useTooltipState({
		animated: animated ? animationDuration : undefined,
		baseId: baseId || id,
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
			{content && <TooltipContent>{content}</TooltipContent>}
			{children && (
				<TooltipReference
					{...tooltip}
					ref={children.ref}
					{...children.props}
				>
					{(referenceProps) =>
						React.cloneElement(children, referenceProps)
					}
				</TooltipReference>
			)}
		</TooltipContext.Provider>
	);
}

export default connect(Tooltip, 'Tooltip');
