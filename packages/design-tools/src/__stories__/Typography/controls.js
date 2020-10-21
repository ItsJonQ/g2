import {
	Button,
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
	ColorCircle,
	ColorControl,
	ColorPicker,
	ControlLabel,
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
	Elevation,
	FormGroup,
	Grid,
	HStack,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Popover,
	Select,
	Slider,
	Spacer,
	Stepper,
	Surface,
	Switch,
	Text,
	TextInput,
	UnitInput,
	View,
	VStack,
} from '@wp-g2/components';
import {
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

		// const hasEntries = Object.keys(settings).filter((key, index) => {
		// 	return !!optionsEntries[index][1];
		// }).length;

		const handleOnToggle = React.useCallback(
			({ prop, value }) => () => {
				typographyStore.setState({ [prop]: value });
			},
			[],
		);

		// if (showActiveOnly && !hasEntries) return null;

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
				typographyStore.setState({ [prop]: value });
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.setState({ [prop]: null });
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
				typographyStore.setState({ [prop]: value });
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.setState({ [prop]: null });
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
				typographyStore.setState({ [prop]: value });
			},
			[prop],
		);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.setState({ [prop]: null });
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
						size="small"
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
				typographyStore.setState({ [prop]: value });
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
						size="small"
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
			typographyStore.setState({ [prop]: null });
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
				typographyStore.setState({ [prop]: value });
			},
			[prop],
		);

		const handleOnIncrement = React.useCallback(() => {
			typographyStore.setState((prev) => {
				return { [prop]: add(prev[prop], 1).toString() };
			});
		}, [prop]);

		const handleOnDecrement = React.useCallback(() => {
			typographyStore.setState((prev) => {
				return { [prop]: subtract(prev[prop], 1).toString() };
			});
		}, [prop]);

		const handleOnRemove = React.useCallback(() => {
			typographyStore.setState({ [prop]: null });
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
					<Grid>
						<Component
							hideArrows
							max={max}
							min={min}
							onChange={handleOnChange}
							value={value}
							{...otherProps}
						/>
						<Stepper
							min={min}
							onChange={handleOnChange}
							onDecrement={handleOnDecrement}
							onIncrement={handleOnIncrement}
							value={value}
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

export const CombinedColorControl = React.memo(({ label, prop }) => {
	return <ColorSetting label={label} prop={prop} />;
});

const ColorPaletteControl = React.memo(({ prop }) => {
	const currentColor = typographyStore(
		(state) => state[prop],
		shallowCompare,
	);
	const colors = colorPaletteStore(
		(state) => Object.entries(state),
		shallowCompare,
	);

	const handleOnClick = React.useCallback(
		(value) => {
			return () => {
				typographyStore.setState({ [prop]: value });
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
			<Text>Theme palette</Text>
			<Grid columns={7} gap={1}>
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
});

const ColorSetting = ({
	label,
	onVisibleChange = noop,
	prop,
	showElevation,
}) => {
	const [visible, setVisible] = React.useState(false);
	const value = useGlobalStyles((state) => state[prop], shallowCompare);

	const handleOnVisibleChange = (next) => {
		setVisible(next);
		onVisibleChange(next);
		sidebarPanelStore.getState().set(next);
	};

	const handleOnChange = React.useCallback(
		(value) => {
			typographyStore.setState({ [prop]: value });
		},
		[prop],
	);

	React.useEffect(() => {
		return sidebarPanelStore.subscribe(
			(next) => {
				if (!next) {
					setVisible(false);
				}
			},
			(state) => state.overlay,
			shallowCompare,
		);
	}, []);

	return (
		<Collapsible
			css={[ui.position.relative, ui.zIndex(visible ? 10 : 0)]}
			onVisibleChange={handleOnVisibleChange}
			visible={visible}
		>
			<Elevation offset={-8} value={showElevation && visible ? 4 : 0} />
			<HStack
				css={[
					ui.hover(
						ui.$('ColorAction').css({
							opacity: 1,
						}),
					),
				]}
			>
				<CollapsibleTrigger as={ColorControl} color={value}>
					{label}
				</CollapsibleTrigger>
			</HStack>
			<CollapsibleContent css={ui.margin.x(-3)}>
				<View css={[ui.padding(3), ui.padding.bottom(5)]}>
					<ListGroups>
						<ListGroup>
							<ColorPaletteControl prop={prop} />
						</ListGroup>
						<ListGroup>
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
						</ListGroup>
					</ListGroups>
				</View>
			</CollapsibleContent>
		</Collapsible>
	);
};

export const DimensionsOptions = React.memo(
	({ addIcon = <FiMoreHorizontal /> }) => {
		const { setState, ...settings } = useGlobalStyles();
		const optionsEntries = Object.entries(dimensionsOptionKeys);

		const handleOnToggle = React.useCallback(
			({ prop, value }) => () => {
				typographyStore.setState({ [prop]: value });
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
			typographyStore.setState({ [prop]: value });
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

export const ColorPanel = () => {
	return (
		<ListGroup>
			<ListGroupHeader>Color</ListGroupHeader>
			<CombinedColorControl label="Background" prop="backgroundColor" />
			<CombinedColorControl label="Text" prop="textColor" />
		</ListGroup>
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
				cssProp="height"
				hideArrows
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
