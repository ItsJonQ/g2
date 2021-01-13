import React from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

import { useColorPickerContext } from './ColorPicker.Context';

export const ColorPickerElement = React.memo(({ onChange, width }) => {
	const { store } = useColorPickerContext();
	const color = store.colorForElement;

	return (
		<RgbaStringColorPicker
			color={color}
			onChange={onChange}
			width={width}
		/>
	);
});
