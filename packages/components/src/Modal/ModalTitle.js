import { contextConnect, useContextSystem } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Modal.styles';

function ModalTitle(props, forwardedRef) {
	const { children, className, ...otherProps } = useContextSystem(
		props,
		'ModalTitle',
	);

	if (!children) return null;

	const classes = cx(styles.ModalTitle, className);

	return (
		<View {...otherProps} className={classes} ref={forwardedRef}>
			{children}
		</View>
	);
}

export default contextConnect(ModalTitle, 'ModalTitle');
