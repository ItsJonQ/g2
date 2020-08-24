import React from 'react';

import { View } from '../../index';
import { Image } from '../index';

export default {
	component: Image,
	title: 'Components/Image',
};

export const _default = () => {
	return (
		<View>
			<Image
				alt="random"
				src="https://picsum.photos/seed/picsum/200/300"
			/>
			<Image
				alt="random"
				aspectRatio={16 / 9}
				src="https://picsum.photos/seed/picsum/200/300"
				width={300}
			/>
		</View>
	);
};
