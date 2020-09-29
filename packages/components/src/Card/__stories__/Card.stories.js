import { faker } from '@wp-g2/protokit';
import React from 'react';

import {
	Button,
	Divider,
	Grid,
	Heading,
	Spacer,
	Text,
	VStack,
} from '../../index';
import { Card, CardBody, CardFooter } from '../index';

export default {
	component: Card,
	title: 'Components/Card',
};

const ExampleCard = () => {
	return (
		<Card>
			<VStack>
				<CardBody>
					<VStack expanded={false}>
						<Heading>{faker.lorem.sentence()}</Heading>
						<Text>
							{faker.random.arrayElement([
								faker.lorem.sentence(),
								faker.lorem.words(),
								faker.lorem.paragraphs(),
							])}
						</Text>
					</VStack>
				</CardBody>
				<Divider />
				<CardBody>
					<VStack expanded={false}>
						<Heading>{faker.lorem.sentence()}</Heading>
						<Text>
							{faker.random.arrayElement([
								faker.lorem.sentence(),
								faker.lorem.words(),
								faker.lorem.paragraphs(),
							])}
						</Text>
					</VStack>
				</CardBody>
				<Spacer />
				<Divider />
				<CardFooter>
					<Button>Action</Button>
				</CardFooter>
			</VStack>
		</Card>
	);
};
export const adaptiveHeight = () => {
	return (
		<Grid columns={[1, 2, 4]}>
			<ExampleCard />
			<ExampleCard />
			<ExampleCard />
			<ExampleCard />
			<ExampleCard />
			<ExampleCard />
			<ExampleCard />
			<ExampleCard />
		</Grid>
	);
};

export const _default = () => {
	return (
		<Card elevation={5} isBorderless>
			<CardBody>Card</CardBody>
		</Card>
	);
};
