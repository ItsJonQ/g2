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
						<Heading size="5" sx={{ px: 3, paddingBottom: 2 }}>
							RECENT
						</Heading>
						<MenuItem>About</MenuItem>
						<MenuItem>Portfolio</MenuItem>
						<MenuItem>
							A place for mostly incoherent nonsense
						</MenuItem>
						<MenuItem>Team</MenuItem>
						<MenuItem>Contact</MenuItem>
						<MenuItem>Locations</MenuItem>
					</MenuGroup>
					<MenuGroup>
						<Heading
							size="5"
							sx={{
								px: 3,
								paddingTop: 4,
								paddingBottom: 2,
							}}
						>
							DRAFTS
						</Heading>
						<MenuItem>Services</MenuItem>
						<MenuItem>Television and Radio</MenuItem>
					</MenuGroup>
					<MenuGroup>
						<Heading
							size="5"
							sx={{
								px: 3,
								paddingTop: 4,
								paddingBottom: 2,
							}}
						>
							ALL PAGES
						</Heading>
						<MenuItem>Aardvark</MenuItem>
						<MenuItem>Albatross</MenuItem>
						<MenuItem>Akita</MenuItem>
						<MenuItem>Bison</MenuItem>
						<MenuItem>Clown Fish</MenuItem>
						<MenuItem>Dog</MenuItem>
						<MenuItem>Dragonfly</MenuItem>
						<MenuItem>Emu</MenuItem>
						<MenuItem>Fox</MenuItem>
						<MenuItem>Gecko</MenuItem>
						<MenuItem>Hermit Crab</MenuItem>
						<MenuItem>Iguana</MenuItem>
						<MenuItem>Jaguar</MenuItem>
						<MenuItem>Jellyfish</MenuItem>
						<MenuItem>Kangaroo</MenuItem>
						<MenuItem>Labradoodle</MenuItem>
						<MenuItem>Ladybug</MenuItem>
						<MenuItem>Macaw</MenuItem>
						<MenuItem>Mayfly</MenuItem>
						<MenuItem>Newt</MenuItem>
						<MenuItem>Ocelot</MenuItem>
						<MenuItem>Octopus</MenuItem>
						<MenuItem>Panther</MenuItem>
						<MenuItem>Quail</MenuItem>
						<MenuItem>Rabbit</MenuItem>
						<MenuItem>Raccoon</MenuItem>
						<MenuItem>Skunk</MenuItem>
						<MenuItem>Tapir</MenuItem>
						<MenuItem>Umbrellabird</MenuItem>
						<MenuItem>Vulture</MenuItem>
						<MenuItem>Walrus</MenuItem>
						<MenuItem>Yak</MenuItem>
						<MenuItem>Zabra</MenuItem>
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
