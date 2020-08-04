import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { FlexItem } from '../Flex';
import { useControlGroupContext } from './ControlGroup.Context';
import * as styles from './ControlGroupItem.styles';

function ControlGroupItem({ className, ...props }) {
	const { isFirst, isOnly, isVertical } = useControlGroupContext();
	const withOffset = !isFirst && !isOnly;

	let offsetStyles;
	if (withOffset) {
		offsetStyles = isVertical ? styles.offsetVertical : styles.offset;
	}

	const classes = cx([offsetStyles, className]);

	return <FlexItem {...props} className={classes} />;
}

export default connect(ControlGroupItem, 'ControlGroupItem');
