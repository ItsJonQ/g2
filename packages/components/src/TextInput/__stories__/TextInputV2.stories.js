import React from 'react';

import { Container, Grid, Text } from '../../index';
import { NumberInput } from './NumberInput';
import { PresetInput } from './PresetInput';
import { TextInput } from './TextInput';
import { UnitInput } from './UnitInput';

export default {
	title: 'Components/TextInputV2',
};

const Example = () => {
	const [value, setValue] = React.useState('123');

	const presets = [
		{
			label: 'Tiny Tiny',
			key: 'small',
			value: '9px',
		},
		{
			label: 'Medium Sized',
			key: 'medium',
			value: '17px',
		},
		{
			label: 'Largeeeee',
			key: 'large',
			value: '28px',
		},
	];

	return (
		<Container width={480}>
			<p>
				<Text>CSS Prop: margin</Text>
			</p>
			<Grid>
				<Text>Text</Text>
				<TextInput
					onBlur={() => console.log('blur')}
					onChange={setValue}
					value={value}
				/>
			</Grid>
			<Grid>
				<Text>Number</Text>
				<NumberInput
					onBlur={() => console.log('blur')}
					onChange={setValue}
					value={value}
				/>
			</Grid>
			<Grid>
				<Text>Unit</Text>
				<UnitInput
					cssProp="margin"
					onBlur={() => console.log('blur')}
					onChange={setValue}
					value={value}
				/>
			</Grid>
			<Grid>
				<Text>Preset</Text>
				<PresetInput
					cssProp="margin"
					onBlur={() => console.log('blur')}
					onChange={setValue}
					presets={presets}
					value={value}
				/>
			</Grid>
			State: {value}
			<br />
			<button
				onClick={() =>
					setValue((prev) => {
						return prev.toString().split('').reverse().join('');
					})
				}
			>
				Force Controlled Update
			</button>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
