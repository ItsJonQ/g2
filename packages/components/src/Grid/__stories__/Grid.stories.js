import React from 'react';

import { Placeholder, View } from '../../index';
import { Grid } from '../index';

export default {
	component: Grid,
	title: 'Components/Grid',
};

export const _default = () => {
	return (
		<Grid alignment="bottom" columns={[2, null, 4]}>
			<Placeholder height={200}>Item</Placeholder>
			<View>
				<Placeholder>Item</Placeholder>
			</View>
		</Grid>
	);
};
