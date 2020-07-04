import { connect } from '@g2/provider';
import React from 'react';

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
	const { label, popover } = usePopoverContext();

	return (
		<PopoverContentView
			aria-label={label}
			{...props}
			{...popover}
			sx={{ maxWidth }}
		>
			<Card elevation={elevation} ref={forwardedRef}>
				{children}
			</Card>
		</PopoverContentView>
	);
}

export default connect(PopoverContent);
