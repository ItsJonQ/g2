import React from 'react';

import { UnitInput } from '../index';

export default {
	component: UnitInput,
	title: 'Components/UnitInput',
};

const Example = () => {
	const [value, setValue] = React.useState('13px');

	return <UnitInput onChange={setValue} value={value} />;
};

export const _default = () => {
	return <Example />;
};
