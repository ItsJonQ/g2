import { BaseView } from '@g2/css';
import React from 'react';

import { Elevation } from '../index';

export default {
	title: 'Elevation',
	component: Elevation,
};

export const _default = () => {
	return (
		<BaseView sx={{ position: 'relative', padding: 30 }}>
			<Elevation value={5} />
		</BaseView>
	);
};
