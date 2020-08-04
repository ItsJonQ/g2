import React from 'react';

import { List, ListItem } from '../index';

export default {
	component: List,
	title: 'Components/List',
};

export const _default = () => {
	return (
		<List type="ordered">
			<ListItem>One</ListItem>
			<ListItem>Two</ListItem>
			<ListItem>Three</ListItem>
		</List>
	);
};
