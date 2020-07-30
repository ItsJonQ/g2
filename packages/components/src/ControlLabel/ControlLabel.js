import { connect } from '@wp-g2/provider';
import React from 'react';

import { Text } from '../Text';
import * as styles from './ControlLabel.styles';

const { ControlLabelView } = styles;

function ControlLabel({
	children,
	size = 'medium',
	truncate = true,
	...props
}) {
	const cx = [styles[size]];

	return (
		<ControlLabelView cx={cx} {...props}>
			<Text isBlock truncate={truncate} {...props}>
				{children}
			</Text>
		</ControlLabelView>
	);
}

export default connect(ControlLabel);
