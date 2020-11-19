import { ui } from '@wp-g2/styles';
import React from 'react';

import { HStack, Spacer, View } from '../../index';

export default {
	title: 'Examples/WIP/Presets',
};

const Thing = ({ children = 'View', ...props }) => (
	<View
		{...props}
		css={[
			ui.font.default,
			ui.background.green,
			ui.padding(3),
			ui.borderRadius.round,
			ui.border.all,
			ui.animation.ease,
			ui.hover(ui.background.red, ui.scale(1.2)),
			ui.mode.dark([`border: 3px solid white`]),
			ui.$('NestedThing').css([`border: 2px solid black`]),
		]}
	>
		{children}
	</View>
);

const Tammie = () => {
	return (
		<View css={[ui.scale(1), ui.hover(ui.scale(2)), ui.animation.default]}>
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
