import { ThemeProvider } from '@wp-g2/styled';
import React from 'react';

import {
	BaseView,
	CardBody,
	CardFooter,
	CardHeader,
	Grid,
	Heading,
	Menu,
	MenuItem as BaseMenuItem,
	NavigationStack,
	NavigationStackNext,
	NavigationStackPrevious,
	NavigationStackScreen,
	NavigationStackScreens,
	Spacer,
	Surface,
	Text,
} from '../index';

export default {
	title: 'Example/Sidebar',
};

const SidebarHeader = ({ children }) => {
	return (
		<Spacer my={3} px={2}>
			{children}
		</Spacer>
	);
};

const MenuGroup = ({ children }) => {
	return <Spacer mb={3}>{children}</Spacer>;
};

const MenuItem = ({ children, ...props }) => (
	<BaseMenuItem {...props}>
		<Text>{children}</Text>
	</BaseMenuItem>
);

const MainScreen = () => {
	return (
		<Grid gap={0} sx={{ height: '100%' }} templateRows="auto 1fr">
			<CardHeader>
				<SidebarHeader>
					<Spacer mb={1}>
						<Heading size={4}>
							The Swedish Museum of Modern Art
						</Heading>
					</Spacer>
					<Text>Visit Site</Text>
				</SidebarHeader>
			</CardHeader>
			<CardBody sx={{ px: 2, py: 4 }}>
				<Menu>
					<MenuGroup>
						<MenuItem>Dashboard</MenuItem>
					</MenuGroup>
					<MenuGroup>
						<MenuItem>Media</MenuItem>
						<MenuItem>Posts</MenuItem>
						<MenuItem as={NavigationStackNext}>Pages</MenuItem>
						<MenuItem>Comments</MenuItem>
					</MenuGroup>
					<MenuGroup>
						<MenuItem>Appearance</MenuItem>
						<MenuItem>Plugins</MenuItem>
						<MenuItem>Users</MenuItem>
						<MenuItem>Tools</MenuItem>
						<MenuItem>Settings</MenuItem>
					</MenuGroup>
				</Menu>
			</CardBody>
		</Grid>
	);
};

const PagesScreen = () => {
	return (
		<>
			<BaseView p={3}>
				<SidebarHeader>
					<NavigationStackPrevious>Main menu</NavigationStackPrevious>
					<Spacer mb={0} pt={5}>
						<Heading size={3}>Pages</Heading>
					</Spacer>
				</SidebarHeader>
			</BaseView>
			<CardBody sx={{ px: 2, py: 4 }}>
				<Menu>
					<MenuGroup>
						<MenuItem>Media</MenuItem>
						<MenuItem>Posts</MenuItem>
						<MenuItem>Pages</MenuItem>
						<MenuItem>Comments</MenuItem>
					</MenuGroup>
				</Menu>
			</CardBody>
		</>
	);
};

const AdminSidebar = () => {
	return (
		<ThemeProvider theme={{ isDark: true }}>
			<Surface sx={{ height: '100vh', width: 240 }}>
				<Grid gap={0} sx={{ height: '100%' }} templateRows="1fr auto">
					<NavigationStack autoHeight={false}>
						<NavigationStackScreens>
							<NavigationStackScreen>
								<MainScreen />
							</NavigationStackScreen>
							<NavigationStackScreen>
								<PagesScreen />
							</NavigationStackScreen>
						</NavigationStackScreens>
					</NavigationStack>
					<CardFooter>
						<Text>User Details</Text>
					</CardFooter>
				</Grid>
			</Surface>
		</ThemeProvider>
	);
};

export const _default = () => {
	return <AdminSidebar />;
};
