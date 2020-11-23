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
	return (
		<div style={{ padding: '20vh', height: '300vh' }}>
			<SelectDropdown
				options={options}
				placeholder="Element"
				value="Oganesson"
			/>
		</div>
	);
};
