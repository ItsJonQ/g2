import React from 'react';

import { FormGroup, Text, VStack } from '../../index';
import { Slider } from '../index';

export default {
	component: Slider,
	title: 'Components/Slider',
};

export const _default = () => {
	const [value, setValue] = React.useState('50px');

	return (
		<VStack>
			<Text>Value: {value}</Text>
			<FormGroup label="Slider">
				<Slider onChange={setValue} value={value} />
			</FormGroup>
			<FormGroup label="Slider">
				<Slider onChange={setValue} value={value} />
			</FormGroup>
		</VStack>
	);
};
