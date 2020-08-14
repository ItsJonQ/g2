import { system } from '@wp-g2/styles';
import React from 'react';

import { Text } from '../../index';

export default {
	title: 'Examples/WIP',
};

export const Presets = () => {
	return (
		<Text
			css={[
				system.font.smallCaps,
				system.background.green,
				system.border.all,
				system.borderRadius.round,
				system.padding.top(3),
				system.padding.bottom(3),
				system.shadow({ radius: 10 }),
			]}
		>
			Text
		</Text>
	);
};
