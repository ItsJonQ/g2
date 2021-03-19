import { ContextSystemProvider } from '@wp-g2/context';
import { ui } from '@wp-g2/styles';
import React from 'react';

import {
	CardHeader,
	Heading,
	Navigator,
	NavigatorScreen,
	NavigatorScreens,
	View,
} from '../../index';
import { ColorsScreen, GlobalStylesScreen } from './screens';
import { AppProvider } from './state/AppState';

const ANIMATION_SPEED = 0.1;

export default {
	title: 'Examples/WIP/GlobalStylesSidebarV2',
};

const GlobalStylesHeader = () => {
	return (
		<CardHeader>
			<Heading size={5}>Global Styles</Heading>
		</CardHeader>
	);
};

const screens = [
	{
		component: GlobalStylesScreen,
		path: 'GlobalStyles',
		title: 'Global Styles',
	},
	{
		component: ColorsScreen,
		path: 'Colors',
		title: 'Colors',
	},
];

const Sidebar = ({ children }) => {
	return (
		<ContextSystemProvider
			value={{
				Grid: { gap: 2 },
				Icon: { size: 16 },
			}}
		>
			<View
				css={`
					width: 280px;
					position: absolute;
					height: 100vh;
					top: 0;
					right: 0;
					border-left: 1px solid ${ui.get('colorDivider')};
				`}
			>
				{children}
			</View>
		</ContextSystemProvider>
	);
};

const Example = (props) => {
	const initialPath = 'Colors';
	return (
		<AppProvider>
			<Navigator initialPath={initialPath}>
				<GlobalStylesHeader />
				<NavigatorScreens css={[ui.frame.height('auto')]}>
					{screens.map((screen) => (
						<NavigatorScreen
							{...screen}
							animationEnterDelay={0}
							animationEnterDuration={ANIMATION_SPEED}
							animationExitDuration={ANIMATION_SPEED}
							key={screen.path}
						/>
					))}
				</NavigatorScreens>
			</Navigator>
		</AppProvider>
	);
};

export const GlobalStylesSidebar = () => {
	return (
		<div>
			<Sidebar>
				<Example />
			</Sidebar>
		</div>
	);
};
