import { connect } from '@wp-g2/context';
import { colorize } from '@wp-g2/utils';
import React from 'react';

import * as styles from './ColorCircle.styles';
const { ColorCircleView } = styles;

function ColorCircle({
	color: colorProp = 'purple',
	size = 'medium',
	style = {},
	...props
}) {
	const backgroundColor = colorize(colorProp).toRgbString();
	const cx = [styles[size]];

	return (
		<ColorCircleView
			style={{ ...style, backgroundColor }}
			{...props}
			cx={cx}
		/>
	);
}

export default connect(ColorCircle, 'ColorCircle');
