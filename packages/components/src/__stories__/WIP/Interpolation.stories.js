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

	const left = interpolate(position.x, [0, 100, 1000], [0, 20, 750]) - 50;
	const top = position.y - 50;

	return (
		<Circle
			style={{
				left,
				position: 'fixed',
				top,
			}}
		/>
	);
};

export const _default = () => {
	return <Example />;
};
