import React from 'react';

import { Container } from '../../Container';
import { TextInput } from '../index';

export default {
	component: TextInput,
	title: 'Components/TextInput',
};

export const _default = () => {
	return <TextInput />;
};

export const number = () => {
	return (
		<Container
			css={`
				margin-top: 20vh;
			`}
			width={480}
		>
			<TextInput type="number" />
		</Container>
	);
};

export const multiline = () => {
	return <TextInput maxRows={6} minRows={3} multiline />;
};
