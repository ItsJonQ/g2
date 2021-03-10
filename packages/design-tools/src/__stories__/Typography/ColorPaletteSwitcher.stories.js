import { chevronLeft, chevronRight } from '@wordpress/icons';
import {
	Animated,
	Button,
	Container,
	HStack,
	Navigator,
	NavigatorLink,
	NavigatorScreen,
	NavigatorScreens,
	Surface,
	View,
} from '@wp-g2/components';
import { ui, css } from '@wp-g2/styles';
import React from 'react';

import { themeColorPaletteStore } from './components';
import { ColorPaletteControl } from './controls';

export default {
	title: 'DesignTools/TypographyTools/ColorPaletteSwitcher',
};

const ThemePalette = () => {
	return (
		<View css={ui.padding(2)}>
			<ColorPaletteControl prop="backgroundColor" />
		</View>
	);
};

const CorePalette = () => {
	return (
		<View css={ui.padding(2)}>
			<ColorPaletteControl
				label="Core palette"
				prop="backgroundColor"
				store={themeColorPaletteStore}
			/>
		</View>
	);
};

const screens = [
	{ component: ThemePalette, path: 'Theme' },
	{ component: CorePalette, path: 'Core' },
];

const NavigatorButton = ({ icon, ...props }) => {
	return (
		<NavigatorLink {...props}>
			<Button icon={icon} isControl isSubtle size="small" />
		</NavigatorLink>
	);
};

const Example = () => {
	return (
		<Container css={[ui.position.relative()]} width={320}>
			<Surface border>
				<Navigator initialPath="Theme">
					<HStack
						css={[
							ui.position.absolute(),
							css`
								top: 0;
								${ui.end(4)};
								width: auto;
							`,
							ui.zIndex(10),
						]}
					>
						<NavigatorButton icon={chevronLeft} isBack to="Theme" />
						<NavigatorButton icon={chevronRight} to="Core" />
					</HStack>

					<Animated layout>
						<NavigatorScreens>
							{screens.map((screen) => (
								<NavigatorScreen
									{...screen}
									key={screen.path}
								/>
							))}
						</NavigatorScreens>
					</Animated>
				</Navigator>
			</Surface>
		</Container>
	);
};

export const _default = () => {
	return <Example />;
};
