import { ui } from '@wp-g2/styles';
import React from 'react';

import { Grid } from '../Grid';
import { Select } from '../Select';
import { useColorPickerContext } from './ColorPicker.Context';
import { ColorPickerPreview } from './ColorPickerPreview';

export const ColorPickerSelect = React.memo(() => {
	const {
		inputType: value,
		setInputType,
		showPreview,
	} = useColorPickerContext();

	const handleOnChange = React.useCallback(
		(next) => {
			setInputType(next);
		},
		[setInputType],
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
