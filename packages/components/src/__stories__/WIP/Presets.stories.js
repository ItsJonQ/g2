import { system } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../../index';

export default {
	title: 'Examples/WIP',
};

const { font } = system;

export const Presets = () => {
	return <Text css={[font.title, font.italic, font.size(23)]}>Text</Text>;
};
