import React from 'react';
import {
	FiAlignCenter,
	FiAlignJustify,
	FiAlignLeft,
	FiAlignRight,
} from 'react-icons/fi';

import { Icon, Spacer } from '../../index';
import { SegmentedControl } from '../index';

export default {
	component: SegmentedControl,
	title: 'SegmentedControl',
};

export const _default = () => {
	const align = [
		{
			label: <Icon icon={<FiAlignLeft />} size={14} />,
			value: 'left',
		},
		{
			label: <Icon icon={<FiAlignCenter />} size={14} />,
			value: 'center',
		},
		{
			label: <Icon icon={<FiAlignRight />} size={14} />,
			value: 'right',
		},
		{
			label: <Icon icon={<FiAlignJustify />} size={14} />,
			value: 'justify',
		},
	];

	const xy = [
		{
			label: 'Horizontal',
			value: 'horizontal',
		},
		{
			label: 'Vertical',
			value: 'vertical',
		},
	];

	return (
		<>
			<Spacer>
				<SegmentedControl options={align} />
			</Spacer>
			<Spacer>
				<SegmentedControl evenWidths options={xy} />
			</Spacer>
		</>
	);
};
