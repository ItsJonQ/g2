import { BaseView } from '@wp-g2/css';
import React from 'react';

import { Elevation } from '../index';

export default {
	component: Elevation,
	title: 'Elevation',
};

export const _default = () => {
	return (
		<BaseView sx={{ padding: 30, position: 'relative' }}>
			<Elevation value={5} />
		</BaseView>
	);
};
