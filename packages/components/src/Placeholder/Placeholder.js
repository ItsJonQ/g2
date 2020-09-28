import { contextConnect, useContextSystem } from '@wp-g2/context';
import { View } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Placeholder.styles';

function Placeholder(props, forwardedRef) {
	const { height = 36, width, ...otherProps } = useContextSystem(
		props,
		'Placeholder',
	);

	return (
		<View
			style={{ height, width }}
			{...otherProps}
			cx={styles.Placeholder}
			ref={forwardedRef}
		/>
	);
}

export default contextConnect(Placeholder, 'Placeholder');
