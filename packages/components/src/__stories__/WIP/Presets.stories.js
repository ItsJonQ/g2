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
			ui.$('NestedThing').css([`border: 2px solid black`]),
		]}
	>
		{children}
	</View>
);

export const _default = () => {
	return (
		<HStack alignment="left">
			<Thing>
				<Thing {...ui.$('NestedThing')}>Nested View</Thing>
			</Thing>
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
