import React from 'react';

import { Button, Select, TextField } from '../../index';
import { ControlGroup, ControlGroupItem } from '../index';

export default {
	component: ControlGroup,
	title: 'Components/ControlGroup',
};

export const _default = () => {
	return (
		<ControlGroup templateColumns="1fr 100px">
			<ControlGroupItem>
				<Select options={[{ label: 'Ms.', value: 'ms' }]} />
			</ControlGroupItem>
			<ControlGroupItem isBlock>
				<TextField placeholder="First name" />
			</ControlGroupItem>
			<ControlGroupItem isBlock>
				<TextField placeholder="Last name" />
			</ControlGroupItem>

			<ControlGroupItem>
				<Button variant="primary">Submit</Button>
			</ControlGroupItem>
		</ControlGroup>
	);
};
