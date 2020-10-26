import {
	Accordion,
	Button,
	ColorCircle,
	ColorControl,
	ColorPicker,
	ControlLabel,
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
	FormGroup,
	Grid,
	HStack,
	ListGroup,
	ListGroupHeader,
	Navigator,
	NavigatorButton,
	NavigatorScreen,
	NavigatorScreens,
	Panel,
	PanelBody,
	PanelHeader,
	Popover,
	Select,
	Separator,
	Slider,
	Spacer,
	Surface,
	Switch,
	Text,
	TextInput,
	UnitInput,
	View,
	VStack,
} from '@wp-g2/components';
import {
	FiChevronLeft,
	FiChevronRight,
	FiCornerUpLeft,
	FiMinus,
	FiMoreHorizontal,
	FiPlus,
} from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import { add, is, noop, subtract } from '@wp-g2/utils';
import React from 'react';
import CSSUnit from 'units-css';

import {
	colorOptionKeys,
	colorPaletteStore,
	dimensionsOptionKeys,
	sidebarPanelStore,
	themeColorPaletteStore,
	typographyOptionKeys,
	typographyStore,
	useGlobalStyles,
} from './components';

export default {
	title: 'DesignTools/TypographyTools',
};

const RemoveButton = (props) => {
	return (
		<Button
			className="action"
			css={`
				opacity: 0;
				pointer-events: none;
				&:focus {
					opacity: 1;
					pointer-events: initial;
				}
			`}
			icon={<FiMinus />}
			isControl
			isSubtle
			size="xSmall"
			tabIndex={-1}
			{...props}
		/>
	);
};

const ResetButton = (props) => (
	<RemoveButton icon={<FiCornerUpLeft />} {...props} />
);

export const TypographyOptions = React.memo(
	({ addIcon = <FiMoreHorizontal />, exclude = [] }) => {
		const { setState, ...settings } = useGlobalStyles();

		const optionsEntries = Object.entries(typographyOptionKeys).filter(
			([k]) => !exclude.includes(k),
		);

		const handleOnToggle = React.useCallback(
			({ prop, value }) => () => {
				typographyStore.getState().set({ [prop]: value });
			},
			[],
		);

		return (
			<Dropdown placement="bottom-end">
				<DropdownTrigger
					hasCaret={false}
					icon={addIcon}
					isControl
					isSubtle
					size="xSmall"
				/>
				<DropdownMenu maxWidth={160} minWidth={160}>
					{optionsEntries.map(([key, value]) => {
						const isSelected = is.defined(settings[key]);

						return (
							<DropdownMenuItem
								isSelected={isSelected}
								key={key}
								onClick={handleOnToggle({
									prop: key,
									value: isSelected ? null : value.value,
								})}
								value={key}
							>
								{value.label}
							</DropdownMenuItem>
						);
					})}
					<Separator />
					<DropdownMenuItem
						closeOnClick
						onClick={typographyStore.getState().resetAll}
					>
						Reset All
					</DropdownMenuItem>
				</DropdownMenu>
			</Dropdown>
		);
	},
);

export const FontStyleControl = React.memo(() => {
	const [fontSize, letterSpacing, lineHeight] = useGlobalStyles(
		(state) => [state.fontSize, state.letterSpacing, state.lineHeight],
		shallowCompare,
	);

	const handleOnChange = React.useCallback(
		(key) => (value) => {
			typographyStore.setState({ [key]: value });
		},
		[],
	);

	if (![fontSize, lineHeight, letterSpacing].filter(Boolean).length)
		return null;

	return (
		<Grid columns={3}>
			{fontSize && (
				<FormGroup label="Size">
					<UnitInput
						min={0}
						onChange={handleOnChange('fontSize')}
						value={fontSize}
					/>
				</FormGroup>
			)}
			{letterSpacing && (
				<FormGroup label="Spacing">
					<TextInput
						min={-10}
						onChange={handleOnChange('letterSpacing')}
						step={0.5}
						type="number"
						value={letterSpacing}
					/>
				</FormGroup>
			)}
			{lineHeight && (
				<FormGroup label="Height">
					<TextInput
						min={0}
						onChange={handleOnChange('lineHeight')}
						step={0.5}
						type="number"
						value={lineHeight}
					/>
				</FormGroup>
			)}
		</Grid>
	);
});

export const FontFamilyControl = React.memo(() => {
	const [fontFamily, fontWeight] = useGlobalStyles(
		(state) => [state.fontFamily, state.fontWeight],
		shallowCompare,
	);

	const handleOnChange = React.useCallback(
		(key) => (value) => typographyStore.setState({ [key]: value }),
		[],
	);

	if (![fontFamily, fontFamily].filter(Boolean).length) return null;

	return (
		<Grid>
			{fontFamily && (
				<FormGroup label="Family">
					<TextInput
						onChange={handleOnChange('fontFamily')}
						value={fontFamily}
					/>
				</FormGroup>
			)}
			{fontWeight && (
				<FormGroup label="Weight">
					<Select
						onChange={handleOnChange('fontWeight')}
						value={fontWeight}
					>
						<option value="Lighter">Light</option>
						<option value="Normal">Regular</option>
						<option value="Bold">Bold</option>
						<option value="Bolder">Bolder</option>
					</Select>
				</FormGroup>
			)}
		</Grid>
	);
});

export const CombinedFormGroup = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		showRemove = true,
		showRemoveRight,
		showResetRight,
		...otherProps
	}) => {
		const [value] = useGlobalStyles(
			(state) => [state[prop]],
			shallowCompare,
		);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.getState().set({ [prop]: value });
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.getState().set({ [prop]: null });
		}, [prop]);

		const handleOnReset = React.useCallback(() => {
			typographyStore.getState().reset(prop);
		}, [prop]);

		if (!is.defined(value)) return null;

		return (
			<FormGroup
				css={`
					&:hover {
						.action {
							opacity: 1;
							pointer-events: initial;
						}
					}
				`}
			>
				<HStack>
					<ControlLabel>{label}</ControlLabel>
					{showRemove && <RemoveButton onClick={handleOnRemove} />}
				</HStack>
				<HStack>
					<Component
						onChange={handleOnChange}
						value={value}
						{...otherProps}
					/>
					{showRemoveRight && (
						<RemoveButton onClick={handleOnRemove} />
					)}
					{showResetRight && <ResetButton onClick={handleOnReset} />}
				</HStack>
			</FormGroup>
		);
	},
);

export const CombinedFormGroupSwitch = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		showRemove = true,
		...otherProps
	}) => {
		const [value] = useGlobalStyles(
			(state) => [state[prop]],
			shallowCompare,
		);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.getState().set({ [prop]: value });
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.getState().set({ [prop]: null });
		}, [prop]);

		if (!is.defined(value)) return null;

		return (
			<FormGroup
				css={`
					&:hover {
						.action {
							opacity: 1;
							pointer-events: initial;
						}
					}
				`}
				horizontal
				templateColumns="1fr"
			>
				<HStack>
					<ControlLabel>{label}</ControlLabel>
					<Spacer />
					<Switch
						checked={!!value}
						onChange={handleOnChange}
						{...otherProps}
					/>
					{showRemove && <RemoveButton onClick={handleOnRemove} />}
				</HStack>
			</FormGroup>
		);
	},
);

export const CombinedFormGroupSwitchLeft = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		showRemove = true,
		showRemoveRight,
		showResetRight,
		...otherProps
	}) => {
		const [value] = useGlobalStyles(
			(state) => [state[prop]],
			shallowCompare,
		);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.getState().set({ [prop]: value });
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.getState().set({ [prop]: null });
		}, [prop]);

		const handleOnReset = React.useCallback(() => {
			typographyStore.getState().reset(prop);
		}, [prop]);

		if (!is.defined(value)) return null;

		return (
			<FormGroup
				css={`
					&:hover {
						.action {
							opacity: 1;
							pointer-events: initial;
						}
					}
				`}
				horizontal
				label={label}
			>
				<HStack>
					<Switch
						checked={!!value}
						onChange={handleOnChange}
						{...otherProps}
					/>
					<Spacer />
					{showRemoveRight && (
						<RemoveButton onClick={handleOnRemove} />
					)}
					{showResetRight && <ResetButton onClick={handleOnReset} />}
				</HStack>
			</FormGroup>
		);
	},
);

export const CombinedFormGroupSwitchAlt = React.memo(
	({ label, prop, ...otherProps }) => {
		const [value] = useGlobalStyles(
			(state) => [state[prop]],
			shallowCompare,
		);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.getState().set({ [prop]: value });
			},
			[prop],
		);

		if (!is.defined(value)) return null;

		return (
			<FormGroup
				css={`
					&:hover {
						.action {
							opacity: 1;
							pointer-events: initial;
						}
					}
				`}
				templateColumns="1fr"
			>
				<HStack alignment="left">
					<Switch
						checked={!!value}
						onChange={handleOnChange}
						{...otherProps}
						css={`
							margin: 0;
						`}
					/>
					<ControlLabel>{label}</ControlLabel>
				</HStack>
			</FormGroup>
		);
	},
);

export const CombinedFormGroupInputSlider = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		min,
		truncate = true,
		max,
		sliderMax,
		showRemove = true,
		showRemoveRight,
		showResetRight,
		...otherProps
	}) => {
		const value = useGlobalStyles((state) => state[prop], shallowCompare);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.setState((prev) => {
					// Handles unit changes
					const unit =
						CSSUnit.parse(value).unit ||
						CSSUnit.parse(prev[prop]).unit;

					const { unit: nextUnit, value: nextValue } = CSSUnit.parse(
						value,
					);

					let next = unit ? `${nextValue}${unit}` : value;

					if (nextValue === 0 && nextUnit === value) {
						next = value;
					}

					return { [prop]: next };
				});
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.getState().set({ [prop]: null });
		}, [prop]);

		const handleOnReset = React.useCallback(() => {
			typographyStore.getState().reset(prop);
		}, [prop]);

		if (value === null) return null;
		const cssValue = CSSUnit.parse(value);

		return (
			<FormGroup
				align="center"
				css={`
					&:hover {
						.action {
							opacity: 1;
							pointer-events: initial;
						}
					}
				`}
			>
				<ControlLabel
					title={truncate ? label : null}
					truncate={truncate}
				>
					{label}
				</ControlLabel>
				<HStack>
					<Grid>
						<Component
							max={max}
							min={min}
							onChange={handleOnChange}
							value={value}
							{...otherProps}
						/>
						<Slider
							max={sliderMax || 20}
							min={min}
							onChange={handleOnChange}
							value={cssValue.value}
						/>
					</Grid>
					{showRemoveRight && (
						<RemoveButton onClick={handleOnRemove} />
					)}
					{showResetRight && <ResetButton onClick={handleOnReset} />}
				</HStack>
			</FormGroup>
		);
	},
);

export const CombinedFormGroupInputStepper = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		min,
		truncate = true,
		max,
		showRemove = true,
		showRemoveRight,
		showResetRight,
		...otherProps
	}) => {
		const value = useGlobalStyles((state) => state[prop], shallowCompare);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.getState().set({ [prop]: value });
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.getState().set({ [prop]: null });
		}, [prop]);

		const handleOnReset = React.useCallback(() => {
			typographyStore.getState().reset(prop);
		}, [prop]);

		if (value === null) return null;

		return (
			<FormGroup
				align="center"
				css={`
					&:hover {
						.action {
							opacity: 1;
							pointer-events: initial;
						}
					}
				`}
			>
				<ControlLabel
					title={truncate ? label : null}
					truncate={truncate}
				>
					{label}
				</ControlLabel>
				<HStack>
					<Component
						arrows="stepper"
						max={max}
						min={min}
						onChange={handleOnChange}
						value={value}
						{...otherProps}
					/>
					{showRemoveRight && (
						<RemoveButton onClick={handleOnRemove} />
					)}
					{showResetRight && <ResetButton onClick={handleOnReset} />}
				</HStack>
			</FormGroup>
		);
	},
);

export const ColorPaletteControl = React.memo(
	({ label = 'Theme palette', prop, store = colorPaletteStore }) => {
		const currentColor = typographyStore(
			(state) => state[prop],
			shallowCompare,
		);
		const colors = store((state) => Object.entries(state), shallowCompare);

		const handleOnClick = React.useCallback(
			(value) => {
				return () => {
					typographyStore.getState().set({ [prop]: value });
				};
			},
			[prop],
		);

		const isColorActive = (value) => {
			return (
				ui.color(currentColor).toRgbString() ===
				ui.color(value).toRgbString()
			);
		};

		return (
			<VStack spacing={3}>
				<Text>{label}</Text>
				<Grid columns={7} gap={2}>
					{colors.map(([k, v]) => (
						<ColorCircle
							color={v}
							isActive={isColorActive(v)}
							isInteractive
							key={k}
							onClick={handleOnClick(v)}
						/>
					))}
				</Grid>
			</VStack>
		);
	},
);

const ColorSetting = ({ label, prop, selectUI }) => {
	const value = useGlobalStyles((state) => state[prop], shallowCompare);

	const handleOnChange = React.useCallback(
		(value) => {
			typographyStore.getState().set({ [prop]: value });
		},
		[prop],
	);

	return (
		<Panel css={[ui.margin.x(-3)]} isBorderless>
			<PanelHeader as={ColorControl} color={value} hideArrow>
				{label}
			</PanelHeader>
			<PanelBody>
				<View css={[ui.padding.bottom(5)]}>
					<VStack spacing={5}>
						{selectUI ? (
							<ColorNavigatorSelect prop={prop} />
						) : (
							<ColorNavigator prop={prop} />
						)}
						<Popover
							maxWidth={265}
							placement="bottom"
							trigger={
								<ColorCircle
									color={value}
									isInteractive
									size="large"
									variant="pill"
								/>
							}
						>
							<View css={ui.padding(3)}>
								<ColorPicker
									color={value}
									onChange={handleOnChange}
								/>
							</View>
						</Popover>
					</VStack>
				</View>
			</PanelBody>
		</Panel>
	);
};

export const DimensionsOptions = React.memo(
	({ addIcon = <FiMoreHorizontal /> }) => {
		const { setState, ...settings } = useGlobalStyles();
		const optionsEntries = Object.entries(dimensionsOptionKeys);

		const handleOnToggle = React.useCallback(
			({ prop, value }) => () => {
				typographyStore.getState().set({ [prop]: value });
			},
			[],
		);

		return (
			<Dropdown placement="bottom-end">
				<DropdownTrigger
					hasCaret={false}
					icon={addIcon}
					isControl
					isSubtle
					size="xSmall"
				/>
				<DropdownMenu maxWidth={160} minWidth={160}>
					{optionsEntries.map(([key, value]) => {
						const isSelected = is.defined(settings[key]);

						return (
							<DropdownMenuItem
								isSelected={isSelected}
								key={key}
								onClick={handleOnToggle({
									prop: key,
									value: isSelected ? null : value.value,
								})}
								value={key}
							>
								{value.label}
							</DropdownMenuItem>
						);
					})}
				</DropdownMenu>
			</Dropdown>
		);
	},
);

export const ColorOptions = React.memo(({ addIcon = <FiMoreHorizontal /> }) => {
	const { setState, ...settings } = useGlobalStyles();
	const optionsEntries = Object.entries(colorOptionKeys);

	const handleOnToggle = React.useCallback(
		({ prop, value }) => () => {
			typographyStore.getState().set({ [prop]: value });
		},
		[],
	);

	return (
		<Dropdown placement="bottom-end">
			<DropdownTrigger
				hasCaret={false}
				icon={addIcon}
				isControl
				isSubtle
				size="xSmall"
			/>
			<DropdownMenu maxWidth={160} minWidth={160}>
				{optionsEntries.map(([key, value]) => {
					const isSelected = is.defined(settings[key]);

					return (
						<DropdownMenuItem
							isSelected={isSelected}
							key={key}
							onClick={handleOnToggle({
								prop: key,
								value: isSelected ? null : value.value,
							})}
							value={key}
						>
							{value.label}
						</DropdownMenuItem>
					);
				})}
			</DropdownMenu>
		</Dropdown>
	);
});

export const ColorPanel = ({ selectUI }) => {
	return (
		<ListGroup>
			<ListGroupHeader>Color</ListGroupHeader>
			<Accordion>
				<ColorSetting
					label="Background"
					prop="backgroundColor"
					selectUI={selectUI}
				/>
				<ColorSetting
					label="Text"
					prop="textColor"
					selectUI={selectUI}
				/>
			</Accordion>
		</ListGroup>
	);
};

const ThemePalette = ({ prop }) => {
	return (
		<View css={ui.padding(2)}>
			<ColorPaletteControl prop={prop} />
		</View>
	);
};

const CorePalette = ({ prop }) => {
	return (
		<View css={ui.padding(2)}>
			<ColorPaletteControl
				label="Core palette"
				prop={prop}
				store={themeColorPaletteStore}
			/>
		</View>
	);
};

const screens = [
	{ component: ThemePalette, path: 'Theme' },
	{ component: CorePalette, path: 'Core' },
];

const ColorNavigatorButton = ({ icon, ...props }) => {
	return (
		<NavigatorButton
			icon={icon}
			isControl
			isSubtle
			size="small"
			{...props}
		/>
	);
};

export const ColorNavigator = ({ prop = 'backgroundColor' }) => {
	return (
		<View css={[ui.position.relative, ui.margin.x(-2)]}>
			<Navigator initialPath="Theme">
				<HStack
					css={[
						ui.position.absolute,
						{ top: 0, right: 4, width: 'auto' },
						ui.zIndex(10),
					]}
				>
					<ColorNavigatorButton
						icon={<FiChevronLeft />}
						isBack
						to="Theme"
					/>
					<ColorNavigatorButton icon={<FiChevronRight />} to="Core" />
				</HStack>
				<NavigatorScreens>
					{screens.map((screen) => (
						<NavigatorScreen
							{...screen}
							key={screen.path}
							prop={prop}
						/>
					))}
				</NavigatorScreens>
			</Navigator>
		</View>
	);
};

export const ColorNavigatorSelect = ({ prop = 'backgroundColor' }) => {
	const [value, setValue] = React.useState('theme');
	return (
		<>
			<FormGroup horizontal label="Palette">
				<Select onChange={setValue} value={value}>
					<option label="Theme" value="theme" />
					<option label="Core" value="core" />
				</Select>
			</FormGroup>
			<View css={[ui.position.relative, ui.margin.x(-2)]}>
				{value === 'theme' && <ThemePalette prop={prop} />}
				{value === 'core' && <CorePalette prop={prop} />}
			</View>
		</>
	);
};

export const DimensionsPanel = () => {
	return (
		<ListGroup>
			<ListGroupHeader>
				Dimensions
				<DimensionsOptions addIcon={<FiPlus />} />
			</ListGroupHeader>
			<CombinedFormGroupInputSlider
				Component={UnitInput}
				arrows={false}
				cssProp="height"
				label="Height"
				min={0}
				prop="height"
				showRemove={false}
				showRemoveRight
				sliderMax={100}
				truncate={false}
				type="number"
			/>
			<CombinedFormGroup
				Component={UnitInput}
				cssProp="padding"
				label="Padding"
				prop="padding"
				showRemove={false}
				showRemoveRight
			/>
		</ListGroup>
	);
};

export const PanelOverlay = React.memo(() => {
	const [visible, off] = sidebarPanelStore(
		(state) => [state.overlay, state.off],
		shallowCompare,
	);

	return (
		<Surface
			css={[
				ui.borderRadius(8),
				ui.opacity(visible ? 0.8 : 0),
				{ cursor: 'pointer', pointerEvents: visible ? null : 'none' },
				ui.position.full,
				ui.zIndex(1),
			]}
			onClick={off}
		/>
	);
});

export const PresetControl = React.memo(() => {
	const [value, presets, applyPresets] = typographyStore(
		(state) => [state.getCurrentPreset(), state.presets, state.applyPreset],
		shallowCompare,
	);
	const isCustom = value === 'custom';

	return (
		<FormGroup label="Style">
			<Select onChange={applyPresets} value={value}>
				{presets.map((preset) => (
					<option key={preset.value} {...preset} />
				))}
				{isCustom && <option label="Custom" value="custom" />}
			</Select>
		</FormGroup>
	);
});
