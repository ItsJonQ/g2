import React from 'react';

import { Grid } from '../../Grid';
import { FontSizeControl } from '../index';

export default {
	component: FontSizeControl,
	title: 'Components/FontSizeControl',
};

const fontSizes = [
	{
		name: 'Small',
		slug: 'small',
		size: 12,
	},
	{
		name: 'Normallllllllllllllllllllllll Normalllllllllllllllllll',
		slug: 'normal',
		size: 16,
	},
	{
		name: 'Big',
		slug: 'big',
		size: 26,
	},
];

export const _default = () => {
	const [value, setValue] = React.useState(fontSizes[1].size);

	const handleOnChange = (next) => {
		setValue(next);
	};

	const renderItem = React.useCallback(({ name, size }) => {
		return (
			<div
				style={{
					fontSize: size,
				}}
			>
				{name}
			</div>
		);
	}, []);

	return (
		<div>
			<Grid templateColumns="260px 260px 1fr">
				<FontSizeControl
					fontSizes={fontSizes}
					isPreviewable
					onChange={handleOnChange}
					placeholder="Element"
					renderItem={renderItem}
					value={value}
					withSlider
				/>
				<FontSizeControl
					fontSizes={fontSizes}
					onChange={handleOnChange}
					placeholder="Element"
					renderItem={renderItem}
					value={value}
				/>
			</Grid>
		</div>
	);
};
