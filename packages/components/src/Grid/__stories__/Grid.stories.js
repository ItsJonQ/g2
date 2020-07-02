import React from 'react';

import { BaseView } from '../../BaseView';
import { Grid } from '../index';

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
