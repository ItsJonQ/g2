import { useListState } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import {
	Animated,
	AnimatedContainer,
	Card,
	CardBody,
	Heading,
	HStack,
	Image,
	Spacer,
	Text,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Components/Draggable',
};

const ItemTypes = {
	DONE: 'DONE',
	TODO: 'TODO',
};

function DraggableProvider({ children }) {
	return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
}

function DropZone({ accept = ItemTypes.DONE, dropName = 'Todos' }) {
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: accept,
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
			isOver: monitor.isOver(),
		}),
		drop: () => ({ name: dropName }),
	});

	const isActive = canDrop && isOver;

	return (
		<View
			css={[
				ui.position.full,
				ui.alignment.content.center,
				ui.background.blue,
				isActive && ui.background.green,
				ui.animation.ease,
				ui.padding(5),
				isActive ? ui.background.green : ui.background.yellow,
				ui.borderRadius.round,
				{ opacity: canDrop ? 1 : 0 },
				{ pointerEvents: canDrop ? 'default' : 'none' },
				{ zIndex: 10 },
			]}
			ref={drop}
		>
			<Heading>{isActive ? 'Drop Here' : 'Drag Here'}</Heading>
		</View>
	);
}

function Draggable({ children, onEnd, type = ItemTypes.TODO }) {
	const [{ isDragging }, drag] = useDrag({
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		end: (item, monitor) => {
			onEnd && onEnd(item, monitor);
		},
		item: { type },
	});

	return <View ref={drag}>{children}</View>;
}

const itemSchema = new Schema(() => ({
	avatar: faker.image.avatar(),
	description: faker.lorem.sentence(),
	id: faker.random.uuid(),
	title: faker.name.firstName(),
}));

function Avatar({ src }) {
	return (
		<View css={{ height: 32, width: 32 }}>
			<Image css={ui.borderRadius.circle} src={src} />
		</View>
	);
}

function ItemCard({ avatar, description, id, title }) {
	return (
		<Animated
			auto
			css={{
				margin: -4,
				marginBottom: 4,
				padding: 4,
			}}
			key={id}
		>
			<Card>
				<CardBody>
					<HStack>
						<Avatar src={avatar} />
						<Spacer>
							<VStack spacing={1}>
								<Text weight="bold">{title}</Text>
								<Text
									numberOfLines={2}
									truncate
									variant="muted"
								>
									{description}
								</Text>
							</VStack>
						</Spacer>
					</HStack>
				</CardBody>
			</Card>
		</Animated>
	);
}

function Example() {
	const [todos, todosData] = useListState(itemSchema.make(7));
	const [dones, donesData] = useListState(itemSchema.make(2));

	return (
		<HStack alignment="center">
			<Spacer css={{ maxWidth: 800 }}>
				<DraggableProvider>
					<HStack direction={['column', 'row']}>
						<VStack
							css={[{ width: [null, 240] }, ui.position.relative]}
						>
							<Heading>Pending</Heading>
							<DropZone
								accept={ItemTypes.DONE}
								dropName="Todos"
							/>
							<AnimatedContainer>
								{todos.map((todo) => (
									<Draggable
										key={todo.id}
										onEnd={(item, monitor) => {
											const dropResult = monitor.getDropResult();
											if (dropResult?.name === 'Dones') {
												donesData.prepend(todo);
												todosData.remove({
													id: todo.id,
												});
											}
										}}
										type={ItemTypes.TODO}
									>
										<ItemCard {...todo} />
									</Draggable>
								))}
							</AnimatedContainer>
						</VStack>
						<Spacer>
							<VStack css={[ui.position.relative]}>
								<Heading>Added</Heading>
								<DropZone
									accept={ItemTypes.TODO}
									dropName="Dones"
								/>
								<AnimatedContainer>
									{dones.map((todo) => (
										<Draggable
											key={todo.id}
											onEnd={(item, monitor) => {
												const dropResult = monitor.getDropResult();
												if (
													dropResult?.name === 'Todos'
												) {
													todosData.prepend(todo);
													donesData.remove({
														id: todo.id,
													});
												}
											}}
											type={ItemTypes.DONE}
										>
											<ItemCard {...todo} />
										</Draggable>
									))}
								</AnimatedContainer>
							</VStack>
						</Spacer>
					</HStack>
				</DraggableProvider>
			</Spacer>
		</HStack>
	);
}

export const _default = () => {
	return <Example />;
};
