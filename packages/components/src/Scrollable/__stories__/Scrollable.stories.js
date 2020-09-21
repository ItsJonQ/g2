import React from 'react';

import { View } from '../../index';
import { Scrollable } from '../index';

export default {
	component: Scrollable,
	title: 'Components/Scrollable',
};

export const _default = () => {
	return (
		<Scrollable css={{ height: 400, width: 300 }}>
			<View css={{ backgroundColor: '#eee', height: 1000 }} />
		</Scrollable>
	);
};
