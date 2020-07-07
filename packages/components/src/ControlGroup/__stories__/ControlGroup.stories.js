import React from 'react';

import { Button, InputControl } from '../../index';
import { ControlGroup, ControlGroupItem } from '../index';

export default {
	component: ControlGroup,
	title: 'ControlGroup',
};

export const _default = () => {
	return (
		<ControlGroup templateColumns="1fr 100px">
			<ControlGroupItem isBlock>
				<InputControl placeholder="First name" />
			</ControlGroupItem>
			<ControlGroupItem isBlock>
				<InputControl placeholder="Last name" />
			</ControlGroupItem>
			<ControlGroupItem>
				<Button isOutline variant="primary">
					Submit
				</Button>
			</ControlGroupItem>
		</ControlGroup>
	);
};
