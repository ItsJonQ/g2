import { FiX } from '@wp-g2/icons';
import { arrayMove, getValidChildren, is } from '@wp-g2/utils';
import faker from 'faker';
import { Schema } from 'faker-schema';
import React, { createContext, useContext, useEffect, useState } from 'react';

import {
	Animated,
	AnimatedContainer,
	Button,
	Divider,
	DragHandle,
	HStack,
	Image,
	SortableContainer,
	SortableItemBase,
	Spacer,
	Surface,
	Text,
	View,
	VStack,
} from '../../index';
// import { FlatList } from '../index';

export default {
	// component: FlatList,
	title: 'Components/FlatList',
};

const FlatListContext = createContext({});
const useFlatListContext = () => useContext(FlatListContext);

const FlatListItemContext = createContext({});
const useFlatListItemContext = () => useContext(FlatListItemContext);

function EditButton(props) {
	const { isEditing, setFlatListState } = useFlatListContext();

	useEffect(() => {
		setFlatListState((prevState) => ({
			...prevState,
			hasEditButton: true,
		}));
	}, [setFlatListState]);

	const onClick = () => {
		setFlatListState((prevState) => ({
			...prevState,
			isEditing: !prevState.isEditing,
		}));
	};

	const label = isEditing ? 'Done' : 'Edit';

	return (
		<Button {...props} onClick={onClick}>
			{label}
		</Button>
	);
}

function FlatList({ children, isEditing, onMove, ...props }) {
	const [state, setState] = useState({
		hasDeleteAction: false,
		hasEditButton: false,
		hasSortAction: !!onMove,
		isEditing,
	});

	const contextProps = {
		...state,
		onMove,
		setFlatListState: setState,
	};

	return (
		<FlatListContext.Provider value={contextProps}>
			<View {...props}>{children}</View>
		</FlatListContext.Provider>
	);
}

const FlatListItems = ({ children }) => {
	const { onMove } = useFlatListContext();
	const validChildren = getValidChildren(children);

	const handleOnSortEnd = ({ newIndex, oldIndex }) => {
		onMove && onMove(oldIndex, newIndex);
	};

	const clonedChildren = validChildren.map((child, index) => {
		const _key = child.key || index;
		const isLast = index === validChildren.length - 1;
		const contextProps = {
			_key,
			index,
			isLast,
		};

		return (
			<React.Fragment key={_key}>
				<FlatListItemContext.Provider value={contextProps}>
					{child}
				</FlatListItemContext.Provider>
			</React.Fragment>
		);
	});

	return (
		<View>
			<SortableContainer
				distance={5}
				lockAxis="y"
				onSortEnd={handleOnSortEnd}
				useDragHandle
			>
				<AnimatedContainer>{clonedChildren}</AnimatedContainer>
			</SortableContainer>
		</View>
	);
};

const FlatListItem = ({ children, onDelete, onMove, ...props }) => {
	const {
		hasDeleteAction,
		hasEditButton,
		hasSortAction,
		isEditing,
		setFlatListState,
	} = useFlatListContext();

	const { _key, index, isLast } = useFlatListItemContext();

	useEffect(() => {
		if (onDelete) {
			setFlatListState((prev) => ({ ...prev, hasDeleteAction: true }));
		}
	}, [onDelete, setFlatListState]);

	return (
		<SortableItemBase index={index}>
			<Animated auto key={_key}>
				<Surface {...props}>
					<HStack alignment="edge">
						{hasEditButton && hasSortAction && (
							<Animated
								animate={{
									opacity: isEditing ? 1 : 0,
									overflow: 'hidden',
									transition: {
										duration: 0.2,
										ease: 'easeInOut',
									},
									width: isEditing ? 24 : 0,
								}}
							>
								<VStack css={{ paddingTop: 4 }}>
									<DragHandle />
								</VStack>
							</Animated>
						)}
						<Spacer>{children}</Spacer>
						{hasEditButton && hasDeleteAction && (
							<Animated
								animate={{
									opacity: isEditing ? 1 : 0,
									overflow: 'hidden',
									transition: {
										duration: 0.2,
										ease: 'easeInOut',
									},
									width: isEditing ? 50 : 0,
								}}
							>
								<HStack alignment="right" css={{ padding: 2 }}>
									<Button
										icon={<FiX />}
										onClick={onDelete}
										size="small"
										variant="tertiary"
									/>
								</HStack>
							</Animated>
						)}
					</HStack>
				</Surface>
				{!isLast && <Divider />}
			</Animated>
		</SortableItemBase>
	);
};

const Avatar = ({ src }) => {
	return (
		<View css={{ height: 40, width: 40 }}>
			<Image
				css={{
					borderRadius: 9999,
					display: 'block',
				}}
				src={src}
			/>
		</View>
	);
};

const userSchema = new Schema(() => ({
	avatar: faker.image.avatar(),
	description: faker.lorem.sentences(),
	id: faker.random.uuid(),
	name: faker.name.firstName(),
}));

const useFlatListState = (collection) => {
	const [state, setState] = useState(collection);

	setState.prepend = (next) => {
		return setState((prevState) => [next, ...prevState]);
	};

	setState.append = (next) => {
		return setState((prevState) => [...prevState, next]);
	};

	setState.add = setState.append;

	setState.delete = ({ at, id }) => {
		setState((prevState) =>
			prevState.filter((item, index) => {
				if (is.number(at)) {
					return index !== at;
				}
				if (is.defined(id)) {
					return item?.id !== id;
				}

				return item;
			}),
		);
	};

	setState.move = (from, to) => {
		setState((prevState) => {
			return arrayMove(prevState, from, to);
		});
	};

	return [state, setState];
};

const Example = () => {
	const [users, setUsers] = useFlatListState(userSchema.make(10));

	const addUser = () => setUsers.prepend(userSchema.makeOne());
	const deleteUser = (id) => setUsers.delete({ id });
	const moveUser = (from, to) => setUsers.move(from, to);

	return (
		<HStack>
			<FlatList
				css={{ maxWidth: 400 }}
				onMove={(from, to) => moveUser(from, to)}
			>
				<HStack alignment="edge">
					<Button onClick={addUser} variant="primary">
						Add User
					</Button>
					<EditButton />
				</HStack>
				<FlatListItems>
					{users.map((user, index) => {
						return (
							<FlatListItem
								css={{ padding: 12 }}
								key={user.id || index}
								onDelete={() => deleteUser(user.id)}
							>
								<HStack alignment="left" spacing={3}>
									<Avatar src={user.avatar} />
									<Spacer>
										<VStack spacing={1}>
											<Text size={14} weight="bold">
												{user.name}
											</Text>
											<Text
												numberOfLines={2}
												size={12}
												truncate
												variant="muted"
											>
												{user.description}
											</Text>
										</VStack>
									</Spacer>
								</HStack>
							</FlatListItem>
						);
					})}
				</FlatListItems>
			</FlatList>
		</HStack>
	);
};

export const _default = () => {
	return <Example />;
};
