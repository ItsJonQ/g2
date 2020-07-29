import { connect } from '@wp-g2/provider';
import { noop, useControlledState } from '@wp-g2/utils';
import React from 'react';
import { SketchPicker } from 'react-color';

import * as styles from './ColorPicker.styles';
const { ColorPickerView } = styles;

function ColorPicker({
	color: colorProp,
	onChange = noop,
	disableAlpha = true,
	presetColors = [],
	renderers,
	onSwatchHover,
	width = '100%',
	...props
}) {
	const [color, setColor] = useControlledState(colorProp);

	const handleChangeComplete = (next) => {
		setColor(next.hex);
		onChange(next.hex);
	};

	return (
		<ColorPickerView {...props}>
			<SketchPicker
				color={color}
				disableAlpha={disableAlpha}
				onChange={handleChangeComplete}
				onChangeComplete={handleChangeComplete}
				onSwatchHover={onSwatchHover}
				presetColors={presetColors}
				renderers={renderers}
				width={width}
			/>
		</ColorPickerView>
	);
}

export default connect(ColorPicker);
