import React from 'react';

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
		<div style={{ padding: '20vh', height: '300vh' }}>
			<SelectDropdown
				onChange={handleOnChange}
				options={options}
				placeholder="Element"
				renderItem={renderItem}
				value={value}
			/>
		</div>
	);
};
