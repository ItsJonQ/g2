import { ComponentsProvider } from '@wp-g2/context';
import { FiChevronLeft, FiChevronRight } from '@wp-g2/icons';
import { get, styled, ui } from '@wp-g2/styles';
import React from 'react';

import {
	CardBody,
	FormGroup,
	Grid,
	Heading,
	HStack,
	Icon,
	Navigator,
	NavigatorLink,
	NavigatorScreen,
	NavigatorScreens,
	Panel,
	PanelBody,
	PanelHeader,
	SegmentedControl,
	Select,
	Slider,
	Spacer,
	Subheading,
	Surface,
	Text,
	TextInput,
	useNavigatorHistory,
	useNavigatorLocation,
	View,
} from '../../index';

export default {
	title: 'Examples/WIP/GlobalStylesSidebar',
};

const Screen = styled(Surface, { props: { variant: 'tertiary' } })`
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
`;

const SettingLink = ({ title, to }) => {
	return (
		<NavigatorLink to={to}>
			<HStack>
				<Text weight={500}>{title}</Text>
				<Icon color={get('colorText')} icon={<FiChevronRight />} />
			</HStack>
		</NavigatorLink>
	);
};

const ColorExample = ({ color, title }) => {
	return (
		<Spacer py={1}>
			<HStack>
				<Text>{title}</Text>
				<View
					css={[
						{ background: color },
						ui.frame({ width: 20, height: 20 }),
						ui.borderRadius.circle,
						{ boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.08) inset' },
					]}
				/>
			</HStack>
		</Spacer>
	);
};

const GlobalStylesScreen = () => {
	return (
		<Screen>
			<CardBody>
				<Spacer mb={3}>
					<Subheading>Color</Subheading>
				</Spacer>
				<ColorExample color="#fff" title="Site Background" />
				<ColorExample color="#000" title="Body Text" />
				<ColorExample color="#0f6" title="Accent" />
				<Spacer mt={3}>
					<SettingLink title="Color" />
				</Spacer>
			</CardBody>
			<CardBody>
				<Spacer mb={3}>
					<Subheading>Typography</Subheading>
				</Spacer>
				<FormGroup label="Heading font">
					<Select
						options={[{ value: 'georgia', label: 'Georgia' }]}
					/>
				</FormGroup>
				<FormGroup label="Base font">
					<Select options={[{ value: 'inter', label: 'Inter UI' }]} />
				</FormGroup>
				<Spacer mt={3}>
					<SettingLink title="Typography" to="Typography" />
				</Spacer>
			</CardBody>
		</Screen>
	);
};

const TypographyScreen = () => {
	const headings = [
		{
			label: <Text>H1</Text>,
			value: 'h1',
		},
		{
			label: <Text>H2</Text>,
			value: 'h2',
		},
		{
			label: <Text>H3</Text>,
			value: 'h3',
		},
		{
			label: <Text>H4</Text>,
			value: 'h4',
		},
		{
			label: <Text>H5</Text>,
			value: 'h5',
		},
		{
			label: <Text>H6</Text>,
			value: 'h6',
		},
	];
	return (
		<Screen>
			<Panel visible>
				<PanelHeader title="Heading" />
				<PanelBody>
					<Spacer mb={3}>
						<SegmentedControl isBlock options={headings} />
					</Spacer>
					<FormGroup label="Family">
						<Select
							options={[{ value: 'georgia', label: 'Georgia' }]}
						/>
					</FormGroup>
					<FormGroup label="Size">
						<Grid>
							<TextInput value={32} />
							<Slider />
						</Grid>
					</FormGroup>
					<FormGroup label="Weight">
						<Select options={[{ value: '500', label: '500' }]} />
					</FormGroup>
					<FormGroup label="Transform">
						<Select options={[{ value: 'None', label: 'None' }]} />
					</FormGroup>
				</PanelBody>
			</Panel>
			<Panel visible>
				<PanelHeader title="Paragraph" />
				<PanelBody>
					<FormGroup label="Family">
						<Select
							options={[{ value: 'georgia', label: 'Georgia' }]}
						/>
					</FormGroup>
					<FormGroup label="Size">
						<Grid>
							<TextInput value={32} />
							<Slider />
						</Grid>
					</FormGroup>
					<FormGroup label="Weight">
						<Select options={[{ value: '500', label: '500' }]} />
					</FormGroup>
					<FormGroup label="Transform">
						<Select options={[{ value: 'None', label: 'None' }]} />
					</FormGroup>
				</PanelBody>
			</Panel>
		</Screen>
	);
};

const useNavigatorTitle = (path) => {
	const { pathname } = useNavigatorLocation();
	const match = path || pathname;
	const screen = screens.find((screen) => screen.path === match);

	return screen ? screen.title : '';
};

const usePreviousScreen = () => {
	const { entries } = useNavigatorHistory();
	const { pathname } = useNavigatorLocation();

	const current = entries.find((entry) => entry.pathname === pathname);
	const currentIndex = entries.indexOf(current);
	const previous = entries[currentIndex - 1];

	if (!previous) return;

	return screens.find((screen) => screen.path === previous.pathname);
};

const GlobalStylesHeader = (props) => {
	const title = useNavigatorTitle();
	const previousScreen = usePreviousScreen();
	const hasPreviousScreen = !!previousScreen;

	return (
		<Surface
			borderBottom
			css={[
				ui.padding(3),
				{ overflow: 'hidden' },
				ui.frame.height(hasPreviousScreen ? 60 : 40),
				ui.animation.default,
			]}
			variant="tertiary"
		>
			<View
				css={[
					{ pointerEvents: hasPreviousScreen ? 'auto' : 'none' },
					ui.opacity(hasPreviousScreen ? 1 : 0),
					ui.animation.default,
					ui.animation.duration(0.5),
				]}
			>
				{previousScreen && (
					<NavigatorLink isBack>
						<HStack alignment="left" gap={1}>
							<Icon icon={<FiChevronLeft />} size={12} />
							<Text
								color="currentColor"
								isBlock
								lineHeight={1}
								size="caption"
							>
								Back to {previousScreen.title}
							</Text>
						</HStack>
					</NavigatorLink>
				)}
			</View>
			<Heading css={[ui.position.bottom, ui.offset({ y: -12 })]} size={5}>
				{title}
			</Heading>
		</Surface>
	);
};

const screens = [
	{
		component: GlobalStylesScreen,
		path: 'GlobalStyles',
		title: 'Global Styles',
	},
	{ component: TypographyScreen, path: 'Typography', title: 'Typography' },
];

const Sidebar = ({ children }) => {
	return (
		<ComponentsProvider
			value={{
				Grid: { gap: 8 },
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
					border-left: 1px solid ${get('colorDivider')};
				`}
			>
				{children}
			</View>
		</ComponentsProvider>
	);
};

const Example = (props) => {
	const initialPath = 'GlobalStyles';
	// const initialPath = 'Typography';
	return (
		<Navigator initialPath={initialPath}>
			<GlobalStylesHeader />
			<NavigatorScreens css={[ui.frame.height('auto')]}>
				{screens.map((screen) => (
					<NavigatorScreen {...screen} key={screen.path} />
				))}
			</NavigatorScreens>
		</Navigator>
	);
};

export const _default = () => {
	return (
		<Sidebar>
			<Example />
		</Sidebar>
	);
};
