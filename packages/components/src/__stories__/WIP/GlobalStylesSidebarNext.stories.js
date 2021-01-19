import {
	FiChevronLeft,
	FiChevronRight,
	FiDroplet,
	FiGrid,
	FiMoreHorizontal,
	FiPlus,
	FiType,
} from '@wp-g2/icons';
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
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
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
	SearchInput,
	SegmentedControl,
	Select,
	SelectDropdown,
	Separator,
	Slider,
	Spacer,
	Surface,
	Tab,
	TabList,
	TabPanel,
	Tabs,
	Text,
	TextInput,
	UnitInput,
	useNavigatorHistory,
	useNavigatorLocation,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/GlobalStylesSidebarNext',
};

const ANIMATION_SPEED = 0.14;

const Breadcrumb = View;
const BreadcrumbItem = ({ children, isCurrent, ...props }) => (
	<View css={{ display: 'inline-flex', alignItems: 'center' }} {...props}>
		{children}
		{!isCurrent && <View css={{ marginLeft: 8, marginRight: 8 }}>›</View>}
	</View>
);

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
	setAttribute: (scope, attribute, prop) => (value) => {
		const path = `${scope}.${attribute}`;
		if (path) {
			set((prev) => {
				const next = _.set(prev, path, value);
				return { ...prev, ...next };
			});
		}
	},
	getBoundProps: (scope, attribute, prop) => {
		const path = `${scope}.${attribute}`;
		return {
			value: _.get(get(), path)?.[prop],
			onChange: get()?.setAttribute(scope, attribute, prop),
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
			getBoundProps(scope, 'typography', 'fontWeight').value,
	);

	return (
		<Panel>
			<PanelHeader title="Typography" />
			<PanelBody>
				<ListGroup>
					<FormGroup label="Font">
						<TextInput
							{...getBoundProps(
								scope,
								'typography',
								'fontFamily',
							)}
						/>
					</FormGroup>
					<Grid>
						<FormGroup label="Size">
							<UnitInput
								cssProp="fontSize"
								{...getBoundProps(
									scope,
									'typography',
									'fontSize',
								)}
							/>
						</FormGroup>
						<FormGroup label="Weight">
							<SelectDropdown
								isPreviewable
								minWidth={80}
								onChange={(next) =>
									setAttribute(
										scope,
										'typography',
										'fontWeight',
									)(next.selectedItem.value)
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
									scope,
									'typography',
									'lineHeight',
								)}
							/>
						</FormGroup>
						<FormGroup label="Letter Spacing">
							<UnitInput
								cssProp="letterSpacing"
								{...getBoundProps(
									scope,
									'typography',
									'letterSpacing',
								)}
							/>
						</FormGroup>
					</Grid>
				</ListGroup>
			</PanelBody>
		</Panel>
	);
};

const GlobalSettings = () => {
	return (
		<>
			<TypographyTools />
		</>
	);
};

const BlockSettingHome = () => {
	return (
		<>
			<CardHeader>
				<SearchInput placeholder="Search" />
			</CardHeader>
			{blocks.map((block) => (
				<NavigatorLink key={block.id} to={block.id}>
					<View>{block.title}</View>
				</NavigatorLink>
			))}
		</>
	);
};

const BlockSettingScreen = () => {
	return <View>Hello</View>;
};

const blocks = [
	{
		id: 'code',
		title: 'Code',
	},
	{
		id: 'paragraph',
		title: 'Paragraph',
	},
];

const blocksScreens = blocks.map((block) => {
	return {
		...block,
		path: block.id,
		component: block.component || BlockSettingScreen,
	};
});

const blockSettingsScreens = [
	{
		id: 'home',
		title: 'Home',
		component: BlockSettingHome,
		path: 'home',
	},
	...blocksScreens,
];

const BlocksSettings = () => {
	const initialPath = 'home';
	return (
		<Navigator initialPath={initialPath}>
			<NavigatorScreens css={[ui.frame.height('auto')]}>
				{blockSettingsScreens.map((screen) => (
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

const OmniHeader = (props) => {
	return (
		<CardBody isScrollable>
			<VStack>
				<Heading size={4}>Global Styles</Heading>
				<SearchInput />
			</VStack>
		</CardBody>
	);
};

const Example = () => {
	return (
		<div>
			<OmniHeader />
			<View css={[ui.padding.y(1)]}>
				<PanelHeader>
					<HStack>
						<Heading size={4}>Global Styles</Heading>
						<Dropdown hideOnClickItem placement="bottom-end">
							<DropdownTrigger
								icon={<FiMoreHorizontal />}
								isControl
								isSubtle
							/>
							<DropdownMenu maxWidth={160}>
								<DropdownMenuItem>Preview</DropdownMenuItem>
								<DropdownMenuItem>Reset</DropdownMenuItem>
								<Separator />
								<DropdownMenuItem>Hide</DropdownMenuItem>
							</DropdownMenu>
						</Dropdown>
					</HStack>
				</PanelHeader>
			</View>
			<Tabs selectedId="global-styles-blocks">
				<TabList>
					<Tab id="global-styles-settings">Global</Tab>
					<Tab id="global-styles-blocks">Blocks</Tab>
				</TabList>
				<TabPanel>
					<GlobalSettings />
				</TabPanel>
				<TabPanel>
					<BlocksSettings />
				</TabPanel>
			</Tabs>
		</div>
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
