import React from 'react';

import { Switch } from '../index';

export default {
	component: Switch,
	title: 'Components/Switch',
};

export const _default = () => {
	return (
		<>
			<Switch onChange={console.log} size="large" />
			<Switch onChange={console.log} />
			<Switch onChange={console.log} size="small" />
		</>
	);
};
