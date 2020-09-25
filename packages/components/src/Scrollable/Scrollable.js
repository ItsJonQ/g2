import { contextConnect, useContextSystem } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import * as styles from './Scrollable.styles';

function Scrollable(props, forwardedRef) {
	const { children, smoothScroll = false, ...otherProps } = useContextSystem(
		props,
		'Scrollable',
	);

	const __css = [
		styles.Scrollable,
		styles.scrollableScrollbar,
		smoothScroll && styles.smoothScroll,
	];

	return (
		<View {...otherProps} cx={__css} ref={forwardedRef}>
			<View cx={styles.Content} {...ui.$('ScrollableContent')}>
				{children}
			</View>
		</View>
	);
}

export default contextConnect(Scrollable, 'Scrollable');
