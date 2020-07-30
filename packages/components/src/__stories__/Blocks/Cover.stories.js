import * as icons from '@wordpress/icons';
import { useControlledState } from '@wp-g2/utils';
import React, { useLayoutEffect, useRef, useState } from 'react';

import { ControlGroup, Sidebar } from '../../__fixtures__/components';
import {
	Button,
	CardBody,
	CardHeader,
	ColorField,
	ColorPicker,
	ControlLabel,
	Flex,
	FlexBlock,
	Grid,
	Icon,
	Panel,
	PanelBody,
	PanelHeader,
	Placeholder,
	Popover,
	PopoverContent,
	PopoverTrigger,
	SegmentedControl,
	Select,
	Slider,
	Spacer,
	Text,
	TextField,
	View,
} from '../../index';

export default {
	title: 'Examples/Blocks',
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

const UnitSelect = () => <Select options={[{ label: 'PX', value: 'px' }]} />;

const ContextPopover = ({ children, title, trigger }) => {
	const [offset, setOffset] = useState(0);
	const triggerRef = useRef();

	useLayoutEffect(() => {
		requestAnimationFrame(() => {
			const node = triggerRef.current;
			if (node) {
				setOffset(node.offsetLeft);
			}
		});
	}, []);

	return (
		<Popover placement="right-start" unstable_offset={[0, 12]}>
			<PopoverTrigger
				as={View}
				css={{ outline: 'none' }}
				ref={triggerRef}
			>
				{trigger}
			</PopoverTrigger>
			<PopoverContent maxWidth={280} style={{ right: offset }}>
				<CardHeader>
					<Text weight={600}>{title}</Text>
				</CardHeader>
				<CardBody>{children}</CardBody>
			</PopoverContent>
		</Popover>
	);
};

// TODO: Sidebar/Panel Popovers HAVE to be easier.
const ColorControl = ({ color: colorProp }) => {
	const [color, setColor] = useControlledState(colorProp, {
		fallback: 'purple',
	});

	return (
		<ControlGroup>
			<ControlLabel>Tint</ControlLabel>
			<Grid columns={2}>
				<ContextPopover
					title="Tint"
					trigger={<ColorField color={color} />}
				>
					<Spacer>
						<ColorPicker color={color} onChange={setColor} />
					</Spacer>
					<ControlGroup>
						<ControlLabel>Opacity</ControlLabel>
						<Flex>
							<FlexBlock>
								<TextField value="50%" />
							</FlexBlock>
							<FlexBlock>
								<Slider />
							</FlexBlock>
						</Flex>
					</ControlGroup>
				</ContextPopover>
				<Button variant="tertiary">Clear</Button>
			</Grid>
		</ControlGroup>
	);
};

const MediaControl = () => {
	return (
		<ControlGroup>
			<ControlLabel>Media</ControlLabel>
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
					<ControlGroup>
						<ControlLabel>Focal Point</ControlLabel>
						<Grid columns={2}>
							<TextField suffix={<SuffixLabel>X</SuffixLabel>} />
							<TextField suffix={<SuffixLabel>Y</SuffixLabel>} />
						</Grid>
					</ControlGroup>
					<ControlGroup>
						<ControlLabel>Position</ControlLabel>
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
					</ControlGroup>
				</ContextPopover>
				<Button variant="tertiary">Clear</Button>
			</Grid>
		</ControlGroup>
	);
};

const InspectorControl = () => {
	return (
		<>
			<Panel visible>
				<PanelHeader title="Layout" />
				<PanelBody>
					<ControlGroup templateColumns="1fr 2fr">
						<ControlLabel>Align</ControlLabel>
						<SegmentedControl
							options={[
								{
									label: <Icon icon={icons.alignLeft} />,
									value: 'left',
								},
								{
									label: <Icon icon={icons.alignCenter} />,
									value: 'center',
								},
								{
									label: <Icon icon={icons.alignRight} />,
									value: 'right',
								},
								{
									label: <Icon icon={icons.stretchWide} />,
									value: 'wide',
								},
								{
									label: (
										<Icon icon={icons.stretchFullWidth} />
									),
									value: 'full',
								},
							]}
						/>
					</ControlGroup>
					<ControlGroup>
						<ControlLabel>Height</ControlLabel>
						<Grid templateColumns="1.2fr 0.8fr">
							<TextField />
							<UnitSelect />
						</Grid>
					</ControlGroup>
					<ControlGroup>
						<ControlLabel>Position</ControlLabel>
						<Select
							options={[{ label: 'Center', value: 'center' }]}
						/>
					</ControlGroup>
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
					<Spacer>
						<ControlLabel>Title</ControlLabel>
						<TextField />
					</Spacer>
					<Spacer>
						<ControlLabel>HTML Anchor</ControlLabel>
						<TextField />
					</Spacer>
					<Spacer>
						<ControlLabel>CSS Classes</ControlLabel>
						<TextField />
					</Spacer>
				</PanelBody>
			</Panel>
		</>
	);
};

export const Cover = () => {
	return (
		<Sidebar>
			<InspectorControl />
		</Sidebar>
	);
};
