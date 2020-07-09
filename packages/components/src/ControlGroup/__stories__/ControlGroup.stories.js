import React from 'react';

import { Button, TextInput } from '../../index';
import { ControlGroup, ControlGroupItem } from '../index';

export default {
	component: ControlGroup,
	title: 'ControlGroup',
};

export const _default = () => {
	return (
		<ControlGroup templateColumns="1fr 100px">
			<ControlGroupItem isBlock>
				<TextInput placeholder="First name" />
			</ControlGroupItem>
			<ControlGroupItem isBlock>
				<TextInput placeholder="Last name" />
			</ControlGroupItem>
			<ControlGroupItem>
				<Button isOutline variant="primary">
					Submit
				</Button>
			</ControlGroupItem>
		</ControlGroup>
	);
};
