import { shallowCompare } from '@wp-g2/substate';
import React from 'react';
import { RgbaStringColorPicker } from 'react-colorful';

import { useColorPickerContext } from './ColorPicker.Context';

export const ColorPickerElement = React.memo(({ onChange, width }) => {
	const { store } = useColorPickerContext();
	const color = store((state) => state.colorForElement, shallowCompare);

	return (
		<RgbaStringColorPicker
			color={color}
			onChange={onChange}
			width={width}
		/>
	);
});
