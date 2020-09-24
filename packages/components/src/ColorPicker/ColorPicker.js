import { connect } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import { noop, useControlledState } from '@wp-g2/utils';
import React from 'react';
import { SketchPicker } from 'react-color';

import * as styles from './ColorPicker.styles';
const { ColorPickerView } = styles;

function ColorPicker({
	color: colorProp,
	alpha,
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
		let nextColor = next.hex;
		if (!disableAlpha) {
			nextColor = ui.color(next.rgb).toRgbString();
		}
		setColor(nextColor, { data: next });
		onChange(nextColor, { data: next });
	};

	return (
		<ColorPickerView {...props}>
			<SketchPicker
				alpha={alpha}
				color={ui.color(color).toRgb()}
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

export default connect(ColorPicker, 'ColorPicker');
