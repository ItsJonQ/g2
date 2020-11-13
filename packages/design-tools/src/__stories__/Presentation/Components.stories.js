import {
	Button,
	Grid,
	HStack,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Select,
	Slider,
	Spacer,
	Switch,
	Text,
	TextInput,
	UnitInput,
} from '@wp-g2/components';
import { FiMaximize } from '@wp-g2/icons';
import React from 'react';

import { Wrapper } from './shared';

export default {
	title: 'DesignTools/Presentation/Components',
};

const SliderInput = (props) => {
	return (
		<Grid>
			<UnitInput {...props} />
			<Slider {...props} />
		</Grid>
	);
};

const BoxInput = ({ error, isFocused, ...props }) => {
	return (
		<HStack alignment="top">
			<Spacer>
				<Grid>
					<UnitInput {...props} error={error} isFocused={isFocused} />
					<UnitInput {...props} />
					<UnitInput {...props} />
					<UnitInput {...props} />
				</Grid>
			</Spacer>
			<Button icon={<FiMaximize />} isActive isControl isSubtle />
		</HStack>
	);
};

const TextFieldSample = ({ heading, ...props }) => {
	const [unitValue, setUnitValue] = React.useState('13px');
	const [stepperValue, setStepperValue] = React.useState('16');
	const [sliderValue, setSliderValue] = React.useState('24px');
	const [boxValue, setBoxValue] = React.useState('24px');

	return (
		<ListGroup>
			<ListGroupHeader>{heading}</ListGroupHeader>
			<Grid alignment="top" columns={5} gap={12}>
				<UnitInput
					min={0}
					onChange={setUnitValue}
					value={unitValue}
					{...props}
				/>
				<TextInput
					arrows="stepper"
					min={0}
					{...props}
					onChange={setStepperValue}
					type="number"
					value={stepperValue}
				/>
				<SliderInput
					{...props}
					min={0}
					onChange={setSliderValue}
					value={sliderValue}
				/>
				<BoxInput
					min={0}
					onChange={setBoxValue}
					value={boxValue}
					{...props}
				/>
			</Grid>
		</ListGroup>
	);
};

export const _inputTextField = () => {
	return (
		<Wrapper title="Input / TextField">
			<ListGroups spacing={10}>
				<TextFieldSample heading="Default" />
				<TextFieldSample heading="Focused" isFocused />
				<TextFieldSample error heading="Error" />
				<TextFieldSample disabled heading="Disabled" />
			</ListGroups>
		</Wrapper>
	);
};

const SelectSample = ({ heading, ...props }) => {
	const [value, setValue] = React.useState('medium');
	const options = [
		{ value: 'large', label: 'Large', dimension: '1920x1080' },
		{ value: 'medium', label: 'Medium', dimension: '1280x720' },
		{ value: 'small', label: 'Small', dimension: '852x480' },
	];

	const { dimension } = options.find((o) => o.value === value);
	const dimensionLabel = (
		<Text css={{ pointerEvents: 'none' }} variant="muted">
			{dimension}
		</Text>
	);

	return (
		<ListGroup>
			<ListGroupHeader>{heading}</ListGroupHeader>
			<Grid columns={4} gap={12}>
				<Select
					onChange={setValue}
					options={options}
					value={value}
					{...props}
				/>
				<Select
					{...props}
					onChange={setValue}
					options={options}
					suffix={dimensionLabel}
					value={value}
				/>
			</Grid>
		</ListGroup>
	);
};

export const _inputSelect = () => {
	return (
		<Wrapper title="Input / Select">
			<ListGroups spacing={10}>
				<SelectSample heading="Default" />
				<SelectSample heading="Focused" isFocused />
				<SelectSample error heading="Error" />
				<SelectSample disabled heading="Disabled" />
			</ListGroups>
		</Wrapper>
	);
};

const ToggleSample = ({ heading, ...props }) => {
	return (
		<ListGroup>
			<ListGroupHeader>{heading}</ListGroupHeader>
			<Grid columns={6}>
				<Switch defaultValue={true} {...props} />
				<Switch {...props} />
			</Grid>
		</ListGroup>
	);
};

export const _inputToggle = () => {
	return (
		<Wrapper title="Input / Toggle">
			<ListGroups spacing={10}>
				<ToggleSample heading="Default" />
				<ToggleSample heading="Focused" isFocused />
				<ToggleSample error heading="Error" />
				<ToggleSample disabled heading="Disabled" />
			</ListGroups>
		</Wrapper>
	);
};

const RangeSample = ({ heading, ...props }) => {
	return (
		<ListGroup>
			<ListGroupHeader>{heading}</ListGroupHeader>
			<Grid columns={6}>
				<Slider defaultValue={25} {...props} />
				<Slider defaultValue={75} {...props} />
				<Slider defaultValue={100} {...props} />
			</Grid>
		</ListGroup>
	);
};

export const _inputRange = () => {
	return (
		<Wrapper title="Input / Toggle">
			<ListGroups spacing={10}>
				<RangeSample heading="Default" />
				<RangeSample heading="Focused" isFocused />
				<RangeSample error heading="Error" />
				<RangeSample disabled heading="Disabled" />
			</ListGroups>
		</Wrapper>
	);
};
