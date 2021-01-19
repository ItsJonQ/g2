import { Animated, Sortable, Text, View } from '@wp-g2/components';
import { ThemeProvider } from '@wp-g2/styles';
import { arrayMove, colorize } from '@wp-g2/utils';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';
import createStore from 'zustand';

import { Device } from './Device';

const RED = '#E52122';
const YELLOW = '#EFBB21';

export default {
	title: 'Experiments/Clear',
};

const todoSchema = new Schema(() => ({
	id: faker.random.uuid(),
	isComplete: false,
	title: faker.lorem.sentence(),
}));

function Todo({ index, item, onComplete, todosCount }) {
	const { id, title } = item;
	const backgroundColorMixAmount = ((index + 1) / todosCount) * 100;
	let backgroundColor = colorize
		.mix(RED, YELLOW, backgroundColorMixAmount)
		.toHexString();

	const onDragStart = useDragContext((state) => state.onDragStart);
	const onDragEnd = useDragContext((state) => state.onDragEnd);
	const [isComplete, setIsComplete] = useState(false);

	if (isComplete) {
		backgroundColor = '#07A912';
	}

	const handleOnDragEnd = () => {
		if (isComplete) {
			onComplete(id);
		}
		onDragEnd();
	};

	return (
		<View>
			<Animated
				animate={{ backgroundColor }}
				drag="x"
				dragConstraints={{ left: 0, right: 0 }}
				dragDirectionLock
				dragElastic={0.5}
				onDirectionLock={(axis) => {
					if (axis === 'x') {
						onDragStart();
					}
				}}
				onDrag={(event, info) => {
					if (info.offset.x >= 75 && !isComplete) {
						setIsComplete(!isComplete);
					}
					if (info.offset.x < 75 && isComplete) {
						setIsComplete(!isComplete);
					}
				}}
				onDragEnd={handleOnDragEnd}
			>
				<ThemeProvider isDark isGlobal={false}>
					<View css={{ cursor: 'default', padding: 8 }}>
						<Text
							style={{
								textDecoration: isComplete
									? 'line-through'
									: null,
							}}
							weight={600}
						>
							{title}
						</Text>
					</View>
				</ThemeProvider>
			</Animated>
		</View>
	);
}

const useDragContext = createStore((setState, getState) => ({
	getDragState: () => getState().isDragging,
	isDragging: false,
	onDragEnd: () => setState(() => ({ isDragging: false })),
	onDragStart: () => setState(() => ({ isDragging: true })),
}));

export const _default = () => {
	const [todos, setTodos] = useState(todoSchema.make(10));

	const onRemove = (id) =>
		setTodos((state) => state.filter((todo) => todo.id !== id));

	const onSortEnd = ({ newIndex, oldIndex }) => {
		setTodos((state) => {
			return arrayMove(state, oldIndex, newIndex);
		});
	};

	const onComplete = (id) => {
		// setTodos((state) => {
		// 	const item = state.find((todo) => todo.id === id);
		// 	const oldIndex = state.indexOf(item);
		// 	const newIndex = state.length - 1;
		// 	const next = state.map((todo) => {
		// 		if (todo.id !== id) return todo;
		// 		return { ...todo, isComplete: true };
		// 	});
		// 	return arrayMove(next, oldIndex, newIndex);
		// });
	};

	const isDragging = useDragContext((state) => state.isDragging);

	return (
		<Device id="clear-device">
			<Sortable
				axis="y"
				distance={isDragging ? 100000000 : 20}
				isSortable
				itemComponent={(itemProps) => (
					<Todo
						{...itemProps}
						onComplete={onComplete}
						todosCount={todos.length}
					/>
				)}
				items={todos}
				lockAxis="y"
				onRemove={onRemove}
				onSortEnd={onSortEnd}
				useDragHandle={false}
			/>
		</Device>
	);
};
