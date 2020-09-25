import { connect } from '@wp-g2/context';
import { css, ui } from '@wp-g2/styles';
import React from 'react';

import { View } from '../View';
import { SurfaceView } from './Surface.styles';
import * as styles from './Surface.styles';

function Surface({
	backgroundSize = 16,
	border,
	borderBottom,
	borderLeft,
	borderRight,
	borderTop,
	children,
	variant = 'primary',
	...props
}) {
	const sx = {};

	sx.borders = styles.getBorders({
		border,
		borderBottom,
		borderLeft,
		borderRight,
		borderTop,
	});

	const __css = [
		styles.Surface,
		sx.borders,
		styles[variant],
		css({
			backgroundSize: `${ui.value.px(backgroundSize)} ${ui.value.px(
				backgroundSize,
			)}`,
		}),
	];

	return (
		<View {...props} cx={__css}>
			{children}
		</View>
	);
}

export default connect(Surface, 'Surface');
