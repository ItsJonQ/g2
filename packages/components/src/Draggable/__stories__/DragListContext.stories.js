import { useListState } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
	Animated,
	Card,
	CardBody,
	Heading,
	HStack,
	Image,
	Scrollable,
	Spacer,
	Text,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Components/Draggable',
};

const blockSchema = new Schema(() => ({
	content: faker.lorem.sentences(),
	id: faker.random.uuid(),
	title: 'Paragraph',
}));

const BlockDragIndexLine = () => {
	return (
		<View css={[ui.position.relative()]}>
			<View
				css={[
					ui.position.top(),
					ui.borderRadius.round(),
					{
						height: 3,
						width: '100%',
					},
					ui.background.admin,
				]}
			/>
		</View>
	);
};

const Example = () => {
	const [blocks, setBlocks] = useListState(blockSchema.make(10));
	const [dragIndex, setDragIndex] = useState();
	const [targetIndex, setTargetIndex] = useState();
	const [isDragging, setIsDragging] = useState(false);

	const setHighlightOn = (index) => {
		setTargetIndex(index);
		setIsDragging(true);
	};

	const setHighlightOff = (index) => {
		setTargetIndex(undefined);
		setIsDragging(false);
	};

	const onDragEnd = ({ destination, source }) => {
		setBlocks.move(source.index, destination.index);
		setDragIndex(undefined);
		setHighlightOff();
	};

	const onDragStart = ({ source }) => {
		setDragIndex(source?.index);
		setTargetIndex(source?.index);
		setHighlightOn(source?.index);
	};

	const onDragUpdate = ({ destination }) => {
		setDragIndex(destination?.index);
	};

	return (
		<DragDropContext
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
			onDragUpdate={onDragUpdate}
		>
			<HStack
				css={[ui.frame.width(800), ui.alignment.center]}
				spacing={8}
			>
				<View css={ui.frame.width(200)}>
					<Spacer>
						<Heading size={4}>Block List</Heading>
					</Spacer>
					<Scrollable css={[ui.frame.height(300), ui.padding(2)]}>
						<Droppable droppableId="blockList">
							{(provided, snapshot) => {
								return (
									<View
										{...provided.droppableProps}
										ref={provided.innerRef}
									>
										{blocks.map((block, index) => (
											<Draggable
												draggableId={block.id}
												index={index}
												key={block.id}
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
														<Card>
															<CardBody>
																<Text weight="bold">
																	{
																		block.title
																	}
																</Text>
															</CardBody>
														</Card>
													</div>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</View>
								);
							}}
						</Droppable>
					</Scrollable>
				</View>

				<Spacer>
					<VStack>
						<Heading size={2}>Blog Post</Heading>
						{blocks.map((block, index) => (
							<React.Fragment key={block.id}>
								{index === dragIndex && (
									<Animated key="BlockDragIndexLine" layout>
										<BlockDragIndexLine />
									</Animated>
								)}
								<Animated key={block.id} layout>
									<View
										css={[
											ui.animation.ease,
											isDragging && ui.opacity(0.3),
											targetIndex === index &&
												ui.opacity(1),
										]}
									>
										<Text
											css={{
												marginBottom: '1em',
												marginTop: '1em',
											}}
											isBlock
											size={16}
										>
											{block.content}{' '}
										</Text>
									</View>
								</Animated>
							</React.Fragment>
						))}
					</VStack>
				</Spacer>
			</HStack>
		</DragDropContext>
	);
};

export const DragListContext = () => {
	return <Example />;
};
