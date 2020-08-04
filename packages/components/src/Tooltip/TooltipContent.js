import { Tooltip as ReakitTooltip } from '@wp-g2/a11y';
import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import { useTooltipContext } from './Tooltip.Context';
import * as styles from './Tooltip.styles';

const { TooltipPopoverView } = styles;

function TooltipContent({ children, className, forwardedRef, ...props }) {
	const { tooltip } = useTooltipContext();
	const classes = cx([styles.TooltipContent, className]);

	return (
		<ReakitTooltip
			as={View}
			{...props}
			{...tooltip}
			className={classes}
			ref={forwardedRef}
		>
			<TooltipPopoverView>{children}</TooltipPopoverView>
		</ReakitTooltip>
	);
}

export default connect(TooltipContent);
