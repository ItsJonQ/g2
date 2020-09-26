import { PopoverDisclosure, usePopoverState } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { noop, useUpdateEffect } from '@wp-g2/utils';
import React, { useCallback } from 'react';

import { PopoverContext } from './Popover.Context';
import PopoverContent from './PopoverContent';

function Popover(props, forwardedRef) {
	const {
		animated = true,
		animationDuration = 160,
		baseId,
		children,
		elevation = 5,
		id,
		label,
		maxWidth = 360,
		modal = true,
		onVisibleChange = noop,
		placement,
		trigger,
		visible,
		...otherProps
	} = useContextSystem(props, 'Popover');

	const popover = usePopoverState({
		animated: animated ? animationDuration : undefined,
		baseId: baseId || id,
		modal,
		placement,
		visible,
		...otherProps,
	});

	const uniqueId = `popover-${popover.baseId}`;
	const labelId = label || uniqueId;

	const contextProps = React.useMemo(
		() => ({
			label: labelId,
			popover,
		}),
		[labelId, popover],
	);

	const triggerContent = useCallback(
		(triggerProps) => {
			return React.cloneElement(trigger, triggerProps);
		},
		[trigger],
	);

	useUpdateEffect(() => {
		onVisibleChange(popover.visible);
	}, [popover.visible]);

	return (
		<PopoverContext.Provider value={contextProps}>
			{trigger && (
				<PopoverDisclosure
					{...popover}
					ref={trigger.ref}
					{...trigger.props}
				>
					{triggerContent}
				</PopoverDisclosure>
			)}
			<PopoverContent
				ref={forwardedRef}
				{...otherProps}
				elevation={elevation}
				maxWidth={maxWidth}
			>
				{children}
			</PopoverContent>
		</PopoverContext.Provider>
	);
}

export default contextConnect(Popover, 'Popover');
