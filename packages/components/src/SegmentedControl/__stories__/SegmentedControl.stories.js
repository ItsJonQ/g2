import React from 'react';
import { FiAirplay } from 'react-icons/fi';

import { Icon, Spacer } from '../../index';
import { SegmentedControl } from '../index';

export default {
	component: SegmentedControl,
	title: 'SegmentedControl',
};

export const _default = () => {
	const options = [
		{
			label: <Icon icon={<FiAirplay />} size={14} />,
			value: 'first',
		},
		{
			label: 'Second',
			value: 'second',
		},
		{
			label: 'Third',
			value: 'third',
		},
		{
			label: 'Fourth',
			value: 'fourth',
		},
		{
			label: 'Fifth',
			value: 'fifth',
		},
	];

	return (
		<>
			<Spacer>
				<SegmentedControl options={options} />
			</Spacer>
			<Spacer>
				<SegmentedControl
					evenWidths
					options={[
						{
							label: 'Horizontal',
							value: 'horizontal',
						},
						{
							label: 'Vertical',
							value: 'vertical',
						},
					]}
				/>
			</Spacer>
		</>
	);
};
