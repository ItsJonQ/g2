import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React, { useMemo } from 'react';

import { usePopoverContext } from '../Popover';
import { Scrollable } from '../Scrollable';
import { View } from '../View';
import * as styles from './Card.styles';

function CardBody(props, forwardedRef) {
	const { className, scrollable = true, ...otherProps } = useContextSystem(
		props,
		'CardBody',
	);

	const { popover } = usePopoverContext();

	const classes = useMemo(
		() =>
			cx(
				styles.Body,
				styles.borderRadius,
				popover && styles.popoverBody,
				className,
			),
		[className, popover],
	);

	if (scrollable) {
		return (
			<Scrollable
				{...otherProps}
				className={classes}
				ref={forwardedRef}
			/>
		);
	}

	return <View {...otherProps} className={classes} ref={forwardedRef} />;
}

export default contextConnect(CardBody, 'CardBody');
