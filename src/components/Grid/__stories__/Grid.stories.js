import React from 'react';
import { ScopeProvider } from 'styled-providers/emotion';
import Grid from '../Grid';
import View from '../../View';

export default {
	title: 'Grid',
	component: Grid,
};

const ItemView = (props) => <View {...props} p={3} bg="#eee" />;

export const _default = () => {
	return (
		<ScopeProvider scope="html">
			<Grid spacing={5}>
				<ItemView>Item</ItemView>
				<ItemView>Item</ItemView>
			</Grid>
		</ScopeProvider>
	);
};
