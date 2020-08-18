import React from 'react';

import { FormGroup } from '../../index';
import { Slider } from '../index';

export default {
	component: Slider,
	title: 'Components/Slider',
};

export const _default = () => {
	return (
		<FormGroup label="Slider">
			<Slider />
		</FormGroup>
	);
};
