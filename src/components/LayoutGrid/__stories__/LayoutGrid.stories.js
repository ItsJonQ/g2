import React from 'react';
import LayoutGrid from '../LayoutGrid';
import View from '../../View';

export default {
	title: 'LayoutGrid',
	component: LayoutGrid,
};

const ItemView = (props) => <View {...props} p={3} bg="#eee" />;

export const _default = () => {
	return (
		<LayoutGrid spacing={3}>
			<ItemView>Item</ItemView>
			<ItemView>Item</ItemView>
		</LayoutGrid>
	);
};
