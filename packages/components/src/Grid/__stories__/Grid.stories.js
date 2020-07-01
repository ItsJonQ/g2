import React from 'react';
import Grid from '../Grid';
import BaseView from '../../BaseView';

export default {
	title: 'Grid',
	component: Grid,
};

const ItemView = (props) => <BaseView {...props} p={3} bg="#eee" />;

export const _default = () => {
	return (
		<Grid spacing={5}>
			<ItemView>Item</ItemView>
			<ItemView>Item</ItemView>
		</Grid>
	);
};
