import { connect } from '@wp-g2/context';
import React from 'react';

import { usePopoverContext } from '../Popover';
import { Scrollable } from '../Scrollable';
import { View } from '../View';
import * as styles from './Card.styles';

function CardBody({ className, scrollable = true, ...props }) {
	const { popover } = usePopoverContext();
	const cx = [
		styles.Body,
		styles.borderRadius,
		popover && styles.popoverBody,
		className,
	];

	if (scrollable) {
		return <Scrollable {...props} className={cx} />;
	}

	return <View {...props} className={cx} />;
}

export default connect(CardBody, 'CardBody');
