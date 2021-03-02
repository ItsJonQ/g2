import React from 'react';

import { HStack, Placeholder, View } from '../../index';
import { ZStack } from '../index';

export default {
	component: ZStack,
	title: 'Components/ZStack',
};

const Avatar = () => {
	return (
		<Placeholder
			css={`
				border: 3px solid black;
				border-radius: 9999px;
			`}
			height={48}
			width={48}
		/>
	);
};

const AnimatedAvatars = () => {
	const offset = 0;

	return (
		<HStack>
			<ZStack isLayered={false} offset={offset}>
				<Avatar />
				<Avatar />
				<Avatar />
				<Avatar />
			</ZStack>
		</HStack>
	);
};

export const _default = () => {
	return (
		<View>
			<AnimatedAvatars />
		</View>
	);
};
