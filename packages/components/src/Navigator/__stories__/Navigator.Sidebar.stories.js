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

const WordPressLogo = (props) => (
	<svg
		fill="none"
		height="30"
		viewBox="0 0 30 30"
		width="30"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<path
			clipRule="evenodd"
			d="M30 15C30 6.735 23.265 0 15 0C6.72 0 0 6.735 0 15C0 23.28 6.72 30 15 30C23.265 30 30 23.28 30 15ZM11.67 23.055L6.555 9.33C7.38 9.3 8.31 9.21 8.31 9.21C9.06 9.12 8.97 7.515 8.22 7.545C8.22 7.545 6.045 7.71 4.665 7.71C4.395 7.71 4.11 7.71 3.795 7.695C6.18 4.035 10.305 1.665 15 1.665C18.495 1.665 21.675 2.97 24.075 5.175C23.055 5.01 21.6 5.76 21.6 7.545C21.6 8.51698 22.1176 9.35094 22.6995 10.2886C22.7821 10.4217 22.8661 10.557 22.95 10.695C23.475 11.61 23.775 12.735 23.775 14.385C23.775 16.62 21.675 21.885 21.675 21.885L17.13 9.33C17.94 9.3 18.36 9.075 18.36 9.075C19.11 9 19.02 7.2 18.27 7.245C18.27 7.245 16.11 7.425 14.7 7.425C13.395 7.425 11.205 7.245 11.205 7.245C10.455 7.2 10.365 9.045 11.115 9.075L12.495 9.195L14.385 14.31L11.67 23.055ZM26.1478 14.9129L26.115 15C25.028 17.8616 23.9493 20.7478 22.8726 23.6283L22.871 23.6328C22.4921 24.6463 22.1136 25.6592 21.735 26.67C25.74 24.36 28.335 19.935 28.335 15C28.335 12.69 27.81 10.56 26.76 8.625C27.2113 12.0899 26.5181 13.9298 26.1478 14.9129ZM9.15 27.135C4.68 24.975 1.665 20.295 1.665 15C1.665 13.05 2.01 11.28 2.745 9.615C3.19407 10.8452 3.64314 12.0761 4.09235 13.3073L4.09291 13.3088C5.77418 17.9171 7.45742 22.5307 9.15 27.135ZM19.065 27.66L15.195 17.19C14.482 19.2934 13.7637 21.3968 13.0432 23.5065C12.5511 24.9474 12.0581 26.3912 11.565 27.84C12.645 28.17 13.815 28.335 15 28.335C16.425 28.335 17.775 28.095 19.065 27.66Z"
			fill="white"
			fillRule="evenodd"
		></path>
	</svg>
);

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
									<Icon icon={<WordPressLogo />} size={30} />
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
