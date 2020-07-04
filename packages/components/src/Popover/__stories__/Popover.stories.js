import React from 'react';

import { Button, CardBody, CardHeader } from '../../index';
import { Popover, PopoverContent, PopoverTrigger } from '../index';

export default {
	component: Popover,
	title: 'Popover',
};

export const _default = () => {
	return (
		<Popover visible>
			<PopoverTrigger as={Button}>Click</PopoverTrigger>
			<PopoverContent>
				<CardHeader>Go</CardHeader>
				<CardBody>Stuff</CardBody>
			</PopoverContent>
		</Popover>
	);
};
