import {
	alignCenter,
	alignJustify,
	alignLeft,
	alignRight,
} from '@wordpress/icons';
import React from 'react';

import { Icon, Spacer, View } from '../../index';
import { SegmentedControl } from '../index';

export default {
	component: SegmentedControl,
	title: 'Components/SegmentedControl',
};

export const _default = () => {
	const align = [
		{
			label: <Icon icon={alignLeft} size={14} />,
			value: 'left',
		},
		{
			label: <Icon icon={alignCenter} size={14} />,
			value: 'center',
		},
		{
			label: <Icon icon={alignRight} size={14} />,
			value: 'right',
		},
		{
			label: <Icon icon={alignJustify} size={14} />,
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

	const shortLong = [
		{
			label: 'Short',
			value: 'short',
		},
		{
			label: 'Looooooooooooong',
			value: 'long',
		},
	];

	return (
		<View>
			<Spacer css={{ width: [null, 300] }}>
				<SegmentedControl isBlock options={align} />
			</Spacer>
			<Spacer>
				<SegmentedControl options={xy} />
			</Spacer>
			<Spacer>
				<SegmentedControl isAdaptiveWidth options={shortLong} />
			</Spacer>
		</View>
	);
};
