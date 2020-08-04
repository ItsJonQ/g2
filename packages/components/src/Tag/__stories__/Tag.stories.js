import React from 'react';

import { Tag } from '../index';
import { TAG_COLORS } from '../Tag.utils';

export default {
	component: Tag,
	title: 'Components/Tag',
};

export const _default = () => {
	const tags = Object.keys(TAG_COLORS);

	return (
		<>
			{tags.map((tag) => (
				<Tag color={tag} key={tag}>
					{tag}
				</Tag>
			))}
		</>
	);
};
