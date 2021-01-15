import { FiChevronLeft, FiDroplet, FiGrid, FiPlus, FiType } from '@wp-g2/icons';
import { styled, ui } from '@wp-g2/styles';
import { createStore, shallowCompare } from '@wp-g2/substate';
import _ from 'lodash';
import React from 'react';

import {
	Animated,
	AnimatedContainer,
	Button,
	Card,
	CardBody,
	CardHeader,
	ColorControl,
	ContextSystemProvider,
	Divider,
	FormGroup,
	Grid,
	Heading,
	HStack,
	Icon,
	ListGroup,
	ListGroupHeader,
	MenuItem,
	Navigator,
	NavigatorLink,
	NavigatorScreen,
	NavigatorScreens,
	Panel,
	PanelBody,
	PanelHeader,
	Popover,
	SegmentedControl,
	Select,
	SelectDropdown,
	Slider,
	Spacer,
	Surface,
	Text,
	TextInput,
	UnitInput,
	useNavigatorHistory,
	useNavigatorLocation,
	View,
} from '../../index';

export default {
	title: 'Examples/WIP/GlobalStylesSidebar',
};

const globalStylesStore = createStore((set, get) => ({
	global: {
		typography: {
			fontFamily: 'system-ui',
			fontSize: '16px',
			fontWeight: '400',
			appearance: 'normal',
			letterSpacing: '0px',
			lineHeight: 1,
		},
	},
	setAttribute: (prop) => (value) => {
		if (prop) {
			set((prev) => {
				const next = _.set(prev, prop, value);
				return { ...prev, ...next };
			});
		}
	},
	getBoundProps: (scope, prop) => {
		return {
			value: _.get(get(), scope)?.[prop],
			onChange: get()?.setAttribute(`${scope}.${prop}`),
		};
	},
}));

const useGlobalStylesStore = globalStylesStore;

const TypographyTools = ({ scope = 'global' }) => {
	const [getBoundProps, setAttribute] = useGlobalStylesStore(
		(state) => [state.getBoundProps, state.setAttribute],
		shallowCompare,
	);

	const fontWeights = [
		{ value: '100', label: '100' },
		{ value: '200', label: '200' },
		{ value: '300', label: '300' },
		{ value: '400', label: '400' },
		{ value: '500', label: '500' },
		{ value: '600', label: '600' },
		{ value: '700', label: '700' },
		{ value: '800', label: '800' },
		{ value: '900', label: '900' },
	];
	const fontWeight = fontWeights.find(
		(item) =>
			item.value ===
			getBoundProps('global.typography', 'fontWeight').value,
	);

	console.log(getBoundProps('global.typography', 'lineHeight'));

	return (
		<CardBody>
			<ListGroup>
				<FormGroup label="Font">
					<TextInput
						{...getBoundProps('global.typography', 'fontFamily')}
					/>
				</FormGroup>
				<Grid>
					<FormGroup label="Size">
						<UnitInput
							cssProp="fontSize"
							{...getBoundProps('global.typography', 'fontSize')}
						/>
					</FormGroup>
					<FormGroup label="Weight">
						<SelectDropdown
							isPreviewable
							minWidth={80}
							onChange={(next) =>
								setAttribute('global.typography.fontWeight')(
									next.selectedItem.value,
								)
							}
							options={fontWeights}
							placement="bottom-end"
							unstable_fixed
							value={fontWeight}
						/>
					</FormGroup>
				</Grid>
				<Grid>
					<FormGroup label="Line Height">
						<TextInput
							min={0}
							type="number"
							{...getBoundProps(
								'global.typography',
								'lineHeight',
							)}
						/>
					</FormGroup>
					<FormGroup label="Letter Spacing">
						<UnitInput
							cssProp="letterSpacing"
							{...getBoundProps(
								'global.typography',
								'letterSpacing',
							)}
						/>
					</FormGroup>
				</Grid>
			</ListGroup>
		</CardBody>
	);
};

const Screen = styled(Surface, { props: { variant: 'tertiary' } })`
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
`;

const SettingLink = ({ prefix, title, to }) => {
	return (
		<NavigatorLink to={to}>
			<MenuItem prefix={prefix} showArrow>
				<Text weight={600}>{title}</Text>
			</MenuItem>
		</NavigatorLink>
	);
};

const GlobalStylesScreen = () => {
	return (
		<Screen
			css={`
				padding-top: 40px;
			`}
		>
			<CardBody>
				<ListGroup>
					<SettingLink
						prefix={<Icon icon={<FiDroplet />} />}
						title="Colors"
						to="Colors"
					/>
					<SettingLink
						prefix={<Icon icon={<FiType />} />}
						title="Typography"
						to="Typography"
					/>
					<SettingLink
						prefix={<Icon icon={<FiGrid />} />}
						title="Spacing"
					/>
				</ListGroup>
			</CardBody>

			<Divider />

			<CardBody>
				<ListGroup>
					<ListGroupHeader>Blocks</ListGroupHeader>
					<SettingLink title="Button" to="Buttons" />
					<SettingLink title="Forms" />
					<SettingLink title="Images" />
				</ListGroup>
			</CardBody>
		</Screen>
	);
};

const ColorsScreen = () => {
	return (
		<Screen
			css={`
				padding-top: 60px;
			`}
		>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>Defaults</ListGroupHeader>
					<ColorControl color="#fff">Site Background</ColorControl>
					<ColorControl color="#000">Body Text</ColorControl>
					<ColorControl color="#0f6">Accent</ColorControl>
				</ListGroup>
			</CardBody>
			<Divider />
			<CardBody>
				<ListGroup>
					<ListGroupHeader>Theme</ListGroupHeader>
					<ColorControl color="#111">Dark Gray</ColorControl>
					<ColorControl color="#05f">Blues</ColorControl>
				</ListGroup>
			</CardBody>
			<Divider />
			<CardBody>
				<ListGroup>
					<ListGroupHeader>
						Custom
						<Button
							icon={<FiPlus />}
							isControl
							isSubtle
							size="small"
						/>
					</ListGroupHeader>
					<ColorControl color="#f00">Red</ColorControl>
					<ColorControl color="#0f0">Green</ColorControl>
				</ListGroup>
			</CardBody>
		</Screen>
	);
};

const TypographyPreview = () => {
	const attributes = useGlobalStylesStore((state) =>
		Object.entries(state.global.typography),
	);
	const style = Object.fromEntries(attributes);

	return (
		<View
			css={{
				position: 'fixed',
				right: 290,
				top: 50,
				width: 280,
				zIndex: 999,
			}}
		>
			<Animated
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: 10 }}
				initial={{ opacity: 0, x: 10 }}
				key="typographyPreview"
				transition={{ ease: 'linear', duration: 0.1 }}
			>
				<Card>
					<CardHeader size="small">
						<Heading size={6}>Preview</Heading>
					</CardHeader>
					<Surface backgroundSize={8} variant="dotted">
						<CardBody
							css={[
								ui.alignment.content.center,
								{ height: 160, overflow: 'hidden' },
							]}
						>
							<div
								contentEditable
								style={{ ...style, outline: 'none' }}
							>
								Aa
							</div>
						</CardBody>
					</Surface>
				</Card>
			</Animated>
		</View>
	);
};

const TypographyScreen = () => {
	const [showPreview, setShowPreview] = React.useState(false);
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
		<Screen
			css={`
				padding-top: 60px;
			`}
		>
			<View>
				<AnimatedContainer>
					{showPreview && <TypographyPreview />}
				</AnimatedContainer>
				<PanelHeader>
					<HStack>
						<Heading size={5}>Heading</Heading>
						<Button
							isControl
							isSubtle
							onClick={() => setShowPreview((prev) => !prev)}
							size="small"
						>
							Preview
						</Button>
					</HStack>
				</PanelHeader>
				<TypographyTools />
			</View>
			<Panel visible>
				<PanelHeader title="Heading" />
				<PanelBody>
					<ListGroup>
						<Spacer mb={3}>
							<SegmentedControl isBlock options={headings} />
						</Spacer>
						<FormGroup label="Family">
							<Select
								options={[
									{ value: 'georgia', label: 'Georgia' },
								]}
							/>
						</FormGroup>
						<FormGroup label="Size">
							<Grid>
								<TextInput value={32} />
								<Slider />
							</Grid>
						</FormGroup>
						<FormGroup label="Weight">
							<Select
								options={[{ value: '500', label: '500' }]}
							/>
						</FormGroup>
						<FormGroup label="Transform">
							<Select
								options={[{ value: 'None', label: 'None' }]}
							/>
						</FormGroup>
					</ListGroup>
				</PanelBody>
			</Panel>
			<Panel visible>
				<PanelHeader title="Base Text" />
				<PanelBody>
					<ListGroup>
						<FormGroup label="Family">
							<Select
								options={[
									{ value: 'georgia', label: 'Georgia' },
								]}
							/>
						</FormGroup>
						<FormGroup label="Size">
							<Grid>
								<TextInput value={32} />
								<Slider />
							</Grid>
						</FormGroup>
						<FormGroup label="Weight">
							<Select
								options={[{ value: '500', label: '500' }]}
							/>
						</FormGroup>
						<FormGroup label="Transform">
							<Select
								options={[{ value: 'None', label: 'None' }]}
							/>
						</FormGroup>
					</ListGroup>
				</PanelBody>
			</Panel>
		</Screen>
	);
};

const ButtonsScreen = () => {
	return (
		<Screen
			css={`
				padding-top: 60px;
			`}
		>
			<Panel visible>
				<PanelHeader title="Typography" />
				<PanelBody>
					<ListGroup>
						<FormGroup label="Family">
							<Select
								options={[
									{ value: 'georgia', label: 'Georgia' },
								]}
							/>
						</FormGroup>
						<FormGroup label="Size">
							<Grid>
								<TextInput value={32} />
								<Slider />
							</Grid>
						</FormGroup>
						<FormGroup label="Weight">
							<Select
								options={[{ value: '500', label: '500' }]}
							/>
						</FormGroup>
						<FormGroup label="Transform">
							<Select
								options={[{ value: 'None', label: 'None' }]}
							/>
						</FormGroup>
					</ListGroup>
				</PanelBody>
			</Panel>
			<Panel visible>
				<PanelHeader title="Color" />
				<PanelBody>
					<ListGroup>
						<ColorControl color="#111">Text</ColorControl>
						<ColorControl color="#05f">Background</ColorControl>
					</ListGroup>
				</PanelBody>
			</Panel>
			<Panel>
				<PanelHeader title="Advanced" />
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

const ANIMATION_SPEED = 0.14;

const GlobalStylesHeader = (props) => {
	const title = useNavigatorTitle();
	const previousScreen = usePreviousScreen();
	const hasPreviousScreen = !!previousScreen;

	return (
		<Surface
			borderBottom
			css={[
				ui.padding(3),
				{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 },
				{ overflow: 'hidden' },
				ui.frame.height(hasPreviousScreen ? 60 : 40),
				ui.animation.default,
				ui.animation.duration(ANIMATION_SPEED),
			]}
			variant="tertiary"
		>
			<View
				css={[
					{ pointerEvents: hasPreviousScreen ? 'auto' : 'none' },
					ui.opacity(hasPreviousScreen ? 1 : 0),
					ui.offset.x(hasPreviousScreen ? 0 : -20),
					ui.animation.default,
					ui.animation.delay(ANIMATION_SPEED * 0.5),
					ui.animation.duration(ANIMATION_SPEED),
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
	{ component: ColorsScreen, path: 'Colors', title: 'Colors' },
	{ component: TypographyScreen, path: 'Typography', title: 'Typography' },
	{ component: ButtonsScreen, path: 'Buttons', title: 'Buttons' },
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
	// const initialPath = 'GlobalStyles';
	const initialPath = 'Typography';
	return (
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
	);
};

export const _default = () => {
	return (
		<div>
			<Sidebar>
				<Example />
			</Sidebar>
		</div>
	);
};
