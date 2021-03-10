import { FiMinus, FiPlus } from '@wp-g2/icons';
import { faker, Schema } from '@wp-g2/protokit';
import { ui } from '@wp-g2/styles';
import { chunk } from '@wp-g2/utils';
import React, { useState } from 'react';

import {
	Button,
	Card,
	CardBody,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	ColorCircle,
	ColorControl,
	ColorPicker,
	Container,
	Elevation,
	FormGroup,
	Grid,
	HStack,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Panel,
	PanelBody,
	PanelHeader,
	Popover,
	Select,
	Spacer,
	Surface,
	Switch,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	View,
} from '../../index';

export default {
	title: 'Examples/WIP/ContextPopover',
};

const colorSchema = new Schema(() => ({ color: faker.internet.color() }));
const baseColors = colorSchema.make(34);
const themeColors = colorSchema.make(50);
const customColors = colorSchema.make(8);

const TabbedColorControls = ({ colors = baseColors }) => {
	return (
		<Tabs>
			<TabList>
				<Tab size="xSmall">Solid</Tab>
				<Tab size="xSmall">Gradient</Tab>
			</TabList>
			<TabPanel>
				<Spacer pt={3}>
					<Grid columns={7} gap={2}>
						{colors.map((color, index) => (
							<ColorCircle
								{...color}
								color={`hsl(${360 - index * 10}, 100%, 50%)`}
							/>
						))}
					</Grid>
				</Spacer>
			</TabPanel>
			<TabPanel>
				<Spacer pt={3}>
					<Grid columns={7} gap={2}>
						{colors.map((color, index) => (
							<ColorCircle
								{...color}
								color={`hsl(${index * 10}, 100%, 50%)`}
							/>
						))}
					</Grid>
				</Spacer>
			</TabPanel>
		</Tabs>
	);
};

const ColorControls = ({ limitColors, showTabs }) => {
	const [popoverState, setPopoverState] = useState(false);
	const [baseColorsData] = chunk(baseColors, limitColors ? 100 : 14);
	const [themeColorsData] = chunk(themeColors, limitColors ? 100 : 8);
	const [customColorsData] = chunk(customColors, limitColors ? 100 : 2);

	return (
		<Spacer m={0} px={1} py={2}>
			<ListGroups>
				<ListGroup>
					<ListGroupHeader>
						Core
						{!showTabs && (
							<Select isSubtle size="small">
								<option>Solid</option>
								<option>Gradient</option>
							</Select>
						)}
					</ListGroupHeader>
					{showTabs ? (
						<TabbedColorControls colors={baseColorsData} />
					) : (
						<Grid columns={7} gap={2}>
							{baseColorsData.map((color, index) => (
								<ColorCircle
									{...color}
									color={`hsl(${
										360 - index * 10
									}, 100%, 50%)`}
								/>
							))}
						</Grid>
					)}
				</ListGroup>
				<ListGroup>
					<ListGroupHeader>
						Theme
						{!showTabs && (
							<Select isSubtle size="small">
								<option>Solid</option>
								<option>Gradient</option>
							</Select>
						)}
					</ListGroupHeader>
					<Grid columns={7} gap={2}>
						{themeColorsData.map((color) => (
							<ColorCircle {...color} />
						))}
					</Grid>
				</ListGroup>
				<ListGroup>
					<ListGroupHeader>
						Custom
						{!showTabs && (
							<Select isSubtle size="small">
								<option>Solid</option>
								<option>Gradient</option>
							</Select>
						)}
					</ListGroupHeader>
					<Grid columns={7} gap={2}>
						{customColorsData.map((color) => (
							<ColorCircle {...color} />
						))}
						<View>
							<Popover
								css={[{ marginLeft: 39 }]}
								maxWidth="262px"
								onVisibleChange={setPopoverState}
								placement="top"
								trigger={
									<Button
										icon={<FiPlus />}
										isControl
										isRounded
										isSubtle
										size="xSmall"
									/>
								}
								visible={popoverState}
							>
								<CardBody>
									<ColorPicker />
								</CardBody>
							</Popover>
						</View>
					</Grid>
				</ListGroup>
			</ListGroups>
		</Spacer>
	);
};

const ColorSetting = ({
	color,
	limitColors,
	onVisibleChange,
	showElevation,
	showTabs,
	title,
}) => {
	const [visible, setVisible] = useState(false);

	const handleOnVisibleChange = (next) => {
		setVisible(next);
		onVisibleChange(next);
	};

	return (
		<Collapsible
			css={[ui.position.relative(), ui.zIndex(visible ? 10 : 0)]}
			onVisibleChange={handleOnVisibleChange}
			visible={visible}
		>
			<Elevation offset={-8} value={showElevation && visible ? 4 : 0} />
			<HStack
				css={[
					ui.hover(
						ui.$('ColorAction').css({
							opacity: 1,
						}),
					),
				]}
			>
				<Spacer>
					<CollapsibleTrigger as={ColorControl} color={color}>
						{title}
					</CollapsibleTrigger>
				</Spacer>
				<View>
					<Button
						{...ui.$('ColorAction')}
						className="action"
						css={`
							opacity: 0;
							&:focus {
								opacity: 1;
							}
						`}
						icon={<FiMinus />}
						isRounded
						isSubtle
						size="small"
					/>
				</View>
			</HStack>
			<CollapsibleContent>
				<ColorControls limitColors={limitColors} showTabs={showTabs} />
			</CollapsibleContent>
		</Collapsible>
	);
};

const Example = () => {
	const [visible, setVisible] = useState(false);
	const [showElevation, setShowElevation] = useState(false);
	const [showTabs, setShowTabs] = useState(false);
	const [limitColors, setLimitColors] = useState(false);

	return (
		<Grid>
			<View>
				<Container width={270}>
					<Card>
						<CardBody>
							<ListGroup>
								<ListGroupHeader>Settings</ListGroupHeader>
								<FormGroup label="Elevation">
									<Switch
										checked={showElevation}
										onChange={setShowElevation}
									/>
								</FormGroup>
								<FormGroup label="Use Tabs">
									<Switch
										checked={showTabs}
										onChange={setShowTabs}
									/>
								</FormGroup>
								<FormGroup label="COLORS!">
									<Switch
										checked={limitColors}
										onChange={setLimitColors}
									/>
								</FormGroup>
							</ListGroup>
						</CardBody>
					</Card>
				</Container>
			</View>

			<Container
				css={[ui.position.relative(), { minHeight: '80vh' }]}
				width={270}
			>
				<Surface
					css={[
						ui.opacity(visible ? 0.8 : 0),
						{ pointerEvents: visible ? null : 'none' },
						ui.position.full(),
						ui.zIndex(1),
						{ minHeight: '80vh' },
					]}
				/>
				<Card css={[{ minHeight: '80vh' }]} isRounded={false}>
					<Panel visible>
						<PanelHeader title="Color" />
						<PanelBody>
							<Spacer pb={3}>
								<ListGroup>
									<ColorSetting
										color="white"
										limitColors={limitColors}
										onVisibleChange={setVisible}
										showElevation={showElevation}
										showTabs={showTabs}
										title="Background"
									/>
									<ColorSetting
										color="black"
										limitColors={limitColors}
										onVisibleChange={setVisible}
										showElevation={showElevation}
										showTabs={showTabs}
										title="Text"
									/>
									<ColorSetting
										color="pink"
										limitColors={limitColors}
										onVisibleChange={setVisible}
										showElevation={showElevation}
										showTabs={showTabs}
										title="Accent"
									/>
								</ListGroup>
							</Spacer>
						</PanelBody>
					</Panel>
				</Card>
			</Container>
		</Grid>
	);
};

export const _default = () => {
	return <Example />;
};
