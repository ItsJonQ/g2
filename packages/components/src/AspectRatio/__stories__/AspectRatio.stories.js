import React from 'react';

import { AspectRatio } from '../index';

export default {
	component: AspectRatio,
	title: 'Components/AspectRatio',
};

export const _default = () => {
	return (
		<AspectRatio css={{ width: 400 }} ratio={16 / 9}>
			<img alt="random" src="https://picsum.photos/id/237/1280/720" />
		</AspectRatio>
	);
};
