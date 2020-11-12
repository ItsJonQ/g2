import React from 'react';
import { useState } from 'react';

import { AlignmentMatrixControl } from '../index';

export default {
	component: AlignmentMatrixControl,
	title: 'Components/AlignmentMatrixControl',
};

export const _default = () => {
	const [value, setValue] = useState('center center');

	return <AlignmentMatrixControl onChange={setValue} value={value} />;
};

export const _controlled = () => {
	const [value, setValue] = useState('center center');

	return (
		<>
			<AlignmentMatrixControl onChange={setValue} value={value} />
			<AlignmentMatrixControl onChange={setValue} value={value} />
		</>
	);
};
