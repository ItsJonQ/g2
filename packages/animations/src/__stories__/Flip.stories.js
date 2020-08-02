import {
	Button,
	Card,
	Divider,
	Flex,
	Grid,
	Spacer,
	Text,
	View,
} from '@wp-g2/components';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';

import { AnimatePresence, motion } from '../index';

export default {
	title: 'Animations/Flip',
};

const itemSchema = new Schema(() => ({
	height: faker.random.number({
		max: 200,
		min: 30,
	}),
	id: faker.random.uuid(),
	name: faker.name.firstName(),
}));

const App = () => {
	const [items, setItems] = useState(itemSchema.make(10));

	const remove = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const add = () => {
		setItems([...items, itemSchema.makeOne()]);
	};

	const shuffle = () => {
		const next = items.sort(() => Math.random() - 0.5);
		setItems([...next]);
	};

	return (
		<View css={{ margin: '20px auto', maxWidth: 500 }}>
			<Spacer>
				<Flex>
					<Button onClick={add}>Add User</Button>
					<Button onClick={shuffle}>Shuffle</Button>
				</Flex>
			</Spacer>
			<Grid columns={3}>
				{items.map((item, index) => (
					<Card
						animate={{
							opacity: 1,
							y: 0,
						}}
						as={motion.div}
						exit={{
							opacity: 0,
						}}
						initial={{ opacity: 0, y: 10 }}
						key={item.id}
						layout
					>
						<View css={{ padding: 8 }}>
							<Flex>
								<Text>{item.name}</Text>
								<Button
									icon={<View>X</View>}
									onClick={() => remove(item.id)}
									size="small"
									variant="tertiary"
								/>
							</Flex>
						</View>
					</Card>
				))}
			</Grid>
		</View>
	);
};

export const _default = () => {
	return <App />;
};
