import { connect } from '@wp-g2/context';
import { colorize } from '@wp-g2/utils';
import React from 'react';

import * as styles from './ColorSwatch.styles';
const { ColorSwatchView } = styles;

function ColorSwatch({ color: colorProp = 'purple', ...props }) {
	const backgroundColor = colorize(colorProp).toRgbString();

	return <ColorSwatchView style={{ backgroundColor }} />;
}

export default connect(ColorSwatch, 'ColorSwatch');
