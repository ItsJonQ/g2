import {
	Animated,
	AnimatedContainer,
	Button,
	Card,
	CloseButton,
	Divider,
	Flex,
	Spacer,
	Text,
	View,
} from '@wp-g2/components';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';

export default {
	title: 'Animations/Mount',
};

const itemSchema = new Schema(() => ({
	id: faker.random.uuid(),
	name: faker.name.firstName(),
}));

const App = () => {
	const [items, setItems] = useState(itemSchema.make(10));

	const remove = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const add = () => {
		setItems([itemSchema.makeOne(), ...items]);
	};

	return (
		<View css={{ margin: '20px auto', maxWidth: 500 }}>
			<Spacer>
				<Button onClick={add}>Add User</Button>
			</Spacer>
			<Card
				style={{
					width: 300,
				}}
			>
				<AnimatedContainer initial={false}>
					{items.map((item, index) => (
						<Animated
							animate={{ height: 'auto', opacity: 1 }}
							exit={{
								height: 0,
								opacity: 0,
							}}
							initial={{ height: 0, opacity: 0 }}
							key={item.id}
							style={{ overflow: 'hidden' }}
						>
							<View css={{ padding: 8 }}>
								<Flex>
									<Text>{item.name}</Text>
									<CloseButton
										onClick={() => remove(item.id)}
										size="small"
										variant="tertiary"
									/>
								</Flex>
							</View>
							{index !== items.length - 1 && <Divider m={0} />}
						</Animated>
					))}
				</AnimatedContainer>
			</Card>
		</View>
	);
};

export const _default = () => {
	return <App />;
};
