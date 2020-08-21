import { connect } from '@wp-g2/context';
import React from 'react';

import { usePopoverContext } from '../Popover';
import { Scrollable } from '../Scrollable';
import * as styles from './Card.styles';

function CardBody({ className, ...props }) {
	const { popover } = usePopoverContext();
	const cx = [
		styles.Body,
		styles.borderRadius,
		popover && styles.popoverBody,
		className,
	];

	return <Scrollable {...props} className={cx} />;
}

export default connect(CardBody, 'CardBody');
