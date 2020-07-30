import * as icons from '@wordpress/icons';
import { get, styled } from '@wp-g2/styles';
import { useControlledState } from '@wp-g2/utils';
import React, { useEffect, useRef, useState } from 'react';

import { ControlGroup, Sidebar } from '../../__fixtures__/components';
import {
	BaseView,
	Button,
	CardBody,
	CardHeader,
	ColorPicker,
	ColorSwatch,
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

const ColorPickerButtonView = styled.button`
	appearance: none;
	background-color: ${get('controlBackgroundColor')};
	border: 1px solid transparent;
	border-radius: 3px;
	cursor: pointer;
	display: block;
	height: ${get('controlHeight')};
	padding: 3px;
	width: 100%;

	&:focus {
		border-color: ${get('colorAdmin')};
		outline: none;
	}
`;

const ContextPopover = ({ children, title, trigger }) => {
	const [offset, setOffset] = useState(0);
	const triggerRef = useRef();

	useEffect(() => {
		const node = triggerRef.current;

		if (node) {
			setOffset(node.offsetLeft);
		}
	}, []);

	return (
		<Popover placement="right-start" unstable_offset={[0, 12]}>
			<PopoverTrigger
				as={BaseView}
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
			<Spacer>
				<Grid columns={2}>
					<ContextPopover
						title="Tint"
						trigger={
							<ColorPickerButtonView>
								<ColorSwatch color={color} />
							</ColorPickerButtonView>
						}
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
					<Button size="small" variant="tertiary">
						Clear
					</Button>
				</Grid>
			</Spacer>
		</ControlGroup>
	);
};

const MediaControl = () => {
	return (
		<ControlGroup>
			<ControlLabel>Media</ControlLabel>
			<Spacer>
				<Grid columns={2}>
					<ContextPopover
						title="Media"
						trigger={
							<Placeholder
								css={{ background: 'blue' }}
								height={30}
							/>
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
							<Spacer>
								<Grid columns={2}>
									<TextField
										suffix={<SuffixLabel>X</SuffixLabel>}
									/>
									<TextField
										suffix={<SuffixLabel>Y</SuffixLabel>}
									/>
								</Grid>
							</Spacer>
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
					<Button size="small" variant="tertiary">
						Clear
					</Button>
				</Grid>
			</Spacer>
		</ControlGroup>
	);
};

const InspectorControl = () => {
	return (
		<>
			<Panel visible>
				<PanelHeader title="Layout" />
				<PanelBody>
					<Spacer>
						<ControlGroup templateColumns="1fr 2fr">
							<ControlLabel>Align</ControlLabel>
							<SegmentedControl
								options={[
									{
										label: <Icon icon={icons.alignLeft} />,
										value: 'left',
									},
									{
										label: (
											<Icon icon={icons.alignCenter} />
										),
										value: 'center',
									},
									{
										label: <Icon icon={icons.alignRight} />,
										value: 'right',
									},
									{
										label: (
											<Icon icon={icons.stretchWide} />
										),
										value: 'wide',
									},
									{
										label: (
											<Icon
												icon={icons.stretchFullWidth}
											/>
										),
										value: 'full',
									},
								]}
							/>
						</ControlGroup>
					</Spacer>
					<ControlGroup>
						<ControlLabel>Height</ControlLabel>
						<Spacer>
							<ControlGroup templateColumns="1.2fr 0.8fr">
								<TextField />
								<UnitSelect />
							</ControlGroup>
						</Spacer>
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
			<Panel visible>
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