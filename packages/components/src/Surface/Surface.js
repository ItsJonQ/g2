import { connect } from '@wp-g2/context';
import React from 'react';

import * as styles from './Surface.styles';

const { SurfaceView } = styles;

function Surface({
	border,
	borderBottom,
	borderLeft,
	borderRight,
	borderTop,
	isBackground,
	...props
}) {
	const sx = {};
	/* eslint-disable */
	sx.borders = styles.getBorders({
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
	});
	/* eslint-enable */

	const cx = [isBackground && styles.background, sx.borders];

	return <SurfaceView {...props} cx={cx} />;
}

export default connect(Surface);
