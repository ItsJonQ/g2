import { ContextSystemProvider } from '@wp-g2/context';
import React from 'react';

import {
	Button,
	Container,
	FormGroup,
	Grid,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Select,
	Slider,
	Switch,
	TextInput,
	UnitInput,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/FormElementStates',
};

const ControlCluster = ({
	heading,
	inputValue,
	selectValue,
	setInputValue,
	setSelectValue,
	setSwitchValue,
	switchValue,
	...otherProps
}) => {
	return (
		<ListGroup>
			<ListGroupHeader>{heading}</ListGroupHeader>
			<ContextSystemProvider value={{ FormGroup: { horizontal: false } }}>
				<Grid columns={8}>
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
					<FormGroup label="Button">
						<Button
							disabled={otherProps.disabled}
							isBlock
							isDestructive={otherProps.error}
							isFocused={otherProps.isFocused}
							variant="primary"
						>
							Button
						</Button>
					</FormGroup>
					<FormGroup label="Switch">
						<Switch
							checked={switchValue}
							disabled={otherProps.disabled}
							isDestructive={otherProps.error}
							isFocused={otherProps.isFocused}
							onChange={setSwitchValue}
						/>
					</FormGroup>
				</Grid>
			</ContextSystemProvider>
		</ListGroup>
	);
};

const Example = () => {
	const [inputValue, setInputValue] = React.useState(1);
	const [selectValue, setSelectValue] = React.useState('one');
	const [switchValue, setSwitchValue] = React.useState(false);

	const clusterProps = {
		inputValue,
		setInputValue,
		selectValue,
		setSelectValue,
		switchValue,
		setSwitchValue,
	};

	return (
		<Container
			css={`
				margin-top: 10vh;
				margin-bottom: 20vh;
			`}
		>
			<ListGroups separator spacing={12}>
				<ControlCluster {...clusterProps} heading="Default" />
				<ControlCluster {...clusterProps} heading="Focused" isFocused />
				<ControlCluster {...clusterProps} disabled heading="Disabled" />
				<ControlCluster {...clusterProps} error heading="Error" />
				<ControlCluster
					{...clusterProps}
					error
					heading="Error + Focused"
					isFocused
				/>
				<ControlCluster
					{...clusterProps}
					disabled
					error
					heading="Error + Disabled"
				/>
			</ListGroups>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
