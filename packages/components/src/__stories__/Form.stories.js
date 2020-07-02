import React from 'react';

import { BaseView, Grid, InputControl, Text } from '../index';

export default {
	title: 'Form',
};

const Label = (props) => (
	<Grid
		as="label"
		align="center"
		mb={3}
		templateColumns="100px 1fr"
		{...props}
	/>
);

export const _default = () => {
	return (
		<BaseView m="auto" sx={{ maxWidth: 300 }}>
			<Label>
				<Text>Label</Text>
				<InputControl />
			</Label>
			<Label>
				<Text>Label</Text>
				<InputControl />
			</Label>
			<Label>
				<Text>Label</Text>
				<InputControl />
			</Label>
			<Label>
				<Text>Label</Text>
				<InputControl />
			</Label>
			<Label>
				<Text>Label</Text>
				<InputControl />
			</Label>
		</BaseView>
	);
};
