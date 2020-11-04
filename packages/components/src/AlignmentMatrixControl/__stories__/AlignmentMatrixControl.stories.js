import React from 'react';
import { useState } from 'react';

import { AlignmentMatrixControl } from '../index';

export default {
	component: AlignmentMatrixControl,
	title: 'Components/AlignmentMatrixControl',
};

const Example = () => {
	const [value, setValue] = useState('center center');

	return <AlignmentMatrixControl onChange={setValue} value={value} />;
};

export const _default = () => {
	return <Example />;
};
