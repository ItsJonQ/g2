import {
	alignCenter,
	alignJustify,
	alignLeft,
	alignRight,
	fullscreen,
} from '@wordpress/icons';
import { useControlledState } from '@wp-g2/utils';
import React from 'react';

import {
	ContextPopover,
	Sidebar,
	SuffixLabel,
} from '../../__fixtures__/components';
import {
	Button,
	ColorField,
	ColorPicker,
	Flex,
	FlexBlock,
	FormGroup,
	Grid,
	Icon,
	Panel,
	PanelBody,
	PanelHeader,
	Placeholder,
	SegmentedControl,
	Select,
	Slider,
	Spacer,
	TextInput,
} from '../../index';

export default {
	title: 'Examples/Blocks/Cover',
};

const UnitSelect = () => <Select options={[{ label: 'PX', value: 'px' }]} />;

// TODO: Sidebar/Panel Popovers HAVE to be easier.
const ColorControl = ({ color: colorProp }) => {
	const [color, setColor] = useControlledState(colorProp, {
		fallback: 'purple',
	});

	return (
		<FormGroup label="Tint">
			<Grid columns={2}>
				<ContextPopover
					title="Tint"
					trigger={<ColorField color={color} />}
				>
					<Spacer>
						<ColorPicker color={color} onChange={setColor} />
					</Spacer>
					<FormGroup label="Opacity">
						<Flex>
							<FlexBlock>
								<TextInput value="50%" />
							</FlexBlock>
							<FlexBlock>
								<Slider />
							</FlexBlock>
						</Flex>
					</FormGroup>
				</ContextPopover>
				<Button variant="tertiary">Clear</Button>
			</Grid>
		</FormGroup>
	);
};

const MediaControl = () => {
	return (
		<FormGroup label="Media">
			<Grid columns={2}>
				<ContextPopover
					title="Media"
					trigger={
						<Placeholder css={{ background: 'blue' }} height={30} />
					}
				>
					<Spacer>
						<Placeholder
							css={{ background: 'blue' }}
							height={140}
							width="100%"
						/>
					</Spacer>
					<FormGroup label="Focal Point">
						<Grid columns={2}>
							<TextInput suffix={<SuffixLabel>X</SuffixLabel>} />
							<TextInput suffix={<SuffixLabel>Y</SuffixLabel>} />
						</Grid>
					</FormGroup>
					<FormGroup label="Position">
						<SegmentedControl
							options={[
								{
									label: 'Static',
									value: 'static',
								},
								{
									label: 'Fixed',
									value: 'fixed',
								},
							]}
						/>
					</FormGroup>
				</ContextPopover>
				<Button variant="tertiary">Clear</Button>
			</Grid>
		</FormGroup>
	);
};

const InspectorControl = () => {
	return (
		<>
			<Panel visible>
				<PanelHeader title="Layout" />
				<PanelBody>
					<FormGroup label="Align" templateColumns="1fr 2fr">
						<SegmentedControl
							options={[
								{
									label: <Icon icon={alignLeft} />,
									value: 'left',
								},
								{
									label: <Icon icon={alignCenter} />,
									value: 'center',
								},
								{
									label: <Icon icon={alignRight} />,
									value: 'right',
								},
								{
									label: <Icon icon={alignJustify} />,
									value: 'wide',
								},
								{
									label: <Icon icon={fullscreen} />,
									value: 'full',
								},
							]}
						/>
					</FormGroup>
					<FormGroup label="Height">
						<Grid templateColumns="1.2fr 0.8fr">
							<TextInput />
							<UnitSelect />
						</Grid>
					</FormGroup>
					<FormGroup label="Position">
						<Select
							options={[{ label: 'Center', value: 'center' }]}
						/>
					</FormGroup>
				</PanelBody>
			</Panel>
			<Panel visible>
				<PanelHeader title="Background" />
				<PanelBody>
					<MediaControl />
					<ColorControl />
				</PanelBody>
			</Panel>
			<Panel>
				<PanelHeader title="Advanced" />
				<PanelBody>
					<FormGroup label="Title">
						<TextInput />
					</FormGroup>
					<FormGroup label="HTML Anchor">
						<TextInput />
					</FormGroup>
					<FormGroup label="CSS Classes">
						<TextInput />
					</FormGroup>
				</PanelBody>
			</Panel>
		</>
	);
};

export const _default = () => {
	return (
		<Sidebar>
			<InspectorControl />
		</Sidebar>
	);
};
