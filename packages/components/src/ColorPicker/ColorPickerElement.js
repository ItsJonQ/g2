import React from 'react';
import { RgbaColorPicker } from 'react-colorful';

import { useColorPickerContext } from './ColorPicker.Context';

export const ColorPickerElement = React.memo(() => {
	const { colorRgb, onChange } = useColorPickerContext();

	/**
	 * Focuses the interactive control from the ColorPicker library.
	 * This allows for a smoother mouse -> keyboard update flow.
	 */
	const handleOnFocusInteractiveControl = (event) => event.target.focus();

	return (
		<div onMouseDown={handleOnFocusInteractiveControl}>
			<RgbaColorPicker color={colorRgb} onChange={onChange} />
		</div>
	);
});
