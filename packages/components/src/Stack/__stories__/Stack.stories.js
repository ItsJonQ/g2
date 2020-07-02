import React from 'react';

import { BaseView } from '../../BaseView';
import { Spacer } from '../../Spacer';
import { Stack, StackItem } from '../index';

export default {
	title: 'Stack',
	component: Stack,
};

const ItemView = (props) => <BaseView {...props} p={3} bg="#eee" />;

export const _default = () => {
	return (
		<>
			<Spacer mb={4}>
				<Stack spacing={3}>
					<ItemView>Item</ItemView>
					<ItemView>Item</ItemView>
				</Stack>
			</Spacer>
			<Stack direction={['column', 'row']} spacing={3}>
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
