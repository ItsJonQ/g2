import { connect } from '@wp-g2/provider';
import React from 'react';

import * as styles from './Surface.styles';

const { SurfaceView } = styles;

function Surface({ isBackground, ...props }) {
	const cx = [isBackground && styles.background];

	return <SurfaceView {...props} cx={cx} />;
}

export default connect(Surface, 'Surface');
