import React from 'react';

import { Grid } from '../../Grid';
import { Text } from '../../Text';
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
