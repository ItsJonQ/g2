import { connect } from '@wp-g2/provider';
import { css, cx } from '@wp-g2/styles';
import React from 'react';
import { Popover as ReakitPopover } from 'reakit/Popover';

import { Card } from '../Card';
import { usePopoverContext } from './Popover.Context';
import * as styles from './Popover.styles';

function PopoverContent({
	children,
	className,
	elevation = 5,
	forwardedRef,
	maxWidth = 360,
	...props
}) {
	const { label, popover } = usePopoverContext();
	const classes = cx([css({ maxWidth }), styles.PopoverContent, className]);

	return (
		<ReakitPopover
			aria-label={label}
			className={classes}
			{...props}
			{...popover}
		>
			<Card elevation={elevation} ref={forwardedRef}>
				{children}
			</Card>
		</ReakitPopover>
	);
}

export default connect(PopoverContent);
