import React from 'react';

import { Container, Grid, Text } from '../../index';
import { NumberInput } from './NumberInput';
import { TextInput } from './TextInput';
import { UnitInput } from './UnitInput';

export default {
	title: 'Components/TextInputV2',
};

const Example = () => {
	const [value, setValue] = React.useState('123');

	return (
		<Container width={480}>
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
					onBlur={() => console.log('blur')}
					onChange={setValue}
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
