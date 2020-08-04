import React from 'react';

import { Lozenge } from '../index';
import { LOZENGE_COLORS } from '../Lozenge.utils';

export default {
	component: Lozenge,
	title: 'Components/Lozenge',
};

export const _default = () => {
	const lozenges = Object.keys(LOZENGE_COLORS);

	return (
		<>
			<>
				{lozenges.map((lozenge) => (
					<Lozenge color={lozenge} isBold key={lozenge}>
						{lozenge}
					</Lozenge>
				))}
			</>
			<>
				{lozenges.map((lozenge) => (
					<Lozenge color={lozenge} key={lozenge}>
						{lozenge}
					</Lozenge>
				))}
			</>
		</>
	);
};
