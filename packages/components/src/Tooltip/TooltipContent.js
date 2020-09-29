import { Tooltip as ReakitTooltip } from '@wp-g2/a11y';
import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import { useTooltipContext } from './Tooltip.Context';
import * as styles from './Tooltip.styles';

const { TooltipPopoverView } = styles;

function TooltipContent(props, forwardedRef) {
	const { children, className, ...otherProps } = useContextSystem(
		props,
		'TooltipContent',
	);
	const { tooltip } = useTooltipContext();
	const classes = cx(styles.TooltipContent, className);

	return (
		<ReakitTooltip
			as={View}
			{...otherProps}
			{...tooltip}
			className={classes}
			ref={forwardedRef}
		>
			<TooltipPopoverView>{children}</TooltipPopoverView>
		</ReakitTooltip>
	);
}

export default contextConnect(TooltipContent, 'TooltipContent');
