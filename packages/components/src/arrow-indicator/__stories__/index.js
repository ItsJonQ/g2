import React, { useState } from 'react';

import { ArrowIndicator } from '../index';

export default {
	component: ArrowIndicator,
	title: 'Components/ArrowIndicator',
};

const Example = () => {
	const [isDown, setIsDown] = useState(false);
	const direction = isDown ? 'down' : 'right';

	return (
		<ArrowIndicator
			direction={direction}
			onClick={() => setIsDown(!isDown)}
		/>
	);
};

export const _default = () => {
	return <Example />;
};
