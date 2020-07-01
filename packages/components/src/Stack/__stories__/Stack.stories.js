import React from 'react';
import Stack from '../Stack';
import Spacer from '../../Spacer';
import BaseView from '../../BaseView';

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
				<Stack.Item isBlock>
					<ItemView>Item</ItemView>
				</Stack.Item>
				<ItemView>Item</ItemView>
				<ItemView>Item</ItemView>
			</Stack>
		</>
	);
};
