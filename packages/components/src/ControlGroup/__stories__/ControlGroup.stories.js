import React from 'react';

import { Button, TextField } from '../../index';
import { ControlGroup, ControlGroupItem } from '../index';

export default {
	component: ControlGroup,
	title: 'ControlGroup',
};

export const _default = () => {
	return (
		<ControlGroup templateColumns="1fr 100px">
			<ControlGroupItem isBlock>
				<TextField placeholder="First name" />
			</ControlGroupItem>
			<ControlGroupItem isBlock>
				<TextField placeholder="Last name" />
			</ControlGroupItem>
			<ControlGroupItem>
				<Button isOutline variant="primary">
					Submit
				</Button>
			</ControlGroupItem>
		</ControlGroup>
	);
};
