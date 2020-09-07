import { ComponentsProvider } from '@wp-g2/context';
import { faker, Schema } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import { arrayMove, useListState } from '@wp-g2/utils';
import React, { createContext, useContext, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Container,
	FormGroup,
	Grid,
	Heading,
	HStack,
	Radio,
	RadioGroup,
	Select,
	Spacer,
	Surface,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Text,
	TextInput,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/UserProfilePlugin',
};

const AppContext = createContext({});
const useAppContext = () => useContext(AppContext);

const componentsProviderValue = {
	FormGroup: {
		alignLabel: 'right',
		gap: 7,
	},
	Radio: {
		gap: 2,
	},
};

const userSchema = new Schema(() => ({
	avatar: faker.image.avatar(),
	firstName: faker.name.firstName(),
	lastName: faker.name.lastName(),
	userName: faker.internet.userName(),
	nickName: faker.internet.userName(),
	displayName: faker.internet.userName(),
	website: faker.internet.url(),
	biography: faker.lorem.sentences(),
	avatarRating: 'G',
}));

const SectionComponents = {
	name: NameSection,
	about: AboutSection,
	status: StatusSection,
	avatar: AvatarSection,
};

function Section({ children }) {
	return children;
}

function SectionWrapper({ id }) {
	const { sections: sectionsData } = useAppContext();
	const sections = sectionsData[id];

	return (
		<Droppable droppableId={id}>
			{(provided) => {
				return (
					<>
						<VStack
							ref={provided.innerRef}
							{...provided.droppableProps}
							spacing={6}
						>
							{sections.map((section, index) => {
								const Component = SectionComponents[section];

								return (
									<Draggable
										draggableId={section}
										index={index}
										key={section}
									>
										{(provided, snapshot) => (
											<React.Fragment>
												<View
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
												>
													<Component />
												</View>
											</React.Fragment>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</VStack>
						<Spacer pb={4} />
					</>
				);
			}}
		</Droppable>
	);
}

function NameSection() {
	const { update, user } = useAppContext();
	return (
		<Section>
			<Card>
				<CardHeader>
					<Heading size={5}>Name</Heading>
				</CardHeader>
				<CardBody>
					<Container alignment="left" width={640}>
						<FormGroup label="User Name">
							<TextInput
								onChange={update('userName')}
								value={user.userName}
							/>
						</FormGroup>
						<FormGroup label="First Name">
							<TextInput
								onChange={update('firstName')}
								value={user.firstName}
							/>
						</FormGroup>
						<FormGroup label="Last Name">
							<TextInput
								onChange={update('lastName')}
								value={user.lastName}
							/>
						</FormGroup>
						<FormGroup label="Nickname (required)">
							<TextInput
								onChange={update('nickName')}
								value={user.nickName}
							/>
						</FormGroup>
						<FormGroup label="Display Name">
							<Select
								options={[
									{
										value: user.userName,
										label: user.userName,
									},
									{
										value: user.nickName,
										label: user.nickName,
									},
									{
										value: user.firstName,
										label: user.firstName,
									},
								]}
							/>
						</FormGroup>
					</Container>
				</CardBody>
			</Card>
		</Section>
	);
}

function AboutSection() {
	const { update, user } = useAppContext();

	return (
		<Section>
			<Card>
				<CardHeader>
					<Heading size={5}>About</Heading>
				</CardHeader>
				<CardBody>
					<Container alignment="left" width={640}>
						<FormGroup label="Website">
							<TextInput
								onChange={update('website')}
								value={user.website}
							/>
						</FormGroup>
						<FormGroup label="Biography">
							<VStack>
								<TextInput
									maxRows={8}
									minRows={4}
									multiline={4}
									onChange={update('biography')}
									value={user.biography}
								/>
								<Text variant="muted">
									Share a little biographical information to
									fill out your profile. This may be shown
									publicly.
								</Text>
							</VStack>
						</FormGroup>
					</Container>
				</CardBody>
			</Card>
		</Section>
	);
}

function StatusSection() {
	return (
		<Section>
			<Card>
				<CardHeader>
					<Heading size={5}>Status</Heading>
				</CardHeader>
				<CardBody>
					<Text>
						Registered on: <strong>August 25, 2020 7:54 pm</strong>
					</Text>
				</CardBody>
				<CardFooter justify="flex-end">
					<Button>View User</Button>
					<Button variant="primary">Update</Button>
				</CardFooter>
			</Card>
		</Section>
	);
}

function AvatarSection() {
	const { update, user } = useAppContext();

	return (
		<Section>
			<Card>
				<CardHeader>
					<Heading size={5}>Avatar</Heading>
				</CardHeader>
				<CardBody>
					<VStack spacing={4}>
						<HStack alignment="center">
							<Avatar size={80} src={user.avatar} />
						</HStack>
						<HStack alignment="left">
							<Button
								onClick={() =>
									update('avatar')(faker.image.avatar())
								}
							>
								Choose From Media
							</Button>
							<Button
								isDestructive
								onClick={() => update('avatar')(null)}
								variant="tertiary"
							>
								Remove
							</Button>
						</HStack>
						<RadioGroup
							onChange={update('avatarRating')}
							value={user.avatarRating}
						>
							<HStack alignment="left" spacing={5}>
								<Radio label="G" value="G" />
								<Radio label="PR" value="PG" />
								<Radio label="R" value="R" />
								<Radio label="X" value="X" />
							</HStack>
						</RadioGroup>
					</VStack>
				</CardBody>
			</Card>
		</Section>
	);
}

function ProfilePanel() {
	return <SectionWrapper id="main" />;
}

function AccountPanel() {
	return <Text>Account</Text>;
}

function OptionsPanel() {
	return <Text>Options</Text>;
}

function PermissionsPanel() {
	return <Text>Permissions</Text>;
}

function Sidebar() {
	return <SectionWrapper id="sidebar" />;
}

function App() {
	const [user, setUser] = useState(userSchema.makeOne());
	const [main, setMain] = useListState(['name', 'about']);
	const [sidebar, setSidebar] = useListState(['status', 'avatar']);

	const update = (key) => (next) =>
		setUser((prev) => ({ ...prev, [key]: next }));

	const onDragEnd = ({ destination, source }) => {
		const updateFns = {
			main: setMain,
			sidebar: setSidebar,
		};
		// Sorting content
		if (destination?.droppableId === source?.droppableId) {
			const updateFn = updateFns[source?.droppableId];

			if (updateFn) {
				updateFn.move(source.index, destination.index);
			}

			return;
		}

		const prevSection = updateFns[source?.droppableId];
		const nextSection = updateFns[destination?.droppableId];
		const next = prevSection.find({ at: source.index });

		if (next && nextSection) {
			prevSection.remove({ at: source.index });
			nextSection.insert({ at: destination.index, item: next });
		}
	};

	const contextValue = { user, setUser, update, sections: { main, sidebar } };

	return (
		<AppContext.Provider value={contextValue}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Container>
					<Tabs>
						<TabList>
							<HStack alignment="left">
								<Tab css={[ui.padding.x(3)]}>Profile</Tab>
								<Tab css={[ui.padding.x(3)]}>Account</Tab>
								<Tab css={[ui.padding.x(3)]}>Options</Tab>
								<Tab css={[ui.padding.x(3)]}>Permission</Tab>
							</HStack>
						</TabList>
						<Surface css={[ui.padding(5)]} variant="secondary">
							<ComponentsProvider value={componentsProviderValue}>
								<Grid gap={28} templateColumns="1fr 280px">
									<View>
										<TabPanel>
											<ProfilePanel />
										</TabPanel>
										<TabPanel>
											<AccountPanel />
										</TabPanel>
										<TabPanel>
											<OptionsPanel />
										</TabPanel>
										<TabPanel>
											<PermissionsPanel />
										</TabPanel>
									</View>
									<View>
										<Sidebar />
									</View>
								</Grid>
							</ComponentsProvider>
						</Surface>
					</Tabs>
				</Container>
			</DragDropContext>
		</AppContext.Provider>
	);
}

export function _default() {
	return <App />;
}
