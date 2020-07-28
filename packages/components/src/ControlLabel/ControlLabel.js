import { connect } from '@wp-g2/provider';
import React from 'react';

import * as styles from './ControlLabel.styles';

const { ControlLabelView } = styles;

function ControlLabel({ size = 'medium', ...props }) {
	const cx = [styles[size]];
	return <ControlLabelView cx={cx} {...props} />;
}

export default connect(ControlLabel);
