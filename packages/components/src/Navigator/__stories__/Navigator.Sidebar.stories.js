import { FiArrowLeft } from '@wp-g2/icons';
import { styled, ThemeProvider } from '@wp-g2/styles';
import React from 'react';
import { animated, useSpring } from 'react-spring';

import {
	BaseView,
	Flex,
	FlexBlock,
	FlexItem,
	Heading,
	Icon,
	Surface,
	Text,
} from '../../index';
import {
	Navigator,
	NavigatorBack,
	NavigatorLink,
	NavigatorScreen,
	NavigatorScreens,
	useNavigator,
	useQuery,
	withNavigator,
} from '../index';

export default {
	component: Navigator,
	title: 'Components/Navigator',
};

const Screen = styled(Surface)`
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const Home = () => (
	<Screen>
		<ul>
			<li>
				<NavigatorLink params={{ id: 'Acme' }} to="Organization">
					Acme
				</NavigatorLink>
			</li>
			<li>
				<NavigatorLink params={{ id: 'Hello' }} to="Organization">
					Hello
				</NavigatorLink>
			</li>
		</ul>
	</Screen>
);

const Store = () => {
	const { location } = useNavigator();
	const { id } = location;

	return (
		<Screen>
			<ul>
				<li>
					<NavigatorLink params={{ id }} to="Manage">
						Manage
					</NavigatorLink>
				</li>
				<li>
					<NavigatorLink>Usage</NavigatorLink>
				</li>
				<li>
					<NavigatorLink>Members</NavigatorLink>
				</li>
			</ul>
		</Screen>
	);
};

export const Sidebar = () => {
	return (
		<ThemeProvider isDark isGlobal={false}>
			<Surface
				borderRight="1px solid"
				css={{
					height: 'calc(100vh - 100px)',
					left: 0,
					position: 'fixed',
					top: 0,
					width: 320,
				}}
			>
				<Navigator initialPath="Home">
					<Flex css={{ height: '100%' }} direction="column">
						<FlexBlock css={{ width: '100%' }}>
							<NavigatorScreens>
								<NavigatorScreen component={Home} path="Home" />
								<NavigatorScreen
									component={Store}
									path="Store"
								/>
							</NavigatorScreens>
						</FlexBlock>
						<FlexItem css={{ width: '100%' }}>
							<Flex>
								<NavigatorLink to="Home">Home</NavigatorLink>
							</Flex>
						</FlexItem>
					</Flex>
				</Navigator>
			</Surface>
		</ThemeProvider>
	);
};
