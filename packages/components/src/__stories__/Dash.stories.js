import { ComponentsProvider, connect } from '@wp-g2/provider';
import { BaseView } from '@wp-g2/styled';
import React from 'react';

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	CardInnerBody,
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
	Flex,
	FlexItem,
	Grid,
	NavigationStack,
	NavigationStackNext,
	NavigationStackPrevious,
	NavigationStackScreen,
	NavigationStackScreens,
	Panel,
	PanelBody,
	PanelHeader,
	Placeholder,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Scrollable,
	Spacer,
	Text,
	TextInput,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '../index';

export default {
	title: 'Example/Dash',
};

const Sidebar = connect(BaseView, 'Sidebar');

const InputSuffix = (props) => (
	<Text
		isBlock
		lineHeight={1}
		size={11}
		sx={{ userSelect: 'none' }}
		variant="muted"
		{...props}
	/>
);

const ControlExample = () => {
	return (
		<>
			<Spacer>
				<Grid columns={2}>
					<TextInput
						prefix={<InputSuffix pr={1}>W</InputSuffix>}
						suffix={<InputSuffix>PX</InputSuffix>}
						value={300}
					/>
					<TextInput
						prefix={<InputSuffix pr={1}>H</InputSuffix>}
						suffix={<InputSuffix>PX</InputSuffix>}
						value={200}
					/>
				</Grid>
			</Spacer>
			<Spacer>
				<Grid columns={3}>
					<TextInput prefix={<InputSuffix pr={1}>X</InputSuffix>} />
					<TextInput prefix={<InputSuffix pr={1}>Y</InputSuffix>} />
					<TextInput prefix={<InputSuffix pr={1}>Z</InputSuffix>} />
				</Grid>
			</Spacer>
			<Spacer>
				<Grid templateColumns="2fr 1fr">
					<TextInput />
					<TextInput suffix={<InputSuffix>%</InputSuffix>} />
				</Grid>
			</Spacer>
		</>
	);
};

const PublishPublicDropdownItem = connect(DropdownMenuItem, [
	'PublishDropdownItem',
	'PublishPublicDropdownItem',
]);
const PublishPrivateDropdownItem = connect(DropdownMenuItem, [
	'PublishDropdownItem',
	'PublishPrivateDropdownItem',
]);

const NavigationStackExample = () => {
	return (
		<NavigationStack initialHeight={50}>
			<Card sx={{ m: 'auto', width: 300 }}>
				<CardHeader>
					<Text weight={600}>Filter Settings</Text>
				</CardHeader>
				<CardBody sx={{ maxHeight: 300 }}>
					<NavigationStackScreens>
						<NavigationStackScreen>
							<Spacer>
								<Placeholder height={200}>
									<Text>1</Text>
								</Placeholder>
							</Spacer>
							<Placeholder />
						</NavigationStackScreen>
						<NavigationStackScreen>
							<Spacer>
								<Placeholder height={100}>
									<Text>2</Text>
								</Placeholder>
							</Spacer>
							<Spacer>
								<Placeholder height={16} />
							</Spacer>
							<Spacer>
								<Placeholder height={16} width="75%" />
							</Spacer>
						</NavigationStackScreen>
						<NavigationStackScreen>
							<Spacer>
								<Placeholder height={240}>
									<Text>3</Text>
								</Placeholder>
							</Spacer>
							<Spacer>
								<Placeholder height={32} />
							</Spacer>
							<Spacer>
								<Placeholder height={16} />
							</Spacer>
							<Spacer>
								<Placeholder height={16} width="50%" />
							</Spacer>
						</NavigationStackScreen>
					</NavigationStackScreens>
				</CardBody>
				<CardFooter justify="flex-end">
					<NavigationStackPrevious>Previous</NavigationStackPrevious>
					<NavigationStackNext>Next</NavigationStackNext>
				</CardFooter>
			</Card>
		</NavigationStack>
	);
};

export const _default = () => {
	return (
		<Grid align="flex-start" templateColumns={[null, null, '1fr 300px']}>
			<Flex align={[null, 'center']} direction={['column', 'row']} p={3}>
				<FlexItem pb={[1, null]}>
					<Text as="h1" size={3} weight={600}>
						Title
					</Text>
				</FlexItem>
				<FlexItem>
					<ComponentsProvider
						value={{
							Button: { size: 'small' },
							PublishPublicDropdownItem: {
								renderChildren: ({ children }) => {
									return (
										<>
											<Spacer>{children}</Spacer>
											<Text variant="muted">
												Subtitle
											</Text>
										</>
									);
								},
							},
						}}
					>
						<Flex justify="flex-start">
							<Tooltip>
								<TooltipTrigger as={Button} variant="tertiary">
									Save draft
								</TooltipTrigger>
								<TooltipContent>
									Saves, but does not publish
								</TooltipContent>
							</Tooltip>
							<Button variant="tertiary">Preview</Button>
							<Dropdown placement="bottom-end">
								<DropdownTrigger variant="primary">
									Publish
								</DropdownTrigger>
								<DropdownMenu>
									<PublishPublicDropdownItem>
										As Public
									</PublishPublicDropdownItem>
									<PublishPrivateDropdownItem>
										As Private
									</PublishPrivateDropdownItem>
								</DropdownMenu>
							</Dropdown>
						</Flex>
					</ComponentsProvider>
				</FlexItem>
			</Flex>
			<Sidebar
				sx={{
					borderLeft: '1px solid #eee',
					height: [null, null, '100vh'],
				}}
			>
				<Scrollable>
					<Panel visible>
						<PanelHeader title="Panel" />
						<PanelBody>
							<Spacer>
								<Popover placement="left-start">
									<PopoverTrigger
										as={Button}
										isBlock
										isSubtle
									>
										<Flex>
											<Text weight={600}>Dimensions</Text>
											<Text>300 x 200</Text>
										</Flex>
									</PopoverTrigger>
									<PopoverContent>
										<CardHeader>
											<Text weight={600}>
												Opacity Settings
											</Text>
										</CardHeader>
										<CardBody sx={{ maxHeight: 300 }}>
											<ControlExample />
											<ControlExample />
											<CardInnerBody>
												<Panel>
													<PanelHeader title="Another Panel" />
													<PanelBody>
														<ControlExample />
													</PanelBody>
												</Panel>
												<Panel>
													<PanelHeader title="Another Panel" />
													<PanelBody>
														<ControlExample />
													</PanelBody>
												</Panel>
											</CardInnerBody>
										</CardBody>
									</PopoverContent>
								</Popover>
							</Spacer>
							<Spacer>
								<Popover placement="left-start">
									<PopoverTrigger
										as={Button}
										isBlock
										isSubtle
									>
										<Flex>
											<Text weight={600}>Filters</Text>
											<Text>Custom</Text>
										</Flex>
									</PopoverTrigger>
									<PopoverContent>
										<NavigationStackExample />
									</PopoverContent>
								</Popover>
							</Spacer>
						</PanelBody>
					</Panel>
					<Panel>
						<PanelHeader title="Another Panel" />
						<PanelBody>
							<Placeholder height={900} />
						</PanelBody>
					</Panel>
				</Scrollable>
			</Sidebar>
		</Grid>
	);
};
