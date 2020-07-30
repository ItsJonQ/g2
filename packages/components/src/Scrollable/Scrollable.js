import { connect } from '@wp-g2/provider';
import { View } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Scrollable.styles';

function Scrollable({ children, ...props }) {
	const cx = [styles.Scrollable, styles.scrollableScrollbar];

	return (
		<View {...props} cx={cx}>
			<View cx={styles.Content}>{children}</View>
		</View>
	);
}

export default connect(Scrollable);
