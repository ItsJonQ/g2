import { AnimatePresence } from '@wp-g2/animations';
import { FiX } from '@wp-g2/icons';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';

import { Button, Card, Divider, Flex, Spacer, Text, View } from '../../index';
import { AnimatedView } from '../index';

export default {
	component: AnimatedView,
	title: 'Components/AnimatedView',
};

const itemSchema = new Schema(() => ({
	id: faker.random.uuid(),
	name: faker.name.firstName(),
}));

const Example = () => {
	const [items, setItems] = useState(itemSchema.make(5));
	const [isEditable, setIsEditable] = useState(true);

	const remove = (id) => {
		setItems(items.filter((item) => item.id !== id));
	};

	const add = () => {
		setItems([itemSchema.makeOne(), ...items]);
	};

	return (
		<>
			<View
				css={{
					margin: '20px auto',
					width: 300,
				}}
			>
				<Spacer>
					<Flex>
						<Button onClick={add}>Add Item</Button>
						<Button
							onClick={() => setIsEditable(!isEditable)}
							variant="primary"
						>
							{isEditable ? 'Done' : 'Edit'}
						</Button>
					</Flex>
				</Spacer>
				<Card css={{ overflow: 'hidden' }}>
					<AnimatePresence initial={false}>
						{items.map((item, index) => (
							<AnimatedView auto key={item.id}>
								<View
									css={{
										padding: '12px 8px',
										position: 'relative',
									}}
								>
									<AnimatedView
										animate={{
											paddingRight: isEditable ? 48 : 0,
										}}
										exit={{
											opacity: 0,
											x: -100,
										}}
									>
										<Text>{item.name}</Text>
									</AnimatedView>
									<AnimatedView
										animate={{
											opacity: isEditable ? 1 : 0,
										}}
										css={{
											pointerEvents: !isEditable
												? 'none'
												: null,
											position: 'absolute',
											right: 8,
											top: 8,
										}}
										transition={{
											duration: 0.2,
										}}
									>
										<Button
											icon={<FiX />}
											onClick={() => remove(item.id)}
											size="small"
											variant="tertiary"
										/>
									</AnimatedView>
								</View>
								{index !== items.length - 1 && (
									<Divider m={0} />
								)}
							</AnimatedView>
						))}
					</AnimatePresence>
				</Card>
			</View>
		</>
	);
};

export const _default = () => <Example />;
