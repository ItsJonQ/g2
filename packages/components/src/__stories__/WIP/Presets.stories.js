import { ui } from '@wp-g2/styles';
import React from 'react';

import { HStack, View } from '../../index';

export default {
	title: 'Examples/WIP/Presets',
};

const Tammie = () => {
	return (
		<View
			css={[
				ui.padding(5),
				ui.background.blue,
				ui.scale(1),
				ui.hover(ui.scale(1.5), ui.background.orange),
				ui.animation.default,
				{
					boxShadow: ui.flow(
						ui.calc(ui.get('controlHeight'), '+', ui.value.px(40)),
						ui.get('gridBase'),
						ui.calc('calc(1px + 20px)', '+', 'calc(1px + 20px)'),
						ui.get('colorAdmin'),
					),
				},
			]}
		>
			Tammie!
			<span>TEA!</span>
		</View>
	);
};

export const _default = () => {
	return (
		<HStack alignment="left">
			<Tammie />
		</HStack>
	);
};
