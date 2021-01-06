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
	const [value, setValue] = React.useState(undefined);

	const handleOnChange = (next) => {
		setValue(next);
	};

	return (
		<div>
			<Grid templateColumns="260px 260px 1fr">
				<FontSizeControl
					fontSizes={fontSizes}
					isPreviewable
					onChange={handleOnChange}
					placeholder="Element"
					value={value}
					withSlider
				/>
				<FontSizeControl
					fontSizes={fontSizes}
					onChange={handleOnChange}
					placeholder="Element"
					value={value}
				/>
			</Grid>
		</div>
	);
};

export const _periodicRerender = () => {
	const [timer, setTimer] = React.useState(0);
	const [value, setValue] = React.useState(undefined);

	const handleOnChange = (next) => {
		console.log('handleOnChange', next, value);
		setValue(next);
	};

	React.useEffect(() => {
		const timeout = setTimeout(() => {
			setTimer(timer + 1);
		}, 1000);
		return () => clearTimeout(timeout);
	}, [timer]);

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
			{timer}
			<Grid templateColumns="260px 260px 1fr">
				<FontSizeControl
					fontSizes={fontSizes}
					onChange={handleOnChange}
					renderItem={renderItem}
					value={value}
				/>
			</Grid>
		</div>
	);
};
