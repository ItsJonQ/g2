import {
	connectAndForwardRefComponent,
	useContextSystem,
} from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Subheading.styles';

function Subheading(componentProps, forwardedRef) {
	const { className, ...props } = useContextSystem(
		componentProps,
		'Subheading',
	);
	const classes = cx([styles.uppercase, className]);

	return (
		<Text
			className={classes}
			size={10}
			variant="muted"
			weight={600}
			{...props}
			ref={forwardedRef}
		/>
	);
}

export default connectAndForwardRefComponent(Subheading, 'Subheading');
