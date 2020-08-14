import { ui } from '@wp-g2/styles';
import React from 'react';

import { HStack, Spacer, View } from '../../index';

export default {
	title: 'Examples/WIP',
};

const Thing = () => (
	<View
		css={[
			ui.font.default,
			ui.background.green,
			ui.padding(3),
			ui.borderRadius.round,
			ui.border.all,
			ui.animation.ease,
			ui.hover(ui.background.red, ui.offset.y(-10)),
		]}
	>
		View
	</View>
);

export const Presets = () => {
	return (
		<HStack alignment="left">
			<Thing />
			<Thing />
			<Spacer />
			<Thing />
			<Thing />
			<Thing />
			<Spacer />
			<Thing />
			<Thing />
		</HStack>
	);
};
