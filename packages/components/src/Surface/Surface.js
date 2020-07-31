import { connect } from '@wp-g2/provider';
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
	const borderStyle = `1px solid ${get('surfaceBorderColor')}`;

	/* eslint-disable */
	styles.borders = css({
		borderBottom: borderBottom && borderStyle,
		borderTop: borderTop && borderStyle,
		borderLeft: borderLeft && borderStyle,
		borderRight: borderRight && borderStyle,
		border: border && borderStyle,
	});
	/* eslint-enable */

	const cx = [isBackground && styles.background, styles.borders];

	return <SurfaceView {...props} cx={cx} />;
}

export default connect(Surface, 'Surface');
