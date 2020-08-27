import React from 'react';

import { Text } from '../../index';
import { Tooltip } from '../index';

export default {
	component: Tooltip,
	title: 'Components/Tooltip',
};

export const _default = () => {
	return (
		<Tooltip content="Tooltip" visible>
			<Text>Hello</Text>
		</Tooltip>
	);
};
