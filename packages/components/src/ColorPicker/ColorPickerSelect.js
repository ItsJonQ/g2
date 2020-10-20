import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { Select } from '../Select';
import { useColorPickerContext } from './ColorPicker.Context';

export const ColorPickerSelect = React.memo(() => {
	const { store } = useColorPickerContext();
	const value = store((state) => state.inputType, shallowCompare);

	const handleOnChange = React.useCallback(
		(next) => {
			store.setState({ inputType: next });
		},
		[store],
	);

	return (
		<Select onChange={handleOnChange} value={value}>
			<option label="Hex" value="hex" />
			<option label="RGB" value="rgb" />
			<option label="HSL" value="hsl" />
		</Select>
	);
});
