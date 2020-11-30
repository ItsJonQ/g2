import { __ } from '@wordpress/i18n';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { Grid } from '../Grid';
import { Slider } from '../Slider';
import { TextInput } from '../TextInput';
import { VStack } from '../VStack';

function FontSizeControlSlider(props) {
	const {
		label = __('Custom size'),
		disabled,
		min,
		max,
		onChange = noop,
		size,
		value,
		withSlider,
	} = props;

	if (!withSlider) return null;

	return (
		<VStack spacing={0}>
			<ControlLabel>{label}</ControlLabel>
			<Grid templateColumns="2fr 1fr">
				<Slider
					disabled={disabled}
					max={max}
					min={min}
					onChange={onChange}
					size={size}
					value={value}
				/>
				<TextInput
					disabled={disabled}
					max={max}
					min={min}
					onChange={onChange}
					size={size}
					type="number"
					value={value}
				/>
			</Grid>
		</VStack>
	);
}

export default FontSizeControlSlider;
