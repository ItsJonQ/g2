import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../Text';
import * as styles from './Subheading.styles';

function Subheading({ className, ...props }) {
	const classes = cx([styles.uppercase, className]);

	return (
		<Text
			className={classes}
			size={10}
			variant="muted"
			weight={600}
			{...props}
		/>
	);
}

export default connect(Subheading, 'Subheading');
