import { connect } from '@wp-g2/provider';
import { ns } from '@wp-g2/styles';
import React from 'react';

import { getBorders } from '../Surface/Surface.styles';
import * as styles from './Background.styles';
const { BackgroundView, ContentView, TintView } = styles;

function Background({
	border,
	borderBottom,
	borderLeft,
	borderRight,
	borderTop,
	children,
	...props
}) {
	/* eslint-disable */
	styles.borders = getBorders({
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
	});

	const cx = [styles.borders];

	return (
		<BackgroundView {...props} cx={cx}>
			<ContentView {...ns('BackgroundContent')}>{children}</ContentView>
			<TintView {...ns('BackgroundTint')} aria-hidden />
		</BackgroundView>
	);
}

export default connect(Background);
