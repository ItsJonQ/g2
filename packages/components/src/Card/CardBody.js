import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { usePopoverContext } from '../Popover';
import { Scrollable } from '../Scrollable';
import { View } from '../View';
import * as styles from './Card.styles';

function CardBody({ className, scrollable = true, ...props }) {
	const { popover } = usePopoverContext();
	const classes = cx([
		styles.Body,
		styles.borderRadius,
		popover && styles.popoverBody,
		className,
	]);

	if (scrollable) {
		return <Scrollable {...props} className={classes} />;
	}

	return <View {...props} className={classes} />;
}

export default connect(CardBody, 'CardBody');
