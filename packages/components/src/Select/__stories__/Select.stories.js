import React from 'react';

import { Select } from '../index';

export default {
	component: Select,
	title: 'Components/Select',
};

export const _default = () => {
	const options = [
		{ label: 'Today', value: 'today' },
		{ label: 'Yesterday', value: 'yesterday' },
		{ label: 'Last 7 days', value: 'lastWeek' },
	];

	return <Select options={options} required />;
};

export const _groups = () => {
	const [value, setValue] = React.useState(null);

	const options = [
		{
			label: 'Frozen',
			options: [
				{
					label: 'Frozen Heart',
					value: 'frozen-heart',
				},
				{
					label: 'Do You Want To Build A Snowman?',
					value: 'do-you-want-to-build-a-snowman',
				},
				{
					label: 'First Time In Forever',
					value: 'first-time-in-forever',
				},
			],
		},
		{
			label: 'Frozen 2',
			options: [
				{
					label: 'All Is Found',
					value: 'all-is-found',
				},
				{
					label: 'Some Things Never Change',
					value: 'some-things-never-change',
				},
				{
					label: 'Into The Unknown',
					value: 'into-the-unknown',
				},
			],
		},
	];

	return (
		<>
			<Select
				onChange={setValue}
				options={options}
				placeholder="Select a song"
				value={value}
			/>
		</>
	);
};
