import React, { useState } from 'react';

import { Animated, Elevation, HStack, Placeholder, View } from '../../index';
import { ZStack } from '../index';

export default {
	component: ZStack,
	title: 'Components/ZStack',
};

const Avatar = () => {
	return (
		<Animated layout>
			<Placeholder
				css={`
					border: 3px solid black;
					border-radius: 9999px;
				`}
				height={48}
				width={48}
			/>
			<Elevation borderRadius={9999} isInteractive={false} value={3} />
		</Animated>
	);
};

const AnimatedAvatars = () => {
	const [isHover, setIsHover] = useState(false);
	const offset = isHover ? 0 : 20;

	return (
		<HStack>
			<Animated
				onHoverEnd={() => setIsHover(false)}
				onHoverStart={() => setIsHover(true)}
			>
				<ZStack isLayered={false} offset={offset}>
					<Avatar />
					<Avatar />
					<Avatar />
					<Avatar />
				</ZStack>
			</Animated>
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
