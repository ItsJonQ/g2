import { connect } from '@g2/provider';
import React from 'react';
import { Popover } from 'reakit/Popover';

import { Card } from '../Card';
import { usePopoverContext } from './Popover.utils';
import { PopoverContentView } from './PopoverContent.styles';

function PopoverContent({
	children,
	elevation = 5,
	forwardedRef,
	maxWidth = 360,
	...props
}) {
	const { popover } = usePopoverContext();

	return (
		<Popover
			{...props}
			{...popover}
			__sx={{ maxWidth }}
			as={PopoverContentView}
		>
			<Card elevation={elevation} ref={forwardedRef}>
				{children}
			</Card>
		</Popover>
	);
}

export default connect(PopoverContent);
