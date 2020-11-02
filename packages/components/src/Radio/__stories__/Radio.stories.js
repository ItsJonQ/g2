import { ContextSystemProvider } from '@wp-g2/context';
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
	return (
		<ContextSystemProvider value={{ ControlLabel: { weight: 'bold' } }}>
			<Radio help={<Text>Help Text</Text>} label="Radio" />
		</ContextSystemProvider>
	);
};
