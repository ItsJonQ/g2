import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';

import {
	Button,
	Card,
	CloseButton,
	Divider,
	Flex,
	Spacer,
	Text,
	View,
} from '../../index';
import { Animated, AnimatedContainer } from '../index';

export default {
	component: Animated,
	title: 'Components/Animated',
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
					<AnimatedContainer initial={false}>
						{items.map((item, index) => (
							<Animated auto key={item.id}>
								<View
									css={{
										padding: '12px 8px',
										position: 'relative',
									}}
								>
									<Animated
										animate={{
											paddingRight: isEditable ? 48 : 0,
										}}
										exit={{
											opacity: 0,
											x: -100,
										}}
									>
										<Text>{item.name}</Text>
									</Animated>
									<Animated
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
										<CloseButton
											onClick={() => remove(item.id)}
											size="small"
											variant="tertiary"
										/>
									</Animated>
								</View>
								{index !== items.length - 1 && (
									<Divider m={0} />
								)}
							</Animated>
						))}
					</AnimatedContainer>
				</Card>
			</View>
		</>
	);
};

export const _default = () => <Example />;
