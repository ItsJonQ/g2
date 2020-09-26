import { contextConnect, useContextSystem } from '@wp-g2/context';
import React from 'react';

import { View } from '../View';
import * as styles from './Modal.styles';

function ModalTitle(props, forwardedRef) {
	const { children, ...otherProps } = useContextSystem(props, 'ModalTitle');

	if (!children) return null;

	return (
		<View {...otherProps} __css={styles.ModalTitle} ref={forwardedRef}>
			{children}
		</View>
	);
}

export default contextConnect(ModalTitle, 'ModalTitle');
