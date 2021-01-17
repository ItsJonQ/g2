import React from 'react';
import { RgbaColorPicker } from 'react-colorful';

import { useColorPickerContext } from './ColorPicker.Context';

export const ColorPickerElement = React.memo(({ width }) => {
	const { colorRgb, onChange } = useColorPickerContext();

	return (
		<RgbaColorPicker color={colorRgb} onChange={onChange} width={width} />
	);
});
