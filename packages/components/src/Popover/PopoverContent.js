import { Popover as ReakitPopover } from '@wp-g2/a11y';
import { connect } from '@wp-g2/provider';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { Card } from '../Card';
import { usePopoverContext } from './Popover.Context';
import * as styles from './Popover.styles';

const { PopoverContentView } = styles;

function PopoverContent({
	children,
	className,
	elevation = 5,
	forwardedRef,
	maxWidth = 360,
	...props
}) {
	const { label, popover } = usePopoverContext();
	const classes = cx([css({ maxWidth }), className]);

	return (
		<ReakitPopover
			aria-label={label}
			as={PopoverContentView}
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
