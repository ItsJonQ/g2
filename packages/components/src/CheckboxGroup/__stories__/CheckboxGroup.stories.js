import React from 'react';

import { Checkbox, VStack } from '../../index';
import { CheckboxGroup } from '../index';

export default {
	component: CheckboxGroup,
	title: 'Components/CheckboxGroup',
};

export const _default = () => {
	return (
		<CheckboxGroup>
			<VStack spacing={0}>
				<Checkbox label="One" value="one" />
				<Checkbox label="Two" value="twp" />
				<Checkbox label="Three" value="three" />
			</VStack>
		</CheckboxGroup>
	);
};
