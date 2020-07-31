import React from 'react';

import { Placeholder, Spacer } from '../../index';
import { Stack, StackItem } from '../index';

export default {
	component: Stack,
	title: 'Components/Stack',
};

const ItemView = (props) => <Placeholder {...props} />;

export const _default = () => {
	return (
		<>
			<Spacer mb={4}>
				<Stack gap={3}>
					<ItemView>Item</ItemView>
					<ItemView>Item</ItemView>
				</Stack>
			</Spacer>
			<Stack direction={['column', 'row']} gap={3}>
				<ItemView sx={{ width: '180px' }}>Item</ItemView>
				<StackItem isBlock>
					<ItemView>Item</ItemView>
				</StackItem>
				<ItemView>Item</ItemView>
				<ItemView>Item</ItemView>
			</Stack>
		</>
	);
};
