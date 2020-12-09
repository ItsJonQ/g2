import { ui } from '@wp-g2/styles';
import React from 'react';

import { Grid } from '../../Grid';
import { Text } from '../../Text';
import { View } from '../../View';
import { SelectDropdown } from '../index';

export default {
	component: SelectDropdown,
	title: 'Components/SelectDropdown',
};

const options = [
	{ name: 'Small', value: 'small', size: 11 },
	{ name: 'Medium', value: 'medium', size: 15 },
	{ name: 'Large', value: 'large', size: 21 },
];

export const _default = () => {
	const [value, setValue] = React.useState(options[1]);
	const handleOnChange = (next) => setValue(next.selectedItem);
	const renderItem = React.useCallback(({ name, size }) => {
		return (
			<div
				style={{
					fontSize: size,
				}}
			>
				{name}
			</div>
		);
	}, []);

	return (
		<div>
			<Grid>
				<SelectDropdown
					isPreviewable
					onChange={handleOnChange}
					options={options}
					placeholder="Element"
					renderItem={renderItem}
					value={value}
				/>
				<SelectDropdown
					onChange={handleOnChange}
					options={options}
					placeholder="Element"
					renderItem={renderItem}
					value={value}
				/>
			</Grid>
		</div>
	);
};

export const _inlineRendering = () => {
	const [value, setValue] = React.useState(options[1]);
	const handleOnChange = (next) => setValue(next.selectedItem);
	const renderItem = React.useCallback(({ name, size }) => {
		return (
			<div
				style={{
					fontSize: size,
				}}
			>
				{name}
			</div>
		);
	}, []);

	return (
		<div>
			<Text adjustLineHeightForInnerControls size={value.size}>
				A vacation is when you take a trip to some{' '}
				<SelectDropdown
					isInline
					onChange={handleOnChange}
					options={options}
					placeholder="Element"
					renderItem={renderItem}
					value={value}
				/>{' '}
				place with your. A vacation is when you take a trip to some{' '}
				<SelectDropdown
					isInline
					onChange={handleOnChange}
					options={options}
					placeholder="Element"
					renderItem={renderItem}
					value={value}
				/>{' '}
				place with your.
			</Text>
		</div>
	);
};

const presets = [
	{ name: '0px', value: '0px', size: 0 },
	{ name: '4px', value: '4px', size: 4 },
	{ name: '8px', value: '8px', size: 8 },
	{ name: '12px', value: '12px', size: 12 },
	{ name: '16px', value: '16px', size: 16 },
	{ name: '20px', value: '20px', size: 20 },
];

export const _preview = () => {
	const [value, setValue] = React.useState(presets[2]);

	const handleOnChange = (next) => {
		setValue(next.selectedItem);
	};

	return (
		<Grid>
			<SelectDropdown
				isPreviewable
				onChange={handleOnChange}
				options={presets}
				placeholder="Element"
				value={value}
			/>
			<View>
				<View
					css={{
						background: 'rgba(0, 0, 255, 0.1)',
						border: '2px solid rgba(0, 0, 255, 0.1)',
						display: 'inline-block',
					}}
					style={{ padding: value?.size }}
				>
					<View
						css={[
							{
								background: 'blue',
								color: 'white',
								width: 50,
								height: 50,
							},
							ui.alignment.content.center,
						]}
					>
						{value.value}
					</View>
				</View>
			</View>
		</Grid>
	);
};
