import React from 'react';

import {
	Button,
	Container,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Select,
	TextInput,
} from '../../index';
import { ControlGroup } from '../index';

export default {
	component: ControlGroup,
	title: 'Components/ControlGroup',
};

export const _default = () => {
	return (
		<Container>
			<ListGroups spacing={20}>
				<ListGroup>
					<ListGroupHeader>Grid</ListGroupHeader>
					<ControlGroup templateColumns="auto 1fr 1fr auto">
						<Select options={[{ label: 'Ms.', value: 'ms' }]} />
						<TextInput placeholder="First name" />
						<TextInput placeholder="Last name" />
						<Button variant="primary">Submit</Button>
					</ControlGroup>
				</ListGroup>
				<ListGroup>
					<ListGroupHeader>Flex</ListGroupHeader>
					<ControlGroup>
						<Select options={[{ label: 'Ms.', value: 'ms' }]} />
						<TextInput placeholder="First name" />
						<TextInput placeholder="Last name" />
						<Button variant="primary">Submit</Button>
					</ControlGroup>
				</ListGroup>
			</ListGroups>
		</Container>
	);
};
