import { connect } from '@wp-g2/provider';
import { cx } from '@wp-g2/styles';
import React from 'react';
import { Tooltip as ReakitTooltip } from 'reakit/Tooltip';

import { View } from '../View';
import * as styles from './Tooltip.styles';
import { useTooltipContext } from './Tooltip.utils';

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
