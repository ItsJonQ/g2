import { connect } from '@wp-g2/provider';
import { css, get, ns } from '@wp-g2/styles';
import React from 'react';

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

	const cx = [styles.borders];

	return (
		<BackgroundView {...props} cx={cx}>
			<ContentView {...ns('BackgroundContent')}>{children}</ContentView>
			<TintView {...ns('BackgroundTint')} aria-hidden />
		</BackgroundView>
	);
}

export default connect(Background);
