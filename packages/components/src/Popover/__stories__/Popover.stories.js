import React from 'react';

import { Button, CardBody, CardHeader } from '../../index';
import { Popover } from '../index';

export default {
	component: Popover,
	title: 'Components/Popover',
};

export const _default = () => {
	return (
		<Popover trigger={<Button>Click</Button>} visible>
			<CardHeader>Go</CardHeader>
			<CardBody>Stuff</CardBody>
		</Popover>
	);
};
