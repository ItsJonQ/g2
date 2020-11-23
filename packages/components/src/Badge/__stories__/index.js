import React from 'react';

import { BADGE_COLORS } from '../Badge.utils';
import { Badge } from '../index';

export default {
	component: Badge,
	title: 'Components/Badge',
};

export const _default = () => {
	const badges = Object.keys(BADGE_COLORS);

	return (
		<>
			<>
				{badges.map((badge) => (
					<Badge color={badge} isBold key={badge}>
						{badge}
					</Badge>
				))}
			</>
			<>
				{badges.map((badge) => (
					<Badge color={badge} key={badge}>
						{badge}
					</Badge>
				))}
			</>
		</>
	);
};
