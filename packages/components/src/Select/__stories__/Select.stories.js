import React from 'react';

import { Select } from '../index';

export default {
	component: Select,
	title: 'Select',
};

export const _default = () => {
	const options = [
		{ label: 'Today', value: 'today' },
		{ label: 'Yesterday', value: 'yesterday' },
		{ label: 'Last 7 days', value: 'lastWeek' },
	];

	return <Select options={options} />;
};
