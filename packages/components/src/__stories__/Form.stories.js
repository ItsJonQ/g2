import React from 'react';

import { BaseView, Grid, Text, TextInput } from '../index';

export default {
	title: 'Example/Form',
};

const Label = (props) => (
	<Grid
		align="center"
		as="label"
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
				<TextInput />
			</Label>
			<Label>
				<Text>Label</Text>
				<TextInput />
			</Label>
			<Label>
				<Text>Label</Text>
				<TextInput />
			</Label>
			<Label>
				<Text>Label</Text>
				<TextInput />
			</Label>
			<Label>
				<Text>Label</Text>
				<TextInput />
			</Label>
		</BaseView>
	);
};
