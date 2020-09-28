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

export default React.memo(ColorField);
