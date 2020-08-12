import React from 'react';

import { Placeholder, Spacer } from '../../index';
import { HStack } from '../index';

export default {
	component: HStack,
	title: 'Components/HStack',
};

export const _default = () => {
	return (
		<HStack spacing={3}>
			<Placeholder>One</Placeholder>
			<Placeholder>Two</Placeholder>
			<Placeholder>Three</Placeholder>
			<Spacer />
			<Placeholder>Four</Placeholder>
			<Placeholder>Five</Placeholder>
		</HStack>
	);
};
