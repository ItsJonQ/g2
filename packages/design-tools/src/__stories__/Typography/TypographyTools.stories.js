import { StatsGraph } from '@helpscout/stats';
import {
	Button,
	Card,
	CardBody,
	Container,
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
	PresetInput,
	Select,
	Slider,
	Spacer,
	Stepper,
	Surface,
	Switch,
	TextInput,
	UnitInput,
	View,
	VStack,
} from '@wp-g2/components';
import { ContextSystemProvider } from '@wp-g2/context';
import { FiMinus, FiMoreHorizontal, FiPlus } from '@wp-g2/icons';
import { ThemeProvider, ui } from '@wp-g2/styles';
import { shallowCompare } from '@wp-g2/substate';
import { add, is, subtract } from '@wp-g2/utils';
import React from 'react';

import {
	Preview,
	typographyOptionKeys,
	typographyStore,
	useTypography,
} from './components';

export default {
	title: 'DesignTools/TypographyTools',
};

const TypographyOptions = React.memo(({ addIcon = <FiMoreHorizontal /> }) => {
	const { setState, ...settings } = useTypography();
	const optionsEntries = Object.entries(typographyOptionKeys);

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
});

const FontStyleControl = React.memo(() => {
	const [fontSize, letterSpacing, lineHeight] = useTypography(
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

const FontFamilyControl = React.memo(() => {
	const [fontFamily, fontWeight] = useTypography(
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

const CombinedFormGroup = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		showRemove = true,
		...otherProps
	}) => {
		const [value] = useTypography((state) => [state[prop]], shallowCompare);

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
			>
				<HStack>
					<ControlLabel>{label}</ControlLabel>
					{showRemove && (
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
							onClick={handleOnRemove}
							size="xSmall"
							tabIndex={-1}
						/>
					)}
				</HStack>
				<Component
					onChange={handleOnChange}
					value={value}
					{...otherProps}
				/>
			</FormGroup>
		);
	},
);

const CombinedFormGroupSwitch = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		showRemove = true,
		...otherProps
	}) => {
		const [value] = useTypography((state) => [state[prop]], shallowCompare);

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
					{showRemove && (
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
							onClick={handleOnRemove}
							size="xSmall"
							tabIndex={-1}
						/>
					)}
				</HStack>
			</FormGroup>
		);
	},
);

const CombinedFormGroupSwitchAlt = React.memo(
	({ label, prop, ...otherProps }) => {
		const [value] = useTypography((state) => [state[prop]], shallowCompare);

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

const CombinedFormGroupInputSlider = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		min,
		truncate = true,
		max,
		showRemove = true,
		...otherProps
	}) => {
		const [value] = useTypography((state) => [state[prop]], shallowCompare);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.setState({ [prop]: value });
			},
			[prop],
		);

		if (!value == null) return null;

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
				<ControlLabel truncate={truncate}>{label}</ControlLabel>
				<View>
					<Grid>
						<Component
							max={max}
							min={min}
							onChange={handleOnChange}
							value={value}
							{...otherProps}
						/>
						<Slider
							max={20}
							min={min}
							onChange={handleOnChange}
							value={value}
						/>
					</Grid>
				</View>
			</FormGroup>
		);
	},
);

const CombinedFormGroupInputStepper = React.memo(
	({
		Component = TextInput,
		label,
		prop,
		min,
		truncate = true,
		max,
		showRemove = true,
		...otherProps
	}) => {
		const [value] = useTypography((state) => [state[prop]], shallowCompare);

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

		if (!value == null) return null;

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
				<ControlLabel truncate={truncate}>{label}</ControlLabel>
				<View>
					<Grid>
						<Component
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
				</View>
			</FormGroup>
		);
	},
);

const presets = [
	{
		label: 'Small',
		key: 'small',
		value: '10px',
	},
	{
		label: 'Medium',
		key: 'medium',
		value: '16px',
	},
	{
		label: 'Large',
		key: 'large',
		value: '21px',
	},
];

const ExampleFour = () => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>
						Typography
						<TypographyOptions
							addIcon={<FiMoreHorizontal />}
							showActiveOnly
						/>
					</ListGroupHeader>
					<CombinedFormGroup
						label="Font"
						prop="fontFamily"
						showRemove={false}
					/>
					<CombinedFormGroup
						Component={Select}
						label="Weight"
						prop="fontWeight"
						showRemove={false}
					>
						<option value="Lighter">Light</option>
						<option value="Normal">Regular</option>
						<option value="Bold">Bold</option>
						<option value="Bolder">Bolder</option>
					</CombinedFormGroup>
					<CombinedFormGroupInputSlider
						Component={UnitInput}
						label="Size"
						min={0}
						prop="fontSize"
						truncate={false}
						type="number"
					/>
					<CombinedFormGroupInputStepper
						Component={UnitInput}
						label="Line Height"
						min={0}
						prop="lineHeight"
						step={0.5}
						truncate={false}
						type="number"
					/>
					<CombinedFormGroupInputStepper
						Component={UnitInput}
						label="Letter Spacing"
						min={-10}
						prop="letterSpacing"
						step={0.5}
						truncate={false}
						type="number"
					/>
					<CombinedFormGroupSwitchAlt
						label="Drop Cap"
						prop="dropCap"
					/>
				</ListGroup>
			</CardBody>
		</Card>
	);
};

const ExampleThree = () => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>
						Typography
						<TypographyOptions
							addIcon={<FiMoreHorizontal />}
							showActiveOnly
						/>
					</ListGroupHeader>
					<CombinedFormGroup
						label="Font"
						prop="fontFamily"
						showRemove={false}
					/>
					<CombinedFormGroup
						Component={Select}
						label="Weight"
						prop="fontWeight"
						showRemove={false}
					>
						<option value="Lighter">Light</option>
						<option value="Normal">Regular</option>
						<option value="Bold">Bold</option>
						<option value="Bolder">Bolder</option>
					</CombinedFormGroup>
					<CombinedFormGroupInputSlider
						Component={UnitInput}
						label="Size"
						min={0}
						prop="fontSize"
						truncate={false}
						type="number"
					/>
					<CombinedFormGroupInputSlider
						Component={UnitInput}
						label="Line Height"
						min={0}
						prop="lineHeight"
						step={0.5}
						truncate={false}
						type="number"
					/>
					<CombinedFormGroupInputSlider
						Component={UnitInput}
						label="Letter Spacing"
						min={-10}
						prop="letterSpacing"
						step={0.5}
						truncate={false}
						type="number"
					/>

					<CombinedFormGroupSwitchAlt
						label="Drop Cap"
						prop="dropCap"
					/>
				</ListGroup>
			</CardBody>
		</Card>
	);
};

const ExampleTwo = () => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>
						Typography
						<TypographyOptions
							addIcon={<FiPlus />}
							showActiveOnly
						/>
					</ListGroupHeader>
					<Grid>
						<CombinedFormGroup label="Family" prop="fontFamily" />
						<CombinedFormGroup
							Component={Select}
							label="Weight"
							prop="fontWeight"
						>
							<option value="Lighter">Light</option>
							<option value="Normal">Regular</option>
							<option value="Bold">Bold</option>
							<option value="Bolder">Bolder</option>
						</CombinedFormGroup>
						<CombinedFormGroup
							Component={PresetInput}
							label="Size"
							presets={presets}
							prop="fontSize"
						/>
						<CombinedFormGroup
							label="Spacing"
							prop="letterSpacing"
							type="number"
						/>
						<CombinedFormGroup
							label="Height"
							prop="lineHeight"
							type="number"
						/>
					</Grid>
					<CombinedFormGroupSwitch label="Drop Cap" prop="dropCap" />
				</ListGroup>
			</CardBody>
		</Card>
	);
};

const ExampleOne = () => {
	return (
		<Card>
			<CardBody>
				<ListGroup>
					<ListGroupHeader>
						Typography
						<TypographyOptions />
					</ListGroupHeader>
					<FontFamilyControl />
					<FontStyleControl />
				</ListGroup>
			</CardBody>
		</Card>
	);
};

const Wrapper = ({ children }) => {
	return (
		<>
			<StatsGraph />
			<Surface
				css={`
					position: fixed;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
				`}
				variant="dotted"
			/>
			<Container width={800}>
				<Grid
					css={`
						margin-top: 30vh;
					`}
					templateColumns="1fr 265px"
				>
					<View>
						<Card>
							<CardBody>
								<Preview />
							</CardBody>
						</Card>
					</View>
					<View>{children}</View>
				</Grid>
				);
			</Container>
		</>
	);
};

export const _options = () => {
	return (
		<Wrapper>
			<ContextSystemProvider value={{ FormGroup: { horizontal: false } }}>
				<ExampleOne />
			</ContextSystemProvider>
		</Wrapper>
	);
};

export const _plusMinus = () => {
	return (
		<Wrapper>
			<ContextSystemProvider value={{ FormGroup: { horizontal: false } }}>
				<ExampleTwo />
			</ContextSystemProvider>
		</Wrapper>
	);
};

const baseLineTheme = {
	controlBackgroundColor: 'transparent',
	controlBorderColor: ui.get('surfaceBorderColor'),
	controlBorderColorSubtle: 'transparent',
	controlBorderColorHover: ui.get('surfaceBorderColor'),
	sliderThumbBorderColor: 'transparent',
	sliderThumbBoxShadow: 'none',
	sliderThumbBackground: ui.get('colorAdmin'),
	switchBackdropBackground: 'transparent',
	switchBackdropBackgroundActive: ui.get('colorText'),
	switchBackdropBorderColor: ui.get('colorText'),
	switchToggleBackground: ui.get('colorText'),
	switchToggleBackgroundActive: ui.get('colorTextInverted'),
	switchToggleBoxShadow: 'none',
};

export const _baseLine = () => {
	React.useEffect(() => {
		typographyStore.setState({ fontSize: 13 });
	}, []);

	return (
		<ThemeProvider theme={baseLineTheme}>
			<Wrapper>
				<ContextSystemProvider
					value={{ FormGroup: { horizontal: true } }}
				>
					<ExampleThree />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};

export const _baseLineStepper = () => {
	React.useEffect(() => {
		typographyStore.setState({ fontSize: 13 });
	}, []);

	return (
		<ThemeProvider theme={baseLineTheme}>
			<Wrapper>
				<ContextSystemProvider
					value={{ FormGroup: { horizontal: true } }}
				>
					<ExampleFour />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};
