import { __ } from '@wordpress/i18n';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { Grid } from '../Grid';
import { Slider } from '../Slider';
import { TextInput } from '../TextInput';
import { VStack } from '../VStack';
import { getSliderTemplateColumns } from './font-size-control-utils';

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

	const templateColumns = getSliderTemplateColumns();

	const controlProps = {
		disabled,
		min,
		max,
		onChange,
		size,
		value,
	};

	return (
		<VStack spacing={0}>
			<ControlLabel>{label}</ControlLabel>
			<Grid templateColumns={templateColumns}>
				<Slider {...controlProps} />
				<TextInput {...controlProps} type="number" />
			</Grid>
		</VStack>
	);
}

export default FontSizeControlSlider;
