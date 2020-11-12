import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import React from 'react';

import { Grid } from '../Grid';
import { Select } from '../Select';
import { useColorPickerContext } from './ColorPicker.Context';
import { ColorPickerPreview } from './ColorPickerPreview';

export const ColorPickerSelect = React.memo(() => {
	const { store } = useColorPickerContext();
	const [value, showPreview] = store(
		(state) => [state.inputType, state.showPreview],
		shallowCompare,
	);

	const handleOnChange = React.useCallback(
		(next) => {
			store.setState({ inputType: next });
		},
		[store],
	);

	const templateColumns = showPreview
		? `1fr ${ui.get('controlHeight')}`
		: '1fr';

	return (
		<Grid templateColumns={templateColumns}>
			<Select onChange={handleOnChange} value={value}>
				<option value="hex">Hex</option>
				<option value="rgb">RGB</option>
				<option value="hsl">HSL</option>
			</Select>
			{showPreview && <ColorPickerPreview />}
		</Grid>
	);
});
