import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Scrollable.styles';

function Scrollable({ children, ...props }) {
	const cx = [styles.Scrollable, styles.scrollableScrollbar];

	return (
		<BaseView {...props} cx={cx}>
			<BaseView cx={styles.Content}>{children}</BaseView>
		</BaseView>
	);
}

export default connect(Scrollable);
