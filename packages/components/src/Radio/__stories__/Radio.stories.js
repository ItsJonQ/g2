import React from 'react';

import { Text } from '../../index';
import { Radio } from '../index';

export default {
	component: Radio,
	title: 'Components/Radio',
};

export const _default = () => {
	return <Radio label="Radio" />;
};

export const _help = () => {
	return <Radio help={<Text>Help text</Text>} label="Radio" />;
};
