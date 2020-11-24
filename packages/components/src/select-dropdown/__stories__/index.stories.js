import React from 'react';

import { SelectDropdown } from '../index';

export default {
	component: SelectDropdown,
	title: 'Components/SelectDropdown',
};

const items = [
	'Neptunium',
	'Plutonium',
	'Americium',
	'Curium',
	'Berkelium',
	'Californium',
	'Einsteinium',
	'Fermium',
	'Mendelevium',
	'Nobelium',
	'Lawrencium',
	'Rutherfordium',
	'Dubnium',
	'Seaborgium',
	'Bohrium',
	'Hassium',
	'Meitnerium',
	'Darmstadtium',
	'Roentgenium',
	'Copernicium',
	'Nihonium',
	'Flerovium',
	'Moscovium',
	'Livermorium',
	'Tennessine',
	'Oganesson',
];
const options = items.map((item) => ({ name: item, key: item, value: item }));

export const _default = () => {
	const [value, setValue] = React.useState(options[3]);
	const handleOnChange = (next) => setValue(next.selectedItem);
	const renderItem = ({ index, name }) => {
		return (
			<div
				style={{
					fontSize: index * 1.5,
					color: `hsl(${index * 10}, 100%, 50%)`,
				}}
			>
				{name}
			</div>
		);
	};

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
