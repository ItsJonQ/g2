import {
	Button,
	Card,
	Divider,
	Flex,
	Spacer,
	Text,
	View,
} from '@wp-g2/components';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';

import { AnimatePresence, motion } from '../index';

export default {
	title: 'Animations/Test',
};

const list = {
	hidden: {
		opacity: 0,
		transition: {
			when: 'afterChildren',
		},
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
			when: 'beforeChildren',
		},
	},
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
		<>
			<div className="example-container">
				<Spacer>
					<Button onClick={add}>Add Item</Button>
				</Spacer>
				<Card
					style={{
						width: 300,
					}}
				>
					<motion.div
						animate="visible"
						initial="hidden"
						variants={list}
					>
						<AnimatePresence initial={false}>
							{items.map((item, index) => (
								<motion.div
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
											<Button
												onClick={() => remove(item.id)}
												size="small"
												variant="tertiary"
											>
												X
											</Button>
										</Flex>
									</View>
									{index !== items.length - 1 && (
										<Divider m={0} />
									)}
								</motion.div>
							))}
						</AnimatePresence>
					</motion.div>
				</Card>
			</div>
		</>
	);
};

export const _default = () => {
	return <App />;
};
