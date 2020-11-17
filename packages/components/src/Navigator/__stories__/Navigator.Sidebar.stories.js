import { wordpress } from '@wordpress/icons';
import { faker, Schema } from '@wp-g2/protokit';
import { styled, ThemeProvider, ui } from '@wp-g2/styles';
import { chunk, useLocalState } from '@wp-g2/utils';
import React, { useEffect, useState } from 'react';
import {
	MemoryRouter as Router,
	NavLink,
	Route,
	Switch,
} from 'react-router-dom';

import {
	Avatar,
	Background,
	Badge,
	Flex,
	Grid,
	Heading,
	HStack,
	Icon,
	Menu,
	MenuItem,
	Scrollable,
	SearchInput,
	Spacer,
	Spinner,
	Subheading,
	Surface,
	Text,
	TextInput,
	Truncate,
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
							<View>
								<Text>Comments</Text>
							</View>
							<View css={{ margin: '-3px 0' }}>
								{commentCount === null ? (
									<Spinner />
								) : (
									<Badge>{commentCount}</Badge>
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

const pageSchema = new Schema(() => ({
	title: faker.commerce.productName(),
}));

const pages = pageSchema.make(100);

const PagesNav = () => {
	const [recentPages, draftPages] = chunk(pages, 5);
	const [drafts] = chunk(draftPages, 2);
	const [query, setQuery] = useState('');

	const isSearching = !!query;
	const searchResults = pages.filter((page) =>
		page.title.toLowerCase().includes(query.toLowerCase()),
	);

	const [_results] = chunk(searchResults, 10);
	const results = _results || [];

	return (
		<Screen>
			<Spacer py={4} />
			<Spacer mb={8}>
				<MenuLink isBack to="Dashboard">
					Dashboard
				</MenuLink>
			</Spacer>
			<Spacer mb={4} pl={3}>
				<Heading size={4}>Pages</Heading>
			</Spacer>
			<View css={[ui.padding.x(3), ui.margin.bottom(4)]}>
				<SearchInput
					onChange={(next) => setQuery(next)}
					placeholder="Search pages"
					value={query}
				/>
			</View>
			<VStack spacing={10}>
				{isSearching && results.length && (
					<View>
						{results.map((page) => (
							<ExternalMenuLink
								key={page.id}
								to={`/pages/${page.id}`}
							>
								<Truncate>{page.title}</Truncate>
							</ExternalMenuLink>
						))}
					</View>
				)}
				{isSearching && !results.length && (
					<View css={[ui.padding.x(3)]}>
						<Text>No Results</Text>
					</View>
				)}
				{!isSearching && (
					<VStack spacing={10}>
						<VStack>
							<View css={[ui.padding.x(3)]}>
								<Subheading>Recent Pages</Subheading>
							</View>
							<View>
								{recentPages.map((page) => (
									<ExternalMenuLink
										key={page.id}
										to={`/pages/${page.id}`}
									>
										<Truncate>{page.title}</Truncate>
									</ExternalMenuLink>
								))}
							</View>
						</VStack>
						<VStack>
							<View css={[ui.padding.x(3)]}>
								<Subheading>Drafts</Subheading>
							</View>
							<View>
								{drafts.map((page) => (
									<ExternalMenuLink
										key={page.id}
										to={`/pages/${page.id}`}
									>
										<Truncate>{page.title}</Truncate>
									</ExternalMenuLink>
								))}
							</View>
						</VStack>
					</VStack>
				)}
			</VStack>
		</Screen>
	);
};

const PostsNav = () => (
	<Screen>
		<Spacer py={4} />
		<Spacer mb={8}>
			<MenuLink isBack to="Dashboard">
				Dashboard
			</MenuLink>
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

const PluginsWooCommerceNav = () => {
	const [isFavorite, setIsFavorite] = useLocalState(
		'@wp-g2/components/Navigator/Sidebar/PluginsWooCommerceNav',
		false,
	);

	return (
		<Screen>
			<Spacer py={4} />
			<Spacer mb={8}>
				<MenuLink isBack to="Dashboard">
					Dashboard
				</MenuLink>
			</Spacer>
			<Spacer mb={4} pl={3}>
				<HStack>
					<Spacer>
						<Heading size={4}>WooCommerce</Heading>
					</Spacer>
					<Text
						css={[
							ui.padding.y(3),
							ui.padding.x(2),
							{
								cursor: 'pointer',
								color: isFavorite ? 'yellow' : null,
							},
							ui.animation.default,
						]}
						isBlock
						onClick={() => setIsFavorite(!isFavorite)}
						variant={!isFavorite && 'muted'}
					>
						★
					</Text>
				</HStack>
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
};

const screens = [
	{ component: DashboardNav, path: 'Dashboard' },
	{ component: PagesNav, path: 'Pages' },
	{ component: PostsNav, path: 'Posts' },
	{ component: PluginsWooCommerceNav, path: 'PluginsWooCommerce' },
];

const NavigationSidebar = () => {
	const initialPath = 'Dashboard';

	return (
		<ThemeProvider isDark isGlobal={false}>
			<Surface
				borderRight="1px solid"
				css={{
					height: '100%',
				}}
			>
				<VStack>
					<Spacer>
						<Navigator initialPath={initialPath}>
							<Scrollable
								css={{
									height: `calc(100vh - 100px - 40px)`,
									padding: 8,
								}}
							>
								<HStack css={[ui.padding(3)]} spacing={3}>
									<Icon icon={wordpress} size={30} />
									<Spacer>
										<Heading size={5} truncate>
											My Site Name
										</Heading>
									</Spacer>
								</HStack>
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
					</Spacer>
					<Surface css={[ui.padding.y(4), ui.padding.x(3)]}>
						<HStack spacing={4}>
							<Avatar
								name="Elsa Oldenburg"
								size="medium"
								src="https://picsum.photos/id/1041/300/300"
							/>
							<Spacer>
								<Text weight="bold">Elsa</Text>
							</Spacer>
						</HStack>
					</Surface>
				</VStack>
			</Surface>
		</ThemeProvider>
	);
};

const MockPage = ({ match }) => {
	const { params, path } = match;
	let title;

	if (path === '/pages/:id' && params?.id) {
		const page = pages.find((page) => page.id === params?.id);
		title = page.title;
	} else {
		const route = routes.find((item) => item.path === path);
		title = route.title;
	}

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
	{ path: '/pages/:id', title: 'Single Page' },
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

	return (
		<Background borderBottom css={{ padding: 4 }}>
			<TextInput css={{ textAlign: 'center' }} readOnly value={url} />
		</Background>
	);
};

const App = () => {
	return (
		<View
			css={{
				border: `2px solid ${ui.get('surfaceBorderColor')}`,
				bottom: 100,
				left: 0,
				position: 'fixed',
				right: 0,
				top: 0,
			}}
		>
			<Router initialEntries={['/']}>
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
											component={MockPage}
											key={route.path}
										/>
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
