import {
	FiChevronLeft,
	FiDroplet,
	FiGrid,
	FiMaximize2,
	FiMinimize2,
	FiMinus,
	FiMoreHorizontal,
	FiPlus,
	FiSearch,
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
	CloseButton,
	ColorControl,
	Container,
	ContextSystemProvider,
	ControlGroup,
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
	Placeholder,
	Popover,
	SearchInput,
	SegmentedControl,
	Select,
	SelectDropdown,
	Separator,
	Slider,
	Spacer,
	Surface,
	Text,
	TextInput,
	UnitInput,
	useNavigatorHistory,
	useNavigatorLocation,
	View,
	VStack,
} from '../../index';

export default {
	title: 'Examples/WIP/GlobalStylesSidebar',
};

const ANIMATION_SPEED = 0.1;

const Breadcrumbs = View;
const BreadcrumbItem = ({ children, isCurrent, ...props }) => (
	<View css={{ display: 'inline-flex', alignItems: 'center' }} {...props}>
		{children}
		{!isCurrent && <View css={{ marginLeft: 8, marginRight: 8 }}>›</View>}
	</View>
);

const globalStylesStore = createStore((set, get) => ({
	showPreview: false,
	searchQuery: '',
	global: {
		typography: {
			fontFamily: 'system-ui',
			fontSize: '16px',
			fontWeight: '400',
			appearance: 'normal',
			letterSpacing: '0px',
			lineHeight: 1.5,
		},
	},
	paragraph: {
		typography: {
			fontFamily: 'system-ui',
			fontSize: '16px',
			fontWeight: '400',
			appearance: 'normal',
			letterSpacing: '0px',
			lineHeight: 1.5,
		},
	},
	setAttribute: (scope, attribute, prop) => (value) => {
		const path = `${scope}.${attribute}.${prop}`;
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
	setSearchQuery: (next) => set((prev) => ({ ...prev, searchQuery: next })),
	clearSearchQuery: (next) => set((prev) => ({ ...prev, searchQuery: '' })),
	togglePreview: () =>
		set((prev) => ({ ...prev, showPreview: !prev.showPreview })),
}));

const useGlobalStylesStore = globalStylesStore;

const TypographyTools = ({ scope = 'global' }) => {
	const [getBoundProps, setAttribute] = useGlobalStylesStore(
		(state) => [state.getBoundProps, state.setAttribute],
		shallowCompare,
	);
	const togglePreview = useGlobalStylesStore((state) => state.togglePreview);

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
		<>
			<CardBody>
				<HStack css={[ui.padding.y(2), ui.margin.y(-2)]}>
					<Heading size={5}>Typography</Heading>
					<Spacer />
					<Dropdown
						hideOnClickItem
						placement="bottom-end"
						unstable_fixed={true}
					>
						<DropdownTrigger
							icon={<FiMoreHorizontal />}
							isControl
							isSubtle
						/>
						<DropdownMenu
							maxWidth={120}
							minWidth={100}
							preventBodyScroll={false}
						>
							<DropdownMenuItem onClick={togglePreview}>
								Preview
							</DropdownMenuItem>
							<Separator />
							<DropdownMenuItem>Font</DropdownMenuItem>
							<DropdownMenuItem>Spacing</DropdownMenuItem>
							<DropdownMenuItem>Align</DropdownMenuItem>
							<DropdownMenuItem>Decoration</DropdownMenuItem>
						</DropdownMenu>
					</Dropdown>
				</HStack>
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
								step={0.1}
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
								step={0.1}
								{...getBoundProps(
									scope,
									'typography',
									'letterSpacing',
								)}
							/>
						</FormGroup>
					</Grid>
				</ListGroup>
			</CardBody>
		</>
	);
};

const Screen = styled(Surface, { props: { variant: 'tertiary' } })`
	bottom: 0;
	left: 0;
	right: 0;
	top: 0;
`;

const SettingLink = ({ meta, prefix, title, to }) => {
	const [searchQuery, clearSearchQuery] = useGlobalStylesStore((state) => [
		state.searchQuery,
		state.clearSearchQuery,
	]);
	return (
		<NavigatorLink onClick={clearSearchQuery} to={to}>
			<MenuItem prefix={prefix} showArrow>
				<VStack spacing={0}>
					<Text highlightWords={[searchQuery]} weight={600}>
						{title}
					</Text>
					{meta && <Text size="caption">{meta}</Text>}
				</VStack>
			</MenuItem>
		</NavigatorLink>
	);
};

const GlobalStylesScreen = () => {
	const searchQuery = useGlobalStylesStore(
		(state) => state.searchQuery,
		shallowCompare,
	);
	const hasSearchQuery = !!searchQuery;

	if (hasSearchQuery) {
		return (
			<Screen>
				<CardBody>
					<ListGroup>
						<SettingLink
							meta="Site"
							title="Typography"
							to="SiteTypography"
						/>
						<SettingLink meta="Core" title="Code" to="Paragraph" />
						<SettingLink
							meta="Core"
							title="Columns"
							to="Paragraph"
						/>
						<SettingLink meta="Core" title="Group" to="Paragraph" />
						<SettingLink
							meta="Core"
							title="Paragraph"
							to="Paragraph"
						/>
					</ListGroup>
				</CardBody>
			</Screen>
		);
	}

	return (
		<Screen>
			<CardBody>
				<ListGroupHeader>Site</ListGroupHeader>
				<Spacer mb={3} />
				<ListGroup>
					<SettingLink title="Typography" to="SiteTypography" />
					<SettingLink title="Colors" to="SiteColors" />
				</ListGroup>
			</CardBody>

			<Divider m={3} />

			<CardBody>
				<ListGroupHeader>Blocks</ListGroupHeader>
				<Spacer mb={3} />
				<ListGroup>
					<SettingLink title="Code" to="Paragraph" />
					<SettingLink title="Columns" to="Paragraph" />
					<SettingLink title="Group" to="Paragraph" />
					<SettingLink title="Paragraph" to="Paragraph" />
				</ListGroup>
			</CardBody>
		</Screen>
	);
};

const PreviewModal = React.memo(({ children }) => {
	const showPreview = useGlobalStylesStore(
		(state) => state.showPreview,
		shallowCompare,
	);
	const togglePreview = useGlobalStylesStore((state) => state.togglePreview);
	const [large, setLarge] = React.useState(false);

	if (!showPreview) return null;

	return (
		<View
			css={{
				position: 'fixed',
				right: 290,
				top: 97,
				zIndex: 999,
			}}
		>
			<Animated
				drag
				dragConstraints={{ right: 0 }}
				dragElastic={0.05}
				dragMomentum={false}
				key="typographyPreview"
			>
				<Card elevation={3}>
					<CardHeader size="small">
						<Heading lineHeight={1} size={6}>
							Preview
						</Heading>
						<CloseButton
							css={{ marginRight: -8 }}
							onClick={togglePreview}
							size="small"
						/>
					</CardHeader>
					<Surface
						backgroundSize={8}
						css={{ position: 'relative', paddingBottom: 16 }}
						variant="dotted"
					>
						<View
							css={{
								position: 'absolute',
								bottom: 8,
								right: 8,
								zIndex: 33,
							}}
						>
							<HStack alignment="left">
								<Text isBlock variant="muted">
									<Icon icon={<FiSearch />} size={14} />
								</Text>
								<ControlGroup isInline>
									<Button
										icon={<FiMinus />}
										iconSize={14}
										isControl
										onClick={() => setLarge(false)}
										size="xSmall"
									/>
									<Button
										icon={<FiPlus />}
										iconSize={14}
										isControl
										onClick={() => setLarge(true)}
										size="xSmall"
									/>
								</ControlGroup>
							</HStack>
						</View>
						<CardBody
							css={[
								ui.alignment.content.center,
								ui.animation.default,
								{
									width: large ? 600 : 300,
									height: large ? 320 : 160,
									overflow: 'hidden',
								},
							]}
						>
							{children}
						</CardBody>
					</Surface>
				</Card>
			</Animated>
		</View>
	);
});

const TypographyPreview = () => {
	const attributes = useGlobalStylesStore((state) =>
		Object.entries(state.global.typography),
	);
	const style = Object.fromEntries(attributes);

	return (
		<div
			contentEditable
			style={{ ...style, outline: 'none' }}
			suppressContentEditableWarning
		>
			In a village of La Mancha, the name of which I have no desire to
			call to mind, there lived not long since one of those gentlemen that
			keep a lance in the lance-rack, an old buckler, a lean hack, and a
			greyhound for coursing.
		</div>
	);
};

const useNavigatorCurrentScreen = (path) => {
	const { pathname } = useNavigatorLocation();
	const match = path || pathname;
	const screen = screens.find((screen) => screen.path === match);

	return screen;
};

const OmniHeader = () => {
	const [
		searchQuery,
		setSearchQuery,
		clearSearchQuery,
	] = useGlobalStylesStore(
		({ clearSearchQuery, searchQuery, setSearchQuery }) => [
			searchQuery,
			setSearchQuery,
			clearSearchQuery,
		],
		shallowCompare,
	);

	const currentScreen = useNavigatorCurrentScreen();
	const { category, path, title } = currentScreen;
	const isHome = path === 'GlobalStyles';

	return (
		<CardBody>
			<VStack spacing={0}>
				<HStack
					css={{ paddingTop: 8, paddingBottom: 4, minHeight: 30 }}
				>
					{isHome && <Text weight="bold">{title}</Text>}
					{!isHome && (
						<View>
							<Breadcrumbs>
								<BreadcrumbItem>
									<NavigatorLink isBack to="GlobalStyles">
										Global Styles
									</NavigatorLink>
								</BreadcrumbItem>
								<BreadcrumbItem isCurrent>
									{category}
								</BreadcrumbItem>
							</Breadcrumbs>
						</View>
					)}
					)
					<Spacer />
					<Dropdown
						hideOnClickItem
						placement="bottom-end"
						unstable_fixed={true}
					>
						<DropdownTrigger
							icon={<FiMoreHorizontal />}
							isControl
							isSubtle
						/>
						<DropdownMenu
							maxWidth={120}
							minWidth={100}
							preventBodyScroll={false}
						>
							<DropdownMenuItem>Reset</DropdownMenuItem>
							<Separator />
							<DropdownMenuItem>Hide</DropdownMenuItem>
						</DropdownMenu>
					</Dropdown>
				</HStack>
				<HStack css={{ minHeight: 30 }}>
					{isHome ? (
						<SearchInput
							onChange={setSearchQuery}
							onClear={clearSearchQuery}
							placeholder="Search..."
							value={searchQuery}
						/>
					) : (
						<Heading size={4}>{title}</Heading>
					)}
				</HStack>
			</VStack>
		</CardBody>
	);
};

const SiteTypographyScreen = () => (
	<Screen>
		<TypographyTools scope="global" visible />
	</Screen>
);

const SiteColorsScreen = () => (
	<Screen>
		<Text>Color Tools</Text>
	</Screen>
);

const ParagraphScreen = () => (
	<Screen>
		<TypographyTools scope="paragraph" visible />
	</Screen>
);

const screens = [
	{
		component: GlobalStylesScreen,
		path: 'GlobalStyles',
		title: 'Global Styles',
		category: null,
	},
	{
		component: SiteTypographyScreen,
		path: 'SiteTypography',
		title: 'Typography',
		category: 'Site',
	},
	{
		component: SiteColorsScreen,
		path: 'SiteColors',
		title: 'Colors',
		category: 'Site',
	},
	{
		component: ParagraphScreen,
		path: 'Paragraph',
		title: 'Paragraph',
		category: 'Core',
	},
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
	const initialPath = 'GlobalStyles';
	// const initialPath = 'Typography';
	return (
		<Navigator initialPath={initialPath}>
			<OmniHeader />
			<Divider />
			<PreviewModal>
				<TypographyPreview />
			</PreviewModal>
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

const DemoContent = () => {
	const attributes = useGlobalStylesStore((state) =>
		Object.entries(state.global.typography),
	);
	const style = Object.fromEntries(attributes);

	return (
		<VStack spacing={8}>
			<Container width={960}>
				<Placeholder height="80vh" width="100%" />
			</Container>
			<Container style={style} width={640}>
				<Heading size={1} style={{ marginBottom: 30 }}>
					Chapter 1
				</Heading>
				<p style={{ marginBottom: 30 }}>
					In a village of La Mancha, the name of which I have no
					desire to call to mind, there lived not long since one of
					those gentlemen that keep a lance in the lance-rack, an old
					buckler, a lean hack, and a greyhound for coursing. An olla
					of rather more beef than mutton, a salad on most nights,
					scraps on Saturdays, lentils on Fridays, and a pigeon or so
					extra on Sundays, made away with three-quarters of his
					income. The rest of it went in a doublet of fine cloth and
					velvet breeches and shoes to match for holidays, while on
					week-days he made a brave figure in his best homespun. He
					had in his house a housekeeper past forty, a niece under
					twenty, and a lad for the field and market-place, who used
					to saddle the hack as well as handle the bill-hook. The age
					of this gentleman of ours was bordering on fifty; he was of
					a hardy habit, spare, gaunt-featured, a very early riser and
					a great sportsman. They will have it his surname was Quixada
					or Quesada (for here there is some difference of opinion
					among the authors who write on the subject), although from
					reasonable conjectures it seems plain that he was called
					Quexana. This, however, is of but little importance to our
					tale; it will be enough not to stray a hair's breadth from
					the truth in the telling of it.
				</p>
			</Container>
			<Container width={960}>
				<Placeholder height="80vh" width="100%" />
			</Container>
			<Container style={style} width={640}>
				<p>
					You must know, then, that the above-named gentleman whenever
					he was at leisure (which was mostly all the year round) gave
					himself up to reading books of chivalry with such ardour and
					avidity that he almost entirely neglected the pursuit of his
					field-sports, and even the management of his property; and
					to such a pitch did his eagerness and infatuation go that he
					sold many an acre of tillageland to buy books of chivalry to
					read, and brought home as many of them as he could get. But
					of all there were none he liked so well as those of the
					famous Feliciano de Silva's composition, for their lucidity
					of style and complicated conceits were as pearls in his
					sight, particularly when in his reading he came upon
					courtships and cartels, where he often found passages like
					"the reason of the unreason with which my reason is
					afflicted so weakens my reason that with reason I murmur at
					your beauty;" or again, "the high heavens, that of your
					divinity divinely fortify you with the stars, render you
					deserving of the desert your greatness deserves." Over
					conceits of this sort the poor gentleman lost his wits, and
					used to lie awake striving to understand them and worm the
					meaning out of them; what Aristotle himself could not have
					made out or extracted had he come to life again for that
					special purpose. He was not at all easy about the wounds
					which Don Belianis gave and took, because it seemed to him
					that, great as were the surgeons who had cured him, he must
					have had his face and body covered all over with seams and
					scars. He commended, however, the author's way of ending his
					book with the promise of that interminable adventure, and
					many a time was he tempted to take up his pen and finish it
					properly as is there proposed, which no doubt he would have
					done, and made a successful piece of work of it too, had not
					greater and more absorbing thoughts prevented him.
				</p>
			</Container>
			<Container width={960}>
				<Placeholder height="50vh" width="100%" />
			</Container>
		</VStack>
	);
};

export const _default = () => {
	return (
		<div>
			<View css={{ margin: -26 }}>
				<View
					css={{
						height: '100vh',
						marginRight: 280,
						overflow: 'auto',
					}}
				>
					<DemoContent />
				</View>
			</View>
			<Sidebar>
				<Example />
			</Sidebar>
		</div>
	);
};
