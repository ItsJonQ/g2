import { connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styles';
import React from 'react';

import * as styles from './Placeholder.styles';

function Placeholder({ height = 36, width, ...props }) {
	return (
		<BaseView
			style={{ height, width }}
			{...props}
			cx={styles.Placeholder}
		/>
	);
}

export default connect(Placeholder);
