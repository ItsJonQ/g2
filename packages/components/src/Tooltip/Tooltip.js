import { TooltipReference, useTooltipState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { mergeRefs } from '@wp-g2/utils';
import React from 'react';

import { TooltipContext } from './Tooltip.Context';
import TooltipContent from './TooltipContent';

function Tooltip(props, forwardedRef) {
	const {
		animated = true,
		animationDuration = 160,
		baseId,
		children,
		content,
		focusable = true,
		gutter = 4,
		id,
		modal = true,
		placement,
		visible = false,
		...otherProps
	} = useContextSystem(props, 'Tooltip');

	const tooltip = useTooltipState({
		animated: animated ? animationDuration : undefined,
		baseId: baseId || id,
		gutter,
		placement,
		unstable_portal: modal,
		visible,
		...otherProps,
	});

	const contextProps = React.useMemo(
		() => ({
			tooltip,
		}),
		[tooltip],
	);

	const childRef = children?.ref;
	const refs = React.useMemo(() => {
		return mergeRefs([forwardedRef, childRef]);
	}, [childRef, forwardedRef]);

	return (
		<TooltipContext.Provider value={contextProps}>
			{content && <TooltipContent>{content}</TooltipContent>}
			{children && (
				<TooltipReference {...tooltip} {...children.props} ref={refs}>
					{(referenceProps) => {
						if (!focusable) {
							referenceProps.tabIndex = undefined;
						}
						return React.cloneElement(children, referenceProps);
					}}
				</TooltipReference>
			)}
		</TooltipContext.Provider>
	);
}

export default contextConnect(Tooltip, 'Tooltip');
