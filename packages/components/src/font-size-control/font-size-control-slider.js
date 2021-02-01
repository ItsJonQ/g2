import { __ } from '@wordpress/i18n';
import { noop } from '@wp-g2/utils';
import React from 'react';

import { ControlLabel } from '../ControlLabel';
import { HStack } from '../HStack';
import { Slider } from '../Slider';
import { TextInput } from '../TextInput';
import { View } from '../View';
import { VStack } from '../VStack';
import * as styles from './font-size-control-styles';

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
			<HStack wrap>
				<View className={styles.SliderWrapper}>
					<Slider {...controlProps} />
				</View>
				<View>
					<TextInput {...controlProps} type="number" />
				</View>
			</HStack>
		</VStack>
	);
}

export default FontSizeControlSlider;
