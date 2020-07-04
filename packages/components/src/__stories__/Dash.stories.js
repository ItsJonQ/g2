import { BaseView } from '@g2/css';
import { ComponentsProvider, connect } from '@g2/provider';
import React from 'react';

import {
	Button,
	CardBody,
	CardHeader,
	CardInnerBody,
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
	Flex,
	FlexItem,
	Grid,
	InputControl,
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
		sx={{ pr: 3, userSelect: 'none' }}
		variant="muted"
		{...props}
	/>
);

const ControlExample = () => {
	return (
		<>
			<Spacer>
				<Grid columns={2}>
					<InputControl
						prefix={<InputSuffix>W</InputSuffix>}
						suffix={<InputSuffix>PX</InputSuffix>}
						value={300}
					/>
					<InputControl
						prefix={<InputSuffix>H</InputSuffix>}
						suffix={<InputSuffix>PX</InputSuffix>}
						value={200}
					/>
				</Grid>
			</Spacer>
			<Spacer>
				<Grid columns={3}>
					<InputControl prefix={<InputSuffix>X</InputSuffix>} />
					<InputControl prefix={<InputSuffix>Y</InputSuffix>} />
					<InputControl prefix={<InputSuffix>Z</InputSuffix>} />
				</Grid>
			</Spacer>
			<Spacer>
				<Grid templateColumns="2fr 1fr">
					<InputControl />
					<InputControl suffix={<InputSuffix>%</InputSuffix>} />
				</Grid>
			</Spacer>
		</>
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
					<ComponentsProvider value={{ Button: { size: 'small' } }}>
						<Flex justify="flex-start">
							<Tooltip>
								<TooltipTrigger as={Button}>
									Save draft
								</TooltipTrigger>
								<TooltipContent>
									Saves, but does not publish
								</TooltipContent>
							</Tooltip>
							<Button>Preview</Button>
							<Dropdown placement="bottom-end">
								<DropdownTrigger variant="primary">
									Publish
								</DropdownTrigger>
								<DropdownMenu>
									<DropdownMenuItem>
										As Public
									</DropdownMenuItem>
									<DropdownMenuItem>
										As Private
									</DropdownMenuItem>
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
										isOutline
									>
										<Flex>
											<Text weight={600}>Opacity</Text>
											<Text>50%</Text>
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
											<ControlExample />
											<ControlExample />
										</CardBody>
									</PopoverContent>
								</Popover>
							</Spacer>
							<Spacer>
								<Popover placement="left-start">
									<PopoverTrigger
										as={Button}
										isBlock
										isOutline
									>
										<Flex>
											<Text weight={600}>Filters</Text>
											<Text>Custom</Text>
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
