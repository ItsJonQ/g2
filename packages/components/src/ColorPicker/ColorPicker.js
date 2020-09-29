import { contextConnect, useContextSystem } from '@wp-g2/context';
import { css, cx, ui } from '@wp-g2/styles';
import { noop } from '@wp-g2/utils';
import React, { useCallback } from 'react';
import { RgbaColorPicker } from 'react-colorful';

import * as styles from './ColorPicker.styles';
const { ColorPickerView } = styles;

function ColorPicker(props, forwardedRef) {
	const {
		color: colorProp,
		alpha,
		onChange = noop,
		disableAlpha = true,
		width = '100%',
		...otherProps
	} = useContextSystem(props, 'ColorPicker');
	const initialColor = getInitialColor(colorProp, disableAlpha);
	const [color] = React.useState(initialColor);

	const handleOnChange = useCallback(
		(next) => {
			const nextColor = getColor(next, disableAlpha);
			onChange(nextColor, { data: next });
		},
		[disableAlpha, onChange],
	);

	const __css = cx(css({ width }), disableAlpha && styles.disableAlpha);

	return (
		<ColorPickerView {...otherProps} __css={__css} ref={forwardedRef}>
			<RgbaColorPicker
				color={color}
				onChange={handleOnChange}
				width={width}
			/>
		</ColorPickerView>
	);
}

function getColor(color, disableAlpha) {
	return disableAlpha
		? ui.color(color).toHexString()
		: ui.color(color).toRgbString();
}

function getInitialColor(color, disableAlpha) {
	return disableAlpha
		? ui.color(color).toHexString()
		: ui.color(color).toRgb();
}

export default contextConnect(ColorPicker, 'ColorPicker');
