import { BaseView } from '@wp-g2/styles';
import React from 'react';

import { Elevation } from '../index';

export default {
	component: Elevation,
	title: 'Components/Elevation',
};

export const _default = () => {
	return (
		<BaseView css={{ padding: 30, position: 'relative' }}>
			<Elevation value={5} />
		</BaseView>
	);
};
