import { ui } from '@wp-g2/styles';
import { useListState } from '@wp-g2/utils';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
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

const userSchema = new Schema(() => ({
	avatar: faker.image.avatar(),
	description: faker.lorem.sentence(),
	id: faker.random.uuid(),
	title: faker.name.firstName(),
}));

function Avatar({ src }) {
	return (
		<View css={{ height: 32, width: 32 }}>
			<Image
				css={[ui.borderRadius.circle, { display: 'block' }]}
				src={src}
			/>
		</View>
	);
}

const UserCard = ({ avatar, description, title }) => {
	return (
		<Card>
			<CardBody>
				<HStack alignment="topLeft" spacing={4}>
					<Avatar src={avatar} />
					<Spacer>
						<VStack spacing={1}>
							<Text weight="bold">{title}</Text>
							<Text variant="muted">{description}</Text>
						</VStack>
					</Spacer>
				</HStack>
			</CardBody>
		</Card>
	);
};

const Example = () => {
	const [users, setUsers] = useListState(userSchema.make(10));
	const [editors, setEditors] = useListState(userSchema.make(10));

	const states = {
		editors,
		users,
	};
	const sources = {
		editors: setEditors,
		users: setUsers,
	};

	const onMove = ({ destination, source, ...rest }) => {
		// Same list
		if (destination.droppableId === source.droppableId) {
			sources[destination.droppableId].move(
				source.index,
				destination.index,
			);
			return;
		}

		const item = states[source.droppableId][source.index];
		sources[source.droppableId].delete({ at: source.index });
		sources[destination.droppableId].insert({
			at: destination.index,
			item,
		});
	};
	return (
		<DragDropContext onDragEnd={onMove}>
			<HStack
				css={[{ maxWidth: '100%', width: 800 }, ui.alignment.center]}
				spacing={0}
			>
				<Spacer>
					<Droppable droppableId="users">
						{(provided, snapshot) => {
							return (
								<View
									{...provided.droppableProps}
									css={[
										ui.padding(5),
										snapshot.isDraggingOver &&
											ui.background.blue,
									]}
									ref={provided.innerRef}
								>
									<Spacer>
										<Heading>Users</Heading>
									</Spacer>
									{users.map((user, index) => (
										<Draggable
											draggableId={user.id}
											index={index}
											key={user.id}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														...provided
															.draggableProps
															.style,
														marginBottom: 8,
													}}
												>
													<UserCard {...user} />
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</View>
							);
						}}
					</Droppable>
				</Spacer>
				<Spacer>
					<Droppable
						droppableId="editors"
						renderClone={(provided, snapshot, rubric) => (
							<div
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								ref={provided.innerRef}
							>
								Hi
							</div>
						)}
					>
						{(provided, snapshot) => {
							return (
								<View
									{...provided.droppableProps}
									css={[
										ui.padding(5),
										snapshot.isDraggingOver &&
											ui.background.blue,
									]}
									ref={provided.innerRef}
								>
									<Spacer>
										<Heading>Editors</Heading>
									</Spacer>
									{editors.map((user, index) => (
										<Draggable
											draggableId={user.id}
											index={index}
											key={user.id}
										>
											{(provided, snapshot) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={{
														...provided
															.draggableProps
															.style,
														marginBottom: 8,
													}}
												>
													<UserCard {...user} />
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</View>
							);
						}}
					</Droppable>
				</Spacer>
			</HStack>
		</DragDropContext>
	);
};

export const ReactBeautifulDnd = () => {
	return <Example />;
};
