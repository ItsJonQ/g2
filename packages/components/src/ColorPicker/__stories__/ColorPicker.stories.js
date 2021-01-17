import { ui } from '@wp-g2/styles';
import React from 'react';
import tinyColor from 'tinycolor2';

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
						disableAlpha={false}
						inputType="rgb"
						onChange={handleOnChange}
						width={300}
					/>
					<div>
						<button
							onClick={() =>
								setColor(tinyColor.random().toRgbString())
							}
						>
							Set Random Color
						</button>
					</div>
				</Grid>
			</VStack>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};

export const BasicTest = () => {
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
					<input
						onChange={(e) => setColor(e.target.value)}
						type="color"
						value={ui.color(color).toHexString()}
					/>
				</Grid>
			</VStack>
		</Container>
	);
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
