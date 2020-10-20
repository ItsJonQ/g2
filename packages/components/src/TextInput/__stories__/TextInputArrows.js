import React from 'react';

import { View } from '../../View';
import { VStack } from '../../VStack';

export const TextInputArrows = ({ decrement, increment }) => {
	return (
		<VStack spacing={0}>
			<View as="button" onClick={increment}>
				UP
			</View>
			<View as="button" onClick={decrement}>
				DOWN
			</View>
		</VStack>
	);
};
