import React from 'react';

import { TextInput } from '../index';

export default {
	component: TextInput,
	title: 'Components/TextInput',
};

export const _default = () => {
	return <TextInput />;
};

export const multiline = () => {
	return <TextInput maxRows={6} minRows={3} multiline />;
};
