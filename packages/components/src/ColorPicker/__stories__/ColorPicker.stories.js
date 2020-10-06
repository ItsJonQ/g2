import React from 'react';

import { ColorPicker } from '../index';

export default {
	component: ColorPicker,
	title: 'Components/ColorPicker',
};

const Example = () => {
	const [color, setColor] = React.useState('red');
	return (
		<>
			<p>{color}</p>
			<p>
				<input
					onChange={(e) => setColor(e.target.value)}
					type="color"
					value={color}
				/>
			</p>
			<ColorPicker color={color} onChange={setColor} width={300} />
		</>
	);
};

export const _default = () => {
	return <Example />;
};
