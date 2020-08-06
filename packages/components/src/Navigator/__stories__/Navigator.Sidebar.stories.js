import { styled, ThemeProvider } from '@wp-g2/styles';
import React from 'react';

import {
	Flex,
	FlexBlock,
	FlexItem,
	Menu,
	MenuItem,
	Surface,
	View,
} from '../../index';
import {
	Navigator,
	NavigatorLink,
	NavigatorScreen,
	NavigatorScreens,
} from '../index';

export default {
	component: Navigator,
	title: 'Components/Navigator',
};

const Screen = styled(Surface)`
	bottom: 0;
	left: 0;
	padding: 8px;
	position: absolute;
	right: 0;
	top: 0;
`;

const Home = () => (
	<Screen>
		<Menu>
			<NavigatorLink to="Home">
				<MenuItem>My Home</MenuItem>
			</NavigatorLink>
			<NavigatorLink>
				<MenuItem>Stats</MenuItem>
			</NavigatorLink>
			<NavigatorLink>
				<MenuItem>Plan</MenuItem>
			</NavigatorLink>
			<NavigatorLink to="Store">
				<MenuItem>Store</MenuItem>
			</NavigatorLink>
			<NavigatorLink to="Site">
				<MenuItem>Site</MenuItem>
			</NavigatorLink>
			<NavigatorLink>
				<MenuItem>Design</MenuItem>
			</NavigatorLink>
			<NavigatorLink>
				<MenuItem>Tools</MenuItem>
			</NavigatorLink>
			<NavigatorLink>
				<MenuItem>Manage</MenuItem>
			</NavigatorLink>
		</Menu>
	</Screen>
);

const Store = () => {
	return (
		<Screen>
			<View css={{ padding: 8 }}>
				<Menu>
					<NavigatorLink isBack>
						<MenuItem>Back</MenuItem>
					</NavigatorLink>
					<NavigatorLink to="Store">
						<MenuItem>Store home</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Analytics</MenuItem>
					</NavigatorLink>
					<NavigatorLink to="Orders">
						<MenuItem>Orders</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Marketing</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Products</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Customers</MenuItem>
					</NavigatorLink>
				</Menu>
			</View>
		</Screen>
	);
};

const Orders = () => {
	return (
		<Screen>
			<Menu>
				<NavigatorLink isBack>
					<MenuItem>Back</MenuItem>
				</NavigatorLink>
				<NavigatorLink to="Orders">
					<MenuItem>Orders</MenuItem>
				</NavigatorLink>
				<View css={{ paddingLeft: 16 }}>
					<NavigatorLink>
						<MenuItem>All orders</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Payouts</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Transactions</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Disputes</MenuItem>
					</NavigatorLink>
				</View>
			</Menu>
		</Screen>
	);
};

const Site = () => {
	return (
		<Screen>
			<Menu>
				<NavigatorLink isBack>
					<MenuItem>Back</MenuItem>
				</NavigatorLink>
				<NavigatorLink to="Site">
					<MenuItem>Site</MenuItem>
				</NavigatorLink>
				<View css={{ paddingLeft: 16 }}>
					<NavigatorLink>
						<MenuItem>Pages</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Posts</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Media</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Comments</MenuItem>
					</NavigatorLink>
					<NavigatorLink>
						<MenuItem>Feedback</MenuItem>
					</NavigatorLink>
				</View>
			</Menu>
		</Screen>
	);
};

const screens = [
	{ component: Home, path: 'Home' },
	{ component: Store, path: 'Store' },
	{ component: Orders, path: 'Orders' },
	{ component: Site, path: 'Site' },
];

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
								{screens.map((screen) => (
									<NavigatorScreen
										{...screen}
										key={screen.path}
									/>
								))}
							</NavigatorScreens>
						</FlexBlock>
						<FlexItem css={{ width: '100%' }}></FlexItem>
					</Flex>
				</Navigator>
			</Surface>
		</ThemeProvider>
	);
};
