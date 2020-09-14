import { connect } from '@wp-g2/context';
import { colorize } from '@wp-g2/utils';
import React from 'react';

import * as styles from './ColorCircle.styles';
const { ColorCircleView } = styles;

function ColorCircle({ color: colorProp = 'purple', style = {}, ...props }) {
	const backgroundColor = colorize(colorProp).toRgbString();

	return <ColorCircleView style={{ ...style, backgroundColor }} {...props} />;
}

export default connect(ColorCircle, 'ColorCircle');
