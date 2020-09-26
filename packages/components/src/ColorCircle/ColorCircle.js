import { connect } from '@wp-g2/context';
import { cx } from '@wp-g2/styles';
import { colorize } from '@wp-g2/utils';
import React from 'react';

import * as styles from './ColorCircle.styles';
const { ColorCircleView } = styles;

function ColorCircle({
	color: colorProp,
	size = 'medium',
	style = {},
	...props
}) {
	const backgroundColor = colorize(colorProp).toRgbString();
	const __css = cx([styles[size]]);

	return (
		<ColorCircleView
			style={{ ...style, backgroundColor }}
			{...props}
			cx={__css}
		/>
	);
}

export default connect(ColorCircle, 'ColorCircle');
