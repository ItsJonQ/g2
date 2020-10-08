import {
	Button,
	Container,
	Grid,
	HStack,
	Slider,
	Spacer,
	Text,
	TextInput,
	VStack,
} from '@wp-g2/components';
import React from 'react';

export default {
	title: 'DesignTools/CombinedControls',
};

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

const CombinedControl = ({ max, min, onChange, value }) => {
	return (
		<Grid>
			<Slider max={max} min={min} onChange={onChange} value={value} />
			<TextInput
				max={max}
				min={min}
				onChange={onChange}
				type="number"
				value={value}
			/>
		</Grid>
	);
};

const Example = () => {
	const [value, setValue] = React.useState('');

	return (
		<VStack>
			<HStack>
				<Text>{value}</Text>
				<Button onClick={() => setValue(getRandomInt(400))}>
					Set Random Value
				</Button>
			</HStack>

			<CombinedControl
				max={400}
				min={20}
				onChange={setValue}
				value={value}
			/>
			<Grid>
				<Text>HTML Input</Text>
				<input
					max={400}
					min={20}
					onChange={(e) => setValue(e.target.value)}
					type="number"
					value={value}
				/>
			</Grid>
		</VStack>
	);
};

export const _default = () => {
	return (
		<Spacer my={20}>
			<Container width={400}>
				<Example />
			</Container>
		</Spacer>
	);
};
