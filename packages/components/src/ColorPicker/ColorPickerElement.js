import React from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

import { useColorPickerContext } from './ColorPicker.Context';

export const ColorPickerElement = React.memo(({ width }) => {
	const { color, onChange } = useColorPickerContext();

	return (
		<RgbaStringColorPicker
			color={color}
			onChange={onChange}
			width={width}
		/>
	);
});
