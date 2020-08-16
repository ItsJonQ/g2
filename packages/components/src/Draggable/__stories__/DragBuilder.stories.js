import { FiBold, FiBox, FiImage, FiType } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import { useListState } from '@wp-g2/utils';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
	Animated,
	AnimatedContainer,
	Button,
	Card,
	CardBody,
	Heading,
	HStack,
	Icon,
	Placeholder,
	Spacer,
	Text,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Components/Draggable',
};

const buttonSchema = new Schema(() => ({
	content: 'Button',
	id: faker.random.uuid(),
	name: 'Button',
	type: 'button',
}));

const headingSchema = new Schema(() => ({
	content: faker.lorem.sentence(),
	id: faker.random.uuid(),
	name: 'Heading',
	type: 'heading',
}));

const paragraphSchema = new Schema(() => ({
	content: faker.lorem.paragraphs(),
	id: faker.random.uuid(),
	name: 'Paragraph',
	type: 'paragraph',
}));

const imageSchema = new Schema(() => ({
	id: faker.random.uuid(),
	name: 'Image',
	type: 'image',
}));

const blockListData = [
	buttonSchema.makeOne(),
	headingSchema.makeOne(),
	imageSchema.makeOne(),
	paragraphSchema.makeOne(),
];

const contentListData = [imageSchema.makeOne(), paragraphSchema.makeOne()];

const createNewContentBlock = (type) => {
	if (type === 'paragraph') {
		return {
			...paragraphSchema.makeOne(),
		};
	}
	if (type === 'heading') {
		return {
			...headingSchema.makeOne(),
		};
	}
	if (type === 'image') {
		return {
			...imageSchema.makeOne(),
		};
	}
	if (type === 'button') {
		return {
			...buttonSchema.makeOne(),
		};
	}
};

const blockIcon = {
	button: <FiBox />,
	heading: <FiBold />,
	image: <FiImage />,
	paragraph: <FiType />,
};

const BlockListCard = ({ name, type }) => {
	const icon = blockIcon[type];
	return (
		<Card>
			<CardBody>
				<HStack alignment="left" spacing={3}>
					{icon && <Icon icon={icon} />}
					<Text>{name}</Text>
				</HStack>
			</CardBody>
		</Card>
	);
};

function getStyle(style, snapshot) {
	if (!snapshot.isDragging) return {};
	if (!snapshot.isDropAnimating) {
		return style;
	}

	return {
		...style,
		// cannot be 0, but make it super tiny
		transitionDuration: `0.001s`,
	};
}

const ExampleBlock = ({ content, type }) => {
	if (type === 'button') {
		return (
			<View css={{ marginBottom: '1.5em' }}>
				<Button variant="primary">Button</Button>
			</View>
		);
	}
	if (type === 'heading') {
		return (
			<View css={{ marginBottom: '1.5em' }}>
				<Heading size={2}>{content}</Heading>
			</View>
		);
	}

	if (type === 'paragraph') {
		return (
			<View css={{ marginBottom: '1.5em' }}>
				<Text>{content}</Text>
			</View>
		);
	}

	if (type === 'image') {
		return (
			<View css={{ marginBottom: '1.5em' }}>
				<Placeholder height={200}>
					<Icon icon={<FiImage />} />
				</Placeholder>
			</View>
		);
	}

	return null;
};

const BlockDragIndexLine = () => {
	return (
		<View css={[ui.position.relative]}>
			<View
				css={[
					ui.position.top,
					ui.borderRadius.round,
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

const BlockList = ({ blockList }) => {
	return (
		<Droppable droppableId="blockList" isDropDisabled>
			{(provided) => {
				return (
					<View
						{...provided.droppableProps}
						css={[ui.padding(5)]}
						ref={provided.innerRef}
					>
						<Spacer>
							<Heading>Blocks</Heading>
						</Spacer>
						{blockList.map((block, index) => (
							<Draggable
								draggableId={block.id}
								index={index}
								key={block.id}
							>
								{(provided, snapshot) => (
									<React.Fragment>
										<View
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											style={{
												...getStyle(
													provided.draggableProps
														.style,
													snapshot,
												),
												marginBottom: 8,
											}}
										>
											<BlockListCard {...block} />
										</View>
										{snapshot.isDragging && (
											<View
												css={[
													ui.margin.bottom(2),
													ui.opacity.muted,
												]}
											>
												<BlockListCard {...block} />
											</View>
										)}
									</React.Fragment>
								)}
							</Draggable>
						))}
						<span
							style={{
								display: 'none',
							}}
						>
							{provided.placeholder}
						</span>
					</View>
				);
			}}
		</Droppable>
	);
};

const ContentList = ({ contentList, targetIndex }) => {
	return (
		<Droppable droppableId="content">
			{(provided) => {
				return (
					<View
						{...provided.droppableProps}
						css={[ui.padding(5)]}
						ref={provided.innerRef}
					>
						<Spacer mb={6}>
							<Heading size={1}>Blog Title</Heading>
						</Spacer>
						<AnimatedContainer>
							{contentList.map((block, index) => (
								<Animated auto key={block.id}>
									{index === targetIndex && (
										<BlockDragIndexLine />
									)}
									<Draggable
										draggableId={block.id}
										index={index}
										isDragDisabled
										key={block.id}
									>
										{(provided, snapshot) => (
											<View
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												css={[ui.margin.bottom(2)]}
											>
												<ExampleBlock
													key={block.id}
													{...block}
												/>
											</View>
										)}
									</Draggable>
								</Animated>
							))}
						</AnimatedContainer>
						{targetIndex === contentList.length && (
							<BlockDragIndexLine />
						)}
						<View
							style={{
								display: 'none',
							}}
						>
							{provided.placeholder}
						</View>
					</View>
				);
			}}
		</Droppable>
	);
};

const Example = () => {
	const [blockList] = useListState(blockListData);
	const [contentList, setContentList] = useListState(contentListData);
	const [targetIndex, setTargetIndex] = useState();

	const onDragUpdate = ({ destination, source }) => {
		if (destination?.droppableId !== 'content') {
			setTargetIndex(undefined);
			return;
		}
		setTargetIndex(destination?.index);
	};

	const onDragEnd = ({ destination, source }) => {
		setTargetIndex(undefined);
		if (destination?.droppableId !== 'content') return;

		const item = blockList[source.index];
		const itemType = item.type;
		const next = createNewContentBlock(itemType);

		if (next) {
			setContentList.insert({ at: destination.index, item: next });
		}
	};

	const onBeforeCapture = ({ draggableId }) => {
		const el = document.querySelector(
			`[data-rbd-drag-handle-draggable-id="${draggableId}"]`,
		);
		if (el) {
			el.style.height = '12px';
		}
	};

	return (
		<DragDropContext
			onBeforeCapture={onBeforeCapture}
			onDragEnd={onDragEnd}
			onDragUpdate={onDragUpdate}
		>
			<HStack
				alignment="stretch"
				css={[
					ui.frame.width(960),
					ui.alignment.center,
					{ minHeight: '80vh' },
				]}
				spacing={0}
			>
				<View css={ui.frame.width(300)}>
					<BlockList blockList={blockList} />
				</View>
				<Spacer>
					<ContentList
						contentList={contentList}
						targetIndex={targetIndex}
					/>
				</Spacer>
			</HStack>
		</DragDropContext>
	);
};

export const DragBuilder = () => {
	return <Example />;
};
