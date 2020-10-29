import { ContextSystemProvider } from '@wp-g2/context';
import React from 'react';

import {
	Container,
	FormGroup,
	Grid,
	Select,
	Slider,
	TextInput,
	UnitInput,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/FormElementStates',
};

const ControlCluster = ({
	inputValue,
	selectValue,
	setInputValue,
	setSelectValue,
	...otherProps
}) => {
	return (
		<ContextSystemProvider value={{ FormGroup: { horizontal: false } }}>
			<Container width={480}>
				<Grid>
					<FormGroup label="Unit Input">
						<UnitInput
							{...otherProps}
							onChange={setInputValue}
							value={inputValue}
						/>
					</FormGroup>
					<FormGroup label="Text Input">
						<TextInput
							{...otherProps}
							onChange={setInputValue}
							value={inputValue}
						/>
					</FormGroup>
					<FormGroup label="Text Input + Stepper">
						<TextInput
							{...otherProps}
							arrows="stepper"
							onChange={setInputValue}
							type="number"
							value={inputValue}
						/>
					</FormGroup>
					<FormGroup label="Slider">
						<Slider
							{...otherProps}
							onChange={setInputValue}
							value={inputValue}
						/>
					</FormGroup>
					<FormGroup label="Select">
						<Select
							{...otherProps}
							onChange={setSelectValue}
							value={selectValue}
						>
							<option label="One" value="one" />
							<option label="Two" value="two" />
							<option label="Three" value="three" />
						</Select>
					</FormGroup>
				</Grid>
			</Container>
		</ContextSystemProvider>
	);
};

const Example = () => {
	const [inputValue, setInputValue] = React.useState(1);
	const [selectValue, setSelectValue] = React.useState('one');

	const clusterProps = {
		inputValue,
		setInputValue,
		selectValue,
		setSelectValue,
	};

	return (
		<VStack spacing={8}>
			<ControlCluster {...clusterProps} />
			<ControlCluster {...clusterProps} error />
		</VStack>
	);
};

export const _default = () => {
	return <Example />;
};
