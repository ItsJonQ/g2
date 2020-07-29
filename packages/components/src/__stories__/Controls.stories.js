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

import {
	BaseView,
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
	Text,
	TextField,
} from '../index';

export default {
	title: 'Example/Controls',
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

const ControlGroup = (props) => <Grid templateColumns={'1fr 2fr'} {...props} />;

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
					<Spacer>
						<Grid columns={2}>
							<TextField suffix={<SuffixLabel>W</SuffixLabel>} />
							<TextField suffix={<SuffixLabel>H</SuffixLabel>} />
						</Grid>
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Align</ControlLabel>
					<Spacer>
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
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Position</ControlLabel>
					<Spacer>
						<Grid columns={2}>
							<TextField suffix={<SuffixLabel>X</SuffixLabel>} />
							<TextField suffix={<SuffixLabel>Y</SuffixLabel>} />
						</Grid>
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Distribution</ControlLabel>
					<Spacer>
						<Select
							options={[{ label: 'Center', value: 'center' }]}
						/>
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Padding</ControlLabel>
					<Spacer>
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
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Overflow</ControlLabel>
					<Spacer>
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
					</Spacer>
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
					<Spacer>
						<Select
							options={[{ label: 'Inter', value: 'inter' }]}
						/>
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Style</ControlLabel>
					<Spacer>
						<Select
							options={[{ label: 'Medium', value: 'medium' }]}
						/>
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Size</ControlLabel>
					<Spacer>
						<Flex gap={2}>
							<FlexBlock>
								<TextField value="16" />
							</FlexBlock>
							<FlexBlock>
								<Slider />
							</FlexBlock>
						</Flex>
					</Spacer>
				</ControlGroup>
				<ControlGroup>
					<ControlLabel>Transform</ControlLabel>
					<Spacer>
						<Select options={[{ label: 'None', value: 'none' }]} />
					</Spacer>
				</ControlGroup>
			</PanelBody>
		</Panel>
	);
};

export const _default = () => {
	return (
		<ComponentsProvider
			value={{
				Grid: { gap: 8 },
				Icon: { size: 16 },
			}}
		>
			<BaseView
				css={`
					width: 280px;
					position: absolute;
					min-height: 100%;
					top: 0;
					right: 0;
					border-left: 1px solid ${get('surfaceBorderColor')};
					padding: 16px 0;
				`}
			>
				<ResponsiveControls />
				<Divider mb={0} mt={2} />
				<LayoutControls />
				<TypographyControls />
			</BaseView>
		</ComponentsProvider>
	);
};
