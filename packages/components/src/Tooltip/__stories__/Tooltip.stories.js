import React from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '../index';

export default {
	component: Tooltip,
	title: 'Components/Tooltip',
};

export const _default = () => {
	return (
		<Tooltip visible>
			<TooltipTrigger>Hello</TooltipTrigger>
			<TooltipContent>Tooltip</TooltipContent>
		</Tooltip>
	);
};
