import React from 'react';

import { Radio, VStack } from '../../index';
import { RadioGroup } from '../index';

export default {
	component: RadioGroup,
	title: 'Components/RadioGroup',
};

export const _default = () => {
	return (
		<RadioGroup>
			<VStack spacing={0}>
				<Radio label="One" value="one" />
				<Radio label="Two" value="twp" />
				<Radio label="Three" value="three" />
			</VStack>
		</RadioGroup>
	);
};
