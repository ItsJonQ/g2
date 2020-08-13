import { get, styled, ThemeProvider } from '@wp-g2/styles';
import React, { useEffect, useState } from 'react';
import {
	MemoryRouter as Router,
	NavLink,
	Route,
	Switch,
} from 'react-router-dom';

import {
	Background,
	Flex,
	Grid,
	Heading,
	Lozenge,
	Menu,
	MenuItem,
	Scrollable,
	Spacer,
	Spinner,
	Surface,
	TextField,
	View,
	VStack,
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

const ScreenView = styled(Surface)`
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
`;

const Screen = ({ children }) => {
	return <ScreenView>{children}</ScreenView>;
};

const MenuLink = ({ children, ...props }) => {
	return (
		<NavigatorLink {...props}>
			<MenuItem>{children}</MenuItem>
		</NavigatorLink>
	);
};

const ExternalMenuLink = (props) => (
	<MenuItem
		activeClassName="is-active"
		as={NavLink}
		exact={true}
		{...props}
	/>
);

const DashboardNav = () => {
	const [commentCount, setCommentCount] = useState(null);

	useEffect(() => {
		setTimeout(() => {
			setCommentCount(3);
		}, 1000);
	}, []);

	return (
		<Screen>
			<Spacer py={4} />
			<Spacer mb={8}>
				<MenuLink>My sites</MenuLink>
			</Spacer>
			<Spacer mb={4} pl={3}>
				<Heading size={4}>My site name</Heading>
			</Spacer>
			<Spacer mb={4}>
				<Menu>
					<ExternalMenuLink to="/">Dashboard</ExternalMenuLink>
					<MenuLink to="Pages">Pages</MenuLink>
					<MenuLink to="Posts">Posts</MenuLink>
					<ExternalMenuLink to="/comments">
						<Flex>
							<View>Comments</View>
							<View css={{ margin: '-3px 0' }}>
								{commentCount === null ? (
									<Spinner />
								) : (
									<Lozenge>{commentCount}</Lozenge>
								)}
							</View>
						</Flex>
					</ExternalMenuLink>
					<ExternalMenuLink to="/media">Media</ExternalMenuLink>
					<ExternalMenuLink to="/users">Users</ExternalMenuLink>
				</Menu>
			</Spacer>
			<Spacer mb={4} mt={12} pl={3}>
				<Heading size={4}>Plugins</Heading>
			</Spacer>
			<Spacer mb={4}>
				<Menu>
					<ExternalMenuLink to="/plugins/hello-dolly">
						Hello Dolly
					</ExternalMenuLink>
					<MenuLink to="PluginsWooCommerce">WooCommerce</MenuLink>
					<ExternalMenuLink to="/plugins">
						All plugins
					</ExternalMenuLink>
				</Menu>
			</Spacer>
		</Screen>
	);
};

const PagesNav = () => (
	<Screen>
		<Spacer py={4} />
		<Spacer mb={8}>
			<MenuLink isBack>Dashboard</MenuLink>
		</Spacer>
		<Spacer mb={4} pl={3}>
			<Heading size={4}>Pages</Heading>
		</Spacer>
		<Menu>
			<ExternalMenuLink to="/pages">All pages</ExternalMenuLink>
			<ExternalMenuLink to="/pages/new">New page</ExternalMenuLink>
		</Menu>
	</Screen>
);

const PostsNav = () => (
	<Screen>
		<Spacer py={4} />
		<Spacer mb={8}>
			<MenuLink isBack>Dashboard</MenuLink>
		</Spacer>
		<Spacer mb={4} pl={3}>
			<Heading size={4}>Posts</Heading>
		</Spacer>
		<Menu>
			<ExternalMenuLink to="/posts">All posts</ExternalMenuLink>
			<ExternalMenuLink to="/posts/categories">
				Categories
			</ExternalMenuLink>
			<ExternalMenuLink to="/posts/tags">Tags</ExternalMenuLink>
			<ExternalMenuLink to="/posts/new">New page</ExternalMenuLink>
		</Menu>
	</Screen>
);

const PluginsWooCommerceNav = () => (
	<Screen>
		<Spacer py={4} />
		<Spacer mb={8}>
			<MenuLink isBack to="Dashboard">
				Dashboard
			</MenuLink>
		</Spacer>
		<Spacer mb={4} pl={3}>
			<Heading size={4}>WooCommerce</Heading>
		</Spacer>
		<Menu>
			<ExternalMenuLink to="/plugins/woo-commerce/store">
				Store home
			</ExternalMenuLink>
			<MenuLink showArrow>Analytics</MenuLink>
			<MenuLink showArrow>Orders</MenuLink>
			<MenuLink showArrow>Marketing</MenuLink>
			<MenuLink showArrow>Products</MenuLink>
			<MenuLink showArrow>Customers</MenuLink>
			<MenuLink showArrow>Settings</MenuLink>
			<MenuLink showArrow>Extensions</MenuLink>
			<MenuLink showArrow>Tools</MenuLink>
		</Menu>
	</Screen>
);

const screens = [
	{ component: DashboardNav, path: 'Dashboard' },
	{ component: PagesNav, path: 'Pages' },
	{ component: PostsNav, path: 'Posts' },
	{ component: PluginsWooCommerceNav, path: 'PluginsWooCommerce' },
];

const NavigationSidebar = () => {
	return (
		<ThemeProvider isDark isGlobal={false}>
			<Surface
				borderRight="1px solid"
				css={{
					height: '100%',
				}}
			>
				<Navigator initialPath="Dashboard">
					<Scrollable
						css={{
							height: `calc(100vh - 100px - 40px)`,
							padding: 8,
						}}
					>
						<NavigatorScreens>
							{screens.map((screen) => (
								<NavigatorScreen
									{...screen}
									key={screen.path}
								/>
							))}
						</NavigatorScreens>
					</Scrollable>
				</Navigator>
			</Surface>
		</ThemeProvider>
	);
};

const MockPage = ({ title }) => {
	return (
		<Surface borderBottom>
			<View css={{ padding: '20px 40px' }}>
				<Heading>{title}</Heading>
			</View>
		</Surface>
	);
};

const routes = [
	{ path: '/', title: 'Dashboard' },
	{ path: '/pages', title: 'All pages' },
	{ path: '/pages/new', title: 'New page' },
	{ path: '/posts', title: 'All posts' },
	{ path: '/posts/categories', title: 'Categories' },
	{ path: '/posts/tags', title: 'Tags' },
	{ path: '/posts/new', title: 'New post' },
	{ path: '/media', title: 'Media' },
	{ path: '/comments', title: 'Comments' },
	{ path: '/users', title: 'Users' },
	{ path: '/plugins', title: 'All plugins' },
	{ path: '/plugins/hello-dolly', title: 'Hello Dolly' },
	{ path: '/plugins/woo-commerce/store', title: 'Store home' },
];

const BrowserBar = ({ history }) => {
	const pathname = history?.location?.pathname || '/';
	const url = `http://mysite.com/wp-admin${pathname}`;

	console.log();

	return (
		<Background borderBottom css={{ padding: 4 }}>
			<TextField css={{ textAlign: 'center' }} readOnly value={url} />
		</Background>
	);
};

const App = () => {
	return (
		<View
			css={{
				border: `2px solid ${get('surfaceBorderColor')}`,
				bottom: 100,
				left: 0,
				position: 'fixed',
				right: 0,
				top: 0,
			}}
		>
			<Router>
				<VStack spacing={0}>
					<Route component={BrowserBar} />
					<Spacer>
						<Grid
							css={{ height: `100%` }}
							gap={0}
							templateColumns="220px 1fr"
						>
							<NavigationSidebar />
							<Background>
								<Switch>
									{routes.map((route) => (
										<Route
											exact={true}
											{...route}
											key={route.path}
										>
											<MockPage title={route.title} />
										</Route>
									))}
								</Switch>
							</Background>
						</Grid>
					</Spacer>
				</VStack>
			</Router>
		</View>
	);
};

export const Sidebar = () => {
	return <App />;
};
