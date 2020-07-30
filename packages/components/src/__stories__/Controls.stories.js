import { ComponentsProvider } from '@wp-g2/provider';
import { get } from '@wp-g2/styles';
import React from 'react';
import {
	FiAlignCenter,
	FiAlignLeft,
	FiAlignRight,
	FiMaximize,
	FiMonitor,
	FiSmartphone,
	FiSquare,
	FiTablet,
} from 'react-icons/fi';

import { ControlGroup, Sidebar } from '../__fixtures__/components';
import {
	Button,
	ControlLabel,
	Divider,
	Flex,
	FlexBlock,
	Grid,
	Icon,
	Panel,
	PanelBody,
	PanelHeader,
	SegmentedControl,
	Select,
	Slider,
	Spacer,
	Switch,
	Text,
	TextField,
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
				<ControlGroup>
					<ControlLabel>Dimensions</ControlLabel>
					<Grid columns={2}>
						<TextField suffix={<SuffixLabel>W</SuffixLabel>} />
						<TextField suffix={<SuffixLabel>H</SuffixLabel>} />
					</Grid>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Align</ControlLabel>
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
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Position</ControlLabel>
					<Grid columns={2}>
						<TextField suffix={<SuffixLabel>X</SuffixLabel>} />
						<TextField suffix={<SuffixLabel>Y</SuffixLabel>} />
					</Grid>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Distribution</ControlLabel>
					<Select options={[{ label: 'Center', value: 'center' }]} />
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Padding</ControlLabel>
					<Grid columns={2}>
						<TextField suffix={<SuffixLabel>PX</SuffixLabel>} />
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
					</Grid>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Overflow</ControlLabel>
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
				</ControlGroup>
			</PanelBody>
		</Panel>
	);
};

const TypographyControls = () => {
	return (
		<Panel visible>
			<PanelHeader title="Typography" />
			<PanelBody>
				<ControlGroup>
					<ControlLabel>Font</ControlLabel>
					<Select options={[{ label: 'Inter', value: 'inter' }]} />
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Style</ControlLabel>
					<Select options={[{ label: 'Medium', value: 'medium' }]} />
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Size</ControlLabel>
					<Flex gap={2}>
						<FlexBlock>
							<TextField value="16" />
						</FlexBlock>
						<FlexBlock>
							<Slider />
						</FlexBlock>
					</Flex>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Transform</ControlLabel>
					<Select options={[{ label: 'None', value: 'none' }]} />
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Dropcap</ControlLabel>
					<Flex justify="flex-end">
						<Switch />
					</Flex>
				</ControlGroup>
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
