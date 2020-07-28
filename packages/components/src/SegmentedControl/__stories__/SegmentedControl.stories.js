import React from 'react';
import { FiAirplay } from 'react-icons/fi';

import { Icon } from '../../index';
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
	];
	return <SegmentedControl options={options} />;
};
