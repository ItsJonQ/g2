import { AnimatePresence } from '@wp-g2/animations';
import { styled } from '@wp-g2/styles';
import { arrayMove } from '@wp-g2/utils';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
} from 'react-sortable-hoc';

import {
	AnimatedView,
	Background,
	Button,
	ControlLabel,
	Divider,
	Flex,
	Icon,
	Spacer,
	Subheading,
	Surface,
	Switch,
	Text,
	View,
} from '../../index';
import { Sortable } from '../index';

export default {
	component: Sortable,
	title: 'Components/Sortable',
};

const itemSchema = new Schema(() => ({
	id: faker.random.uuid(),
	value: faker.name.firstName(),
}));

const SortableItemView = styled(Surface)`
	position: relative;
`;

const DragHandle = sortableHandle(() => (
	<Text css={{ cursor: 'grab' }} isBlock variant="muted">
		<Icon icon={<FiMenu />} size={16} />
	</Text>
));

const SortableItem = sortableElement(({ isEditing, item, onRemove, value }) => (
	<AnimatedView auto>
		<SortableItemView>
			<AnimatedView
				animate={{
					display: isEditing ? 'block' : 'none',
					opacity: isEditing ? 1 : 0,
					width: isEditing ? 30 : 0,
				}}
				css={{
					left: 8,
					overflow: 'hidden',
					position: 'absolute',
					top: 8,
				}}
			>
				<DragHandle />
			</AnimatedView>
			<AnimatedView
				animate={{
					paddingLeft: isEditing ? 36 : 8,
					paddingRight: isEditing ? 36 : 8,
				}}
				css={{ padding: 8, willChange: 'padding' }}
			>
				{value}
			</AnimatedView>
			<AnimatedView
				animate={{
					display: isEditing ? 'block' : 'none',
					opacity: isEditing ? 1 : 0,
				}}
				css={{
					position: 'absolute',
					right: 4,
					top: 4,
				}}
			>
				<Button
					icon={<FiX />}
					iconSize={16}
					onClick={() => onRemove(item.id)}
					size="small"
					variant="tertiary"
				/>
			</AnimatedView>
			<Divider />
		</SortableItemView>
	</AnimatedView>
));

const SortableContainer = sortableContainer(({ children }) => {
	return <View>{children}</View>;
});

class App extends React.Component {
	state = {
		sortable: null,
	};

	onSortStart = ({ node }) => {
		const helperNode = this.state?.sortable?.helper;
		if (helperNode) {
			helperNode.style.zIndex = 2;
			helperNode.style.pointerEvents = 'initial';
			helperNode.style.cursor = 'grabbing';
		}
	};

	onSortEnd = ({ newIndex, oldIndex }) => {
		this.props.setItems(arrayMove(this.props.items, oldIndex, newIndex));
	};

	render() {
		const { items } = this.props;

		return (
			<SortableContainer
				lockAxis="y"
				onSortEnd={this.onSortEnd}
				onSortStart={this.onSortStart}
				ref={(instance) => {
					if (!this.state.sortable) {
						this.setState({ sortable: instance });
					}
				}}
				useDragHandle
			>
				<AnimatePresence initial={false}>
					{items.map((item, index) => (
						<SortableItem
							helperClass="is-dragging"
							index={index}
							isEditing={this.props.isEditing}
							item={item}
							key={item.id}
							onRemove={this.props.onRemove}
							value={item.value}
						/>
					))}
				</AnimatePresence>
			</SortableContainer>
		);
	}
}

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
		<View css={{ margin: '40px auto', width: 300 }}>
			<Spacer>
				<Flex>
					<Button
						disabled={isEditable}
						onClick={add}
						variant="primary"
					>
						Add User
					</Button>
					<Button onClick={() => setIsEditable(!isEditable)}>
						{isEditable ? 'Done' : 'Edit'}
					</Button>
				</Flex>
			</Spacer>
			<Background border="1px solid" css={{ paddingBottom: 20 }}>
				<Spacer m={0} p={2}>
					<Subheading>Users</Subheading>
				</Spacer>
				<App
					isEditing={isEditable}
					items={items}
					onRemove={remove}
					setItems={setItems}
				/>
			</Background>
		</View>
	);
};

export const _default = () => {
	return <Example />;
};
