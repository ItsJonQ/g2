import { connect } from '@wp-g2/context';
import { css, get } from '@wp-g2/styles';
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
	/* eslint-disable */
	styles.borders = styles.getBorders({
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
	});
	/* eslint-enable */

	const cx = [isBackground && styles.background, styles.borders];

	return <SurfaceView {...props} cx={cx} />;
}

export default connect(Surface);
