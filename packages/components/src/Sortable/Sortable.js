import { connect } from '@wp-g2/context';
import { FiMenu } from '@wp-g2/icons';
import { styled } from '@wp-g2/styles';
import { arrayMove, noop } from '@wp-g2/utils';
import React from 'react';
import {
	sortableContainer,
	sortableElement,
	sortableHandle,
} from 'react-sortable-hoc';

import { Animated, AnimatedContainer } from '../Animated';
import { CloseButton } from '../CloseButton';
import { Divider } from '../Divider';
import { Icon } from '../Icon';
import { Surface } from '../Surface';
import { Text } from '../Text';
import { View } from '../View';

const SortableItemView = styled(Surface)`
	position: relative;

	&:active {
		user-select: none;
	}
`;

const DragHandle = sortableHandle(() => (
	<Text css={{ cursor: 'grab' }} isBlock variant="muted">
		<Icon icon={<FiMenu />} size={16} />
	</Text>
));

const SortableItem = sortableElement(
	({ index, isLast, isSortable, item, onRemove, renderItem, value }) => (
		<Animated auto>
			<SortableItemView>
				<Animated
					animate={{
						display: isSortable ? 'block' : 'none',
						opacity: isSortable ? 1 : 0,
						width: isSortable ? 30 : 0,
					}}
					css={{
						left: 8,
						overflow: 'hidden',
						position: 'absolute',
						top: 8,
					}}
				>
					<DragHandle />
				</Animated>
				<Animated
					animate={{
						paddingLeft: isSortable ? 36 : 8,
						paddingRight: isSortable ? 36 : 8,
					}}
					css={{ padding: 8, willChange: 'padding' }}
				>
					{renderItem ? renderItem({ index, item }) : value}
				</Animated>
				<Animated
					animate={{
						display: isSortable ? 'block' : 'none',
						opacity: isSortable ? 1 : 0,
					}}
					css={{
						position: 'absolute',
						right: 4,
						top: 4,
					}}
				>
					<CloseButton
						iconSize={16}
						onClick={() => onRemove(item.id)}
						size="small"
						variant="tertiary"
					/>
				</Animated>
				{!isLast && <Divider />}
			</SortableItemView>
		</Animated>
	),
);

const SortableContainer = sortableContainer(({ children, ...props }) => {
	return <View {...props}>{children}</View>;
});

function Sortable({
	isSortable,
	items,
	onRemove = noop,
	renderItem,
	setItems,
	...props
}) {
	const onSortEnd = ({ newIndex, oldIndex }) => {
		if (setItems) {
			setItems(arrayMove(items, oldIndex, newIndex));
		}
	};

	return (
		<SortableContainer
			lockAxis="y"
			onSortEnd={onSortEnd}
			useDragHandle
			{...props}
		>
			<AnimatedContainer initial={false}>
				{items.map((item, index) => (
					<SortableItem
						helperClass="is-dragging"
						index={index}
						isLast={index === items.length - 1}
						isSortable={isSortable}
						item={item}
						key={item.id}
						onRemove={onRemove}
						renderItem={renderItem}
						value={item.value}
					/>
				))}
			</AnimatedContainer>
		</SortableContainer>
	);
}

export default connect(Sortable);
