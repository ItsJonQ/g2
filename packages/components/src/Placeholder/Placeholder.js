import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Placeholder.styles';

function Placeholder(props, forwardedRef) {
	const { className, height = 36, width, ...otherProps } = useContextSystem(
		props,
		'Placeholder',
	);

	const classes = cx(styles.Placeholder, css({ width, height }), className);

	return <View className={classes} {...otherProps} ref={forwardedRef} />;
}

export default contextConnect(Placeholder, 'Placeholder');
