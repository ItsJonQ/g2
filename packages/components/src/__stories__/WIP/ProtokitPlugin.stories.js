import {
	faker,
	mockRequest,
	Schema,
	useData,
	useListData,
} from '@wp-g2/protokit';
import React, { useState } from 'react';

import {
	Avatar,
	Button,
	Card,
	CardBody,
	Container,
	Grid,
	HStack,
	Text,
	View,
} from '../../index';

export default {
	title: 'Examples/WIP/Protokit/SamplePlugin',
};

const userSchema = new Schema(() => ({
	biography: faker.lorem.paragraph(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	userName: faker.internet.userName(),
	avatar: faker.random.arrayElement([faker.image.avatar(), null]),
	role: faker.random.arrayElement(['user', 'editor', 'admin']),
}));

function Example() {
	const [users, usersFn] = useListData({
		schema: userSchema,
	});

	console.log(users);

	return (
		<Container>
			<Grid columns={3}>
				{users.map((user) => (
					<Card key={user.id}>
						<CardBody>
							<HStack alignment="left">
								<Avatar
									name={`${user.firstName} ${user.lastName}`}
									src={user.avatar}
								/>
								<Text>
									{user.firstName} {user.lastName}
								</Text>
							</HStack>
						</CardBody>
					</Card>
				))}
			</Grid>
		</Container>
	);
}

export const _default = () => <Example />;
