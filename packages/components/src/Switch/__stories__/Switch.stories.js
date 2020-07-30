import React from 'react';

import { Switch } from '../index';

export default {
	component: Switch,
	title: 'Components/Switch',
};

export const _default = () => {
	return (
		<>
			<Switch size="large" />
			<Switch />
			<Switch size="small" />
		</>
	);
};
