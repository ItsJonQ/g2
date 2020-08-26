import {
	FiAlignCenter,
	FiAlignLeft,
	FiAlignRight,
	FiMaximize,
	FiMonitor,
	FiSmartphone,
	FiSquare,
	FiTablet,
} from '@wp-g2/icons';
import React from 'react';

import { Sidebar } from '../__fixtures__/components';
import {
	Button,
	Divider,
	Flex,
	FlexBlock,
	FormGroup,
	Grid,
	Icon,
	Panel,
	PanelBody,
	PanelHeader,
	SegmentedControl,
	Select,
	Slider,
	Spacer,
	Stepper,
	Switch,
	Text,
	TextInput,
	View,
} from '../index';

export default {
	title: 'Examples',
};

const SuffixLabel = (props) => (
	<Text
		isBlock
		size={10}
		variant="muted"
		{...props}
		css={{ userSelect: 'none' }}
	/>
);

const ResponsiveControls = () => {
	return (
		<>
			<Flex justify="center">
				<SegmentedControl
					options={[
						{
							label: <Icon icon={<FiSmartphone />} />,
							value: 'phone',
						},
						{
							label: <Icon icon={<FiTablet />} />,
							value: 'tablet',
						},
						{
							label: <Icon icon={<FiMonitor />} />,
							value: 'desktop',
						},
					]}
				/>
			</Flex>
		</>
	);
};

const LayoutControls = () => {
	return (
		<Panel visible>
			<PanelHeader title="Layout" />
			<PanelBody>
				<FormGroup label="Dimensions">
					<Grid columns={2}>
						<TextInput suffix={<SuffixLabel>W</SuffixLabel>} />
						<TextInput
							id="d-h"
							suffix={<SuffixLabel>H</SuffixLabel>}
						/>
					</Grid>
				</FormGroup>
				<FormGroup label="Align">
					<SegmentedControl
						isBlock
						options={[
							{
								label: <Icon icon={<FiAlignLeft />} />,
								value: 'left',
							},
							{
								label: <Icon icon={<FiAlignCenter />} />,
								value: 'center',
							},
							{
								label: <Icon icon={<FiAlignRight />} />,
								value: 'right',
							},
						]}
					/>
				</FormGroup>
				<FormGroup label="Position">
					<Grid columns={2}>
						<TextInput suffix={<SuffixLabel>X</SuffixLabel>} />
						<TextInput
							id="pos-y"
							suffix={<SuffixLabel>Y</SuffixLabel>}
						/>
					</Grid>
				</FormGroup>
				<FormGroup label="Distribution">
					<Select options={[{ label: 'Center', value: 'center' }]} />
				</FormGroup>
				<FormGroup label="Padding">
					<View>
						<Spacer>
							<Grid columns={2}>
								<TextInput
									suffix={<SuffixLabel>PX</SuffixLabel>}
								/>
								<Stepper direction="horizontal" />
							</Grid>
						</Spacer>
						<SegmentedControl
							isBlock
							options={[
								{
									label: <Icon icon={<FiSquare />} />,
									value: 'all',
								},
								{
									label: <Icon icon={<FiMaximize />} />,
									value: 'sides',
								},
							]}
						/>
					</View>
				</FormGroup>
				<FormGroup label="Overflow">
					<SegmentedControl
						isBlock
						options={[
							{
								label: 'Show',
								value: 'show',
							},
							{
								label: 'Hide',
								value: 'hide',
							},
						]}
					/>
				</FormGroup>
			</PanelBody>
		</Panel>
	);
};

const TypographyControls = () => {
	return (
		<Panel visible>
			<PanelHeader title="Typography" />
			<PanelBody>
				<FormGroup label="Font">
					<Select options={[{ label: 'Inter', value: 'inter' }]} />
				</FormGroup>
				<FormGroup label="Style">
					<Select options={[{ label: 'Medium', value: 'medium' }]} />
				</FormGroup>
				<FormGroup label="Size">
					<Flex gap={2}>
						<FlexBlock>
							<TextInput value="16" />
						</FlexBlock>
						<FlexBlock>
							<Slider />
						</FlexBlock>
					</Flex>
				</FormGroup>
				<FormGroup label="Transform">
					<Select options={[{ label: 'None', value: 'none' }]} />
				</FormGroup>
				<FormGroup label="Dropcap">
					<Flex justify="flex-end">
						<Switch />
					</Flex>
				</FormGroup>
			</PanelBody>
		</Panel>
	);
};

const ActionsControl = () => {
	return (
		<Panel visible>
			<PanelHeader title="Actions" />
			<PanelBody>
				<Grid columns={2}>
					<Button>Save Draft</Button>
					<Button variant="primary">Publish</Button>
				</Grid>
			</PanelBody>
		</Panel>
	);
};

export const Controls = () => {
	return (
		<Sidebar>
			<Spacer />
			<ResponsiveControls />
			<Divider mb={0} mt={2} />
			<LayoutControls />
			<TypographyControls />
			<ActionsControl />
		</Sidebar>
	);
};
