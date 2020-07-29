import React from 'react';

import { TextField } from '../index';

export default {
	component: TextField,
	title: 'TextField',
};

export const _default = () => {
	return <TextField />;
};

export const multiline = () => {
	return <TextField maxRows={6} minRows={3} multiline />;
};
