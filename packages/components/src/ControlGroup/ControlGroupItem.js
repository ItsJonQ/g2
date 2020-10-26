import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { FlexItem } from '../Flex';
import { useControlGroupContext } from './ControlGroup.Context';
import * as styles from './ControlGroupItem.styles';

function ControlGroupItem(props, forwardedRef) {
	const { className, ...otherProps } = useContextSystem(
		props,
		'ControlGroupItem',
	);

	const { isFirst, isOnly, isVertical } = useControlGroupContext();
	const withOffset = !isFirst && !isOnly;

	let offsetStyles;
	if (withOffset) {
		offsetStyles = isVertical ? styles.offsetVertical : styles.offset;
	}

	const classes = cx(styles.ControlGroupItem, offsetStyles, className);

	return <FlexItem {...otherProps} className={classes} ref={forwardedRef} />;
}

export default contextConnect(ControlGroupItem, 'ControlGroupItem');
