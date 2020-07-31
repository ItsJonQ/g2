import React from 'react';

import { Text } from '../../index';
import { Tooltip, TooltipContent, TooltipTrigger } from '../index';

export default {
	component: Tooltip,
	title: 'Components/Tooltip',
};

export const _default = () => {
	return (
		<Tooltip visible>
			<TooltipTrigger>
				<Text>Hello</Text>
			</TooltipTrigger>
			<TooltipContent>Tooltip</TooltipContent>
		</Tooltip>
	);
};
