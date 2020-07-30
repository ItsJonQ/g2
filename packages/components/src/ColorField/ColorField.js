import { connect } from '@wp-g2/provider';
import React from 'react';

import { ColorSwatch } from '../ColorSwatch';
import * as styles from './ColorField.styles';
const { ColorPickerButtonView } = styles;

function ColorField({ color, ...props }) {
	return (
		<ColorPickerButtonView {...props}>
			<ColorSwatch color={color} />
		</ColorPickerButtonView>
	);
}

export default connect(ColorField);
