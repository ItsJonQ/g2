import React from 'react';

import { Placeholder } from '../../index';
import { Grid } from '../index';

export default {
	component: Grid,
	title: 'Grid',
};

export const _default = () => {
	return (
		<Grid columns={[2, null, 4]}>
			<Placeholder>Item</Placeholder>
			<Placeholder>Item</Placeholder>
		</Grid>
	);
};
