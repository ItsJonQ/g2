import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';
import { Popover as ReakitPopover } from 'reakit';

import { Card } from '../Card';
import { View } from '../View';
import { usePopoverContext } from './Popover.Context';
import * as styles from './Popover.styles';

function PopoverContent(props, forwardedRef) {
	const {
		children,
		className,
		elevation = 5,
		maxWidth = 360,
		...otherProps
	} = useContextSystem(props, 'PopoverContent');

	const { label, popover } = usePopoverContext();
	const classes = cx(styles.PopoverContent, css({ maxWidth }), className);

	const showContent = popover.visible || popover.animating;

	return (
		<ReakitPopover
			aria-label={label}
			as={View}
			className={classes}
			{...otherProps}
			{...popover}
		>
			{showContent && (
				<Card elevation={elevation} ref={forwardedRef}>
					{children}
				</Card>
			)}
		</ReakitPopover>
	);
}

export default contextConnect(PopoverContent, 'PopoverContent');
