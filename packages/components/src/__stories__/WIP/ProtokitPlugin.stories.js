import {
	faker,
	mockRequest,
	Schema,
	useData,
	useListData,
} from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import React, { useState } from 'react';
import { useDialogState } from 'reakit';

import {
	Alert,
	Alerts,
	Animated,
	AnimatedContainer,
	Avatar,
	Badge,
	Button,
	Card,
	CardBody,
	Container,
	FormGroup,
	Grid,
	Heading,
	HStack,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	SearchInput,
	Select,
	Spacer,
	Text,
	TextInput,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/Protokit/SamplePlugin',
};

const userSchema = new Schema(() => ({
	biography: faker.lorem.paragraph(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	userName: faker.internet.userName(),
	avatar: faker.random.arrayElement([faker.image.avatar(), null]),
	role: faker.random.arrayElement(['user', 'editor', 'admin']),
}));

const UserCard = ({ user, ...props }) => {
	return (
		<Card {...props}>
			<CardBody>
				<HStack alignment="topLeft" spacing={3}>
					<Avatar
						name={`${user.firstName} ${user.lastName}`}
						size="large"
						src={user.avatar}
					/>
					<VStack>
						<VStack spacing={1}>
							<Text weight="bold">
								{user.firstName} {user.lastName}
							</Text>
							<Text size={11} variant="muted">
								{user.userName}
							</Text>
						</VStack>
						<Badge>{user.role}</Badge>
					</VStack>
				</HStack>
			</CardBody>
		</Card>
	);
};

const EditUser = ({ onClose, user: userData, usersFn }) => {
	const [user, userFns] = useData(userData);
	const name = `${user.firstName} ${user.lastName}`;
	const { bindToField, hasChanges, reset } = userFns;
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const applyChanges = async () => {
		setIsLoading(true);
		setError();

		try {
			await mockRequest({
				action: () => {
					usersFn.update(user);
				},
				// status: 400,
				message: 'Could not save user data.',
				timeout: 300,
			});
			onClose();
		} catch (response) {
			setError(response.message);
		}

		setIsLoading(false);
	};

	return (
		<>
			<ModalHeader title="Edit User" />
			<ModalBody>
				<Alerts>
					{!!error && (
						<Spacer>
							<Alert status="critical">
								<Text>{error}</Text>
							</Alert>
						</Spacer>
					)}
				</Alerts>
				<Grid templateColumns={'120px 1fr'}>
					<View css={[ui.alignment.center]}>
						<Avatar name={name} size={80} src={user.avatar} />
					</View>
					<View>
						<FormGroup label="First name">
							<TextInput {...bindToField('firstName')} />
						</FormGroup>
						<FormGroup label="Last name">
							<TextInput {...bindToField('lastName')} />
						</FormGroup>
						<FormGroup label="User name">
							<TextInput {...bindToField('userName')} />
						</FormGroup>
						<FormGroup label="Role">
							<Select
								{...bindToField('role')}
								options={[
									{ value: 'user', label: 'User' },
									{ value: 'editor', label: 'Editor' },
									{ value: 'admin', label: 'Admin' },
								]}
							/>
						</FormGroup>
					</View>
				</Grid>
			</ModalBody>
			<ModalFooter>
				<Button
					onClick={() => {
						onClose();
						reset();
					}}
					variant="tertiary"
				>
					Discard Changes
				</Button>
				<Button
					disabled={!hasChanges()}
					isLoading={isLoading}
					onClick={applyChanges}
					variant="primary"
				>
					Save Changes
				</Button>
			</ModalFooter>
		</>
	);
};

function Example() {
	const [query, setQuery] = useState('');
	const [users, usersFn] = useListData({
		schema: userSchema,
	});
	const [currentUser, setCurrentUser] = useState();
	const dialog = useDialogState({ animated: true });

	return (
		<Container width={800}>
			<Spacer mb={6}>
				<VStack>
					<Heading size={1}>Users</Heading>
					<HStack>
						<SearchInput
							onChange={(next) => {
								usersFn.search(next);
								setQuery(next);
							}}
							value={query}
						/>
						<Spacer />
						<Button onClick={usersFn.loadMore}>Load More</Button>
					</HStack>
				</VStack>
			</Spacer>

			<Grid columns={3}>
				<AnimatedContainer>
					{users.map((user, index) => (
						<Animated auto key={user.id}>
							<UserCard
								css={[
									{ cursor: 'pointer' },
									ui.animation.default,
									ui.zIndex(1),
									ui.hover([ui.scale(1.05)]),
									ui.active([ui.scale(0.92)]),
								]}
								onClick={() => {
									setCurrentUser(user);
									dialog.show();
								}}
								user={user}
							/>
						</Animated>
					))}
				</AnimatedContainer>
			</Grid>
			<Modal dialog={dialog}>
				<EditUser
					onClose={dialog.hide}
					user={currentUser}
					usersFn={usersFn}
				/>
			</Modal>
		</Container>
	);
}

export const _default = () => <Example />;
