import { ui } from '@wp-g2/styles';
import { interpolate } from '@wp-g2/utils';
import React, { useEffect, useState } from 'react';

import { View } from '../../index';

export default {
	title: 'Examples/WIP/Utils/Interpolate',
};

const Circle = (props) => {
	return (
		<View
			{...props}
			css={[
				ui.background.blue,
				ui.frame({ height: 100, width: 100 }),
				ui.borderRadius.circle,
			]}
		/>
	);
};

const Example = () => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const updatePosition = (event) => {
			setPosition({ x: event.clientX, y: event.clientY });
		};
		document.addEventListener('mousemove', updatePosition);

		return () => {
			document.removeEventListener('mousemove', updatePosition);
		};
	}, []);

	const top = position.y - 50;
	const opacity = interpolate(position.x, [0, window.innerWidth], [1, 0]);
	const backgroundColor = interpolate(
		position.x,
		[0, window.innerWidth],
		['red', 'blue'],
	);

	return (
		<Circle
			style={{
				backgroundColor,
				left: position.x - 50,
				opacity,
				position: 'fixed',
				top,
			}}
		/>
	);
};

export const _default = () => {
	return <Example />;
};
