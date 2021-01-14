import { ui } from '@wp-g2/styles';
import React from 'react';

import { Container, Grid, Heading, VStack } from '../../index';
import { ColorPicker } from '../index';

export default {
	component: ColorPicker,
	title: 'Components/ColorPicker',
};

const Example = () => {
	const [color, setColor] = React.useState('red');

	const handleOnChange = (next, data) => {
		setColor(next);
	};

	return (
		<Container>
			<p>
				<strong>{color}</strong>
			</p>
			<VStack spacing={10}>
				<Grid gap={8}>
					<ColorPicker
						color={color}
						onChange={handleOnChange}
						width={300}
					/>
					<ColorPicker
						color={color}
						onChange={setColor}
						width={300}
					/>
				</Grid>
				<Grid gap={8}>
					<ColorPicker
						color={color}
						disableAlpha={false}
						inputType="rgb"
						onChange={setColor}
						width={300}
					/>
					<ColorPicker
						color={color}
						disableAlpha={false}
						inputType="hsl"
						onChange={setColor}
						width={300}
					/>
				</Grid>
			</VStack>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};

export const HTMLPickerTest = () => {
	const [color, setColor] = React.useState('#ff0000');

	return (
		<VStack>
			<VStack>
				<VStack>
					<VStack>
						<VStack>
							<Heading size={1}>
								<span aria-label="wave" role="img">
									👋
								</span>{' '}
								{color}
							</Heading>
							<input
								onChange={(e) => setColor(e.target.value)}
								type="color"
							/>
						</VStack>
					</VStack>
				</VStack>
			</VStack>
		</VStack>
	);
};
