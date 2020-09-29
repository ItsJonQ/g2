import { Popover as ReakitPopover } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { Card } from '../Card';
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

	return (
		<ReakitPopover
			aria-label={label}
			className={classes}
			{...otherProps}
			{...popover}
		>
			{(popover.visible || popover.animating) && (
				<Card elevation={elevation} ref={forwardedRef}>
					{children}
				</Card>
			)}
		</ReakitPopover>
	);
}

export default contextConnect(PopoverContent, 'PopoverContent');
