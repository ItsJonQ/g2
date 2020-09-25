import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Subheading.styles';

function Subheading(props, forwardedRef) {
	const { className, ...otherProps } = useContextSystem(props, 'Subheading');

	const classes = cx([styles.uppercase, className]);

	return (
		<Text
			className={classes}
			size={10}
			variant="muted"
			weight={600}
			{...otherProps}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(Subheading, 'Subheading');
