import { connect } from '@wp-g2/context';
import { View } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Scrollable.styles';

function Scrollable({ children, smoothScroll = false, ...props }) {
	const __css = [
		styles.Scrollable,
		styles.scrollableScrollbar,
		smoothScroll && styles.smoothScroll,
	];

	return (
		<View {...props} cx={__css}>
			<View cx={styles.Content}>{children}</View>
		</View>
	);
}

export default connect(Scrollable, 'Scrollable');
