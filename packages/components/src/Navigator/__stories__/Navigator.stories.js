import { styled } from '@wp-g2/styled';
import React from 'react';

import { Flex, FlexBlock, FlexItem, Surface } from '../../index';
import {
	Navigator,
	NavigatorBack,
	NavigatorLink,
	NavigatorScreen,
	NavigatorScreens,
	useNavigator,
	withNavigator,
} from '../index';

export default {
	component: Navigator,
	title: 'Navigator',
};

const Screen = styled(Surface)`
	bottom: 0;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.2);
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const Home = () => (
	<Screen>
		<h1>Home</h1>
		<ul>
			<li>
				<NavigatorLink to="Pages">Dashboard</NavigatorLink>
			</li>
			<li>
				<NavigatorLink to="Pages">Updates</NavigatorLink>
			</li>
		</ul>
		<NavigatorLink to="Pages">
			<h1>Pages</h1>
		</NavigatorLink>
	</Screen>
);

const Pages = () => (
	<Screen>
		<h1>Pages</h1>
		<NavigatorBack>Back</NavigatorBack>
	</Screen>
);

const Header = () => {
	const navigator = useNavigator();
	const isHome = navigator?.location?.pathname === 'Home';
	return (
		<h1 style={{ fontSize: isHome ? 20 : 14, transition: 'all 200ms' }}>
			Header
		</h1>
	);
};

const NavigatorHeader = withNavigator(Header);

export const _default = () => {
	return (
		<Surface
			sx={{
				border: '1px solid #ddd',
				height: 480,
				width: 320,
			}}
		>
			<Navigator initialPath="Home">
				<Flex direction="column" sx={{ height: '100%' }}>
					<FlexItem>
						<NavigatorHeader />
					</FlexItem>
					<FlexBlock sx={{ width: '100%' }}>
						<NavigatorScreens>
							<NavigatorScreen component={Home} path="Home" />
							<NavigatorScreen component={Pages} path="Pages" />
						</NavigatorScreens>
					</FlexBlock>
				</Flex>
			</Navigator>
		</Surface>
	);
};
