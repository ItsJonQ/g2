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
	Elevation,
	Heading,
	HStack,
	Icon,
	Placeholder,
	Spacer,
	Surface,
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

const initialBlockList = [
	buttonSchema.makeOne(),
	headingSchema.makeOne(),
	imageSchema.makeOne(),
	paragraphSchema.makeOne(),
];

const initialContentList = [imageSchema.makeOne(), ...paragraphSchema.make(2)];

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

const DraggableClone = ({ children, snapshot }) => {
	if (!snapshot.isDragging) return null;
	return children;
};

const DraggablePlaceholder = ({ provided }) => {
	return (
		<span
			style={{
				display: 'none',
			}}
		>
			{provided.placeholder}
		</span>
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
										<DraggableClone snapshot={snapshot}>
											<View
												css={[
													ui.margin.bottom(2),
													ui.opacity.muted,
												]}
											>
												<BlockListCard {...block} />
											</View>
										</DraggableClone>
									</React.Fragment>
								)}
							</Draggable>
						))}
						<DraggablePlaceholder provided={provided} />
					</View>
				);
			}}
		</Droppable>
	);
};

const ContentList = ({ contentList, targetIndex }) => {
	return (
		<Droppable
			droppableId="content"
			renderClone={(provided, snapshot, rubric) => (
				<Surface
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					isBackground
					ref={provided.innerRef}
					style={{
						...provided.draggableProps.style,
						height: undefined,
						padding: 12,
					}}
				>
					<View css={{ marginBottom: '-1.5em', opacity: 0.5 }}>
						<ExampleBlock {...contentList[rubric.source.index]} />
					</View>
					<Elevation value={6} />
				</Surface>
			)}
		>
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

						{contentList.map((block, index) => (
							<View key={block.id}>
								{index === targetIndex && (
									<BlockDragIndexLine />
								)}
								<Draggable draggableId={block.id} index={index}>
									{(provided, snapshot) => (
										<View
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											<ExampleBlock
												key={block.id}
												{...block}
											/>
										</View>
									)}
								</Draggable>
							</View>
						))}

						{targetIndex === contentList.length && (
							<BlockDragIndexLine />
						)}
						{provided.placeholder}
					</View>
				);
			}}
		</Droppable>
	);
};

const Example = () => {
	const [blockList] = useListState(initialBlockList);
	const [contentList, contentListData] = useListState(initialContentList);
	const [targetIndex, setTargetIndex] = useState();
	const [isDraggingContent, setIsDraggingContent] = useState(false);
	const [sourceContentIndex, setSourceContentIndex] = useState();

	const onDragStart = ({ source }) => {
		if (source?.droppableId !== 'content') return;
		setSourceContentIndex(source.index);
	};

	const onDragUpdate = ({ destination, source }) => {
		if (destination?.droppableId !== 'content') {
			setTargetIndex(undefined);
			return;
		}
		let next = destination?.index;
		if (isDraggingContent) {
			next = next >= sourceContentIndex ? next + 1 : next;
		}
		setTargetIndex(next);
	};

	const onDragEnd = ({ destination, source }) => {
		setTargetIndex(undefined);
		setIsDraggingContent(false);

		// Sorting content
		if (
			destination?.droppableId === 'content' &&
			source?.droppableId === 'content'
		) {
			contentListData.move(source.index, destination.index);
			return;
		}

		if (destination?.droppableId !== 'content') return;

		const item = blockList[source.index];
		const itemType = item.type;
		const next = createNewContentBlock(itemType);

		if (next) {
			contentListData.insert({ at: destination.index, item: next });
		}
	};

	const onBeforeCapture = ({ draggableId }) => {
		const contentListItem = contentListData.find({ id: draggableId });
		const isDraggingContentList = !!contentListItem;

		if (isDraggingContentList) {
			setIsDraggingContent(true);
		}

		let el = document.querySelector(
			`[data-rbd-drag-handle-draggable-id="${draggableId}"]`,
		);
		if (el) {
			el.style.height = isDraggingContentList ? '24px' : '12px';
		}
	};

	return (
		<DragDropContext
			onBeforeCapture={onBeforeCapture}
			onDragEnd={onDragEnd}
			onDragStart={onDragStart}
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
