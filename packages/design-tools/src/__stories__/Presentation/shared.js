import {
	Button,
	ButtonGroup,
	Card,
	Container,
	ControlLabel,
	Dropdown,
	DropdownMenu,
	DropdownMenuHeader,
	DropdownMenuItem,
	DropdownTrigger,
	FormGroup,
	Grid,
	Heading,
	HStack,
	Select,
	Separator,
	Slider,
	Spacer,
	Surface,
	Text,
	TextInput,
} from '@wp-g2/components';
import { FiMoreHorizontal } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import { createStore, shallowCompare } from '@wp-g2/substate';
import { is } from '@wp-g2/utils';
import React from 'react';

export const Wrapper = ({ children, title }) => {
	return (
		<>
			<Surface
				css={[
					ui.position.full,
					ui.position.fixed,
					ui.zIndex(0),
					{ pointerEvents: 'none' },
				]}
				variant="secondary"
			/>
			<Container
				css={[ui.position.relative, ui.zIndex(1), ui.margin.top('5vh')]}
			>
				<Spacer mb={6}>
					<Heading>{title}</Heading>
				</Spacer>
				{children}
			</Container>
		</>
	);
};

export const PanelWrapper = ({ children, title }) => {
	return (
		<Wrapper title={title}>
			<Container width={310}>
				<Card>{children}</Card>
			</Container>
		</Wrapper>
	);
};

export const createStateFromOptions = (options) => {
	return Object.entries(options).reduce((state, [k, v]) => {
		return { ...state, [k]: v.value };
	}, {});
};

export const typographyOptionKeys = {
	fontFamily: {
		label: 'Font',
		value: 'System',
	},
	fontSize: {
		label: 'Size',
		value: '13px',
	},
	fontWeight: {
		label: 'Appearance',
		value: 'Normal',
	},
	lineHeight: {
		label: 'Line height',
		value: '1.5',
	},
	letterSpacing: {
		label: 'Letter spacing',
		value: '1',
	},
	letterCase: {
		label: 'Letter case',
		value: '',
	},
};

export const typographyPresets = [
	{
		label: 'Small',
		value: 'small',
		settings: {
			fontWeight: 'Bold',
			fontSize: '11px',
			letterSpacing: '1',
		},
	},
	{
		label: 'Medium',
		value: 'medium',
		settings: {
			fontWeight: 'Regular',
			fontSize: '16px',
			lineHeight: '1.6',
			letterSpacing: '0',
		},
	},
	{
		label: 'Large',
		value: 'large',
		settings: {
			fontWeight: 'Bold',
			fontSize: '32px',
			lineHeight: '1.2',
			letterSpacing: '-1',
		},
	},
];

const typographyState = createStateFromOptions(typographyOptionKeys);
const initialState = { ...typographyState };

export const typographyStore = createStore((set) => ({
	// State
	...initialState,
	presets: typographyPresets,
	currentPreset: 'custom',
	hasCustomValues: true,

	// Actions
	set: (next) => set({ ...next, hasCustomValues: true }),
	reset: (prop) => set({ [prop]: initialState[prop] }),
	resetAll: () => set({ ...typographyState }),
	applyPreset: (next) => {
		const preset = typographyStore.getState().findPreset(next);
		if (!preset) return;

		const nextState = {
			...preset.settings,
			currentPreset: preset.value,
			hasCustomValues: false,
		};

		set(nextState);
	},

	// Selectors
	getCurrentPreset: () => {
		const { currentPreset, hasCustomValues } = typographyStore.getState();

		return hasCustomValues ? 'custom' : currentPreset;
	},
	findPreset: (value) => {
		const preset = typographyStore
			.getState()
			.presets.find((item) => item.value === value);

		return preset;
	},
}));

export const useTypography = typographyStore;

export const TypographyOptions = React.memo(
	({ addIcon = <FiMoreHorizontal />, exclude = [] }) => {
		const { setState, ...settings } = useTypography();

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
					onClick={(e) => e.stopPropagation()}
					size="xSmall"
				/>
				<DropdownMenu
					maxWidth={160}
					minWidth={160}
					onClick={(e) => e.stopPropagation()}
				>
					<DropdownMenuHeader>Display options</DropdownMenuHeader>
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
					<Separator m={2} />
					<DropdownMenuItem
						closeOnClick
						isSelected={false}
						onClick={typographyStore.getState().resetAll}
					>
						Reset All
					</DropdownMenuItem>
				</DropdownMenu>
			</Dropdown>
		);
	},
);

export const CombinedFormGroup = React.memo(
	({ Component = TextInput, label, prop, ...otherProps }) => {
		const [value] = useTypography((state) => [state[prop]], shallowCompare);

		const handleOnChange = React.useCallback(
			(value) => {
				typographyStore.getState().set({ [prop]: value });
			},
			[prop],
		);

		if (!is.defined(value)) return null;

		return (
			<FormGroup>
				<HStack>
					<ControlLabel>{label}</ControlLabel>
				</HStack>
				<HStack>
					<Component
						onChange={handleOnChange}
						value={value}
						{...otherProps}
					/>
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
		...otherProps
	}) => {
		const value = useTypography((state) => state[prop], shallowCompare);

		const handleOnChange = React.useCallback(
			(next) => {
				typographyStore.setState(() => {
					return { [prop]: next, hasCustomValues: true };
				});
			},
			[prop],
		);

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
						value={value}
					/>
				</Grid>
			</FormGroup>
		);
	},
);

export const CombinedFormGroupButtonGroup = React.memo(
	({ Component = TextInput, label, prop, options = [], ...otherProps }) => {
		const [value] = useTypography((state) => [state[prop]], shallowCompare);

		const handleOnChange = React.useCallback(
			(value) => {
				const nextValue = value || '';
				typographyStore.getState().set({ [prop]: nextValue });
			},
			[prop],
		);

		if (!is.defined(value)) return null;

		return (
			<FormGroup>
				<HStack>
					<ControlLabel>{label}</ControlLabel>
				</HStack>
				<HStack>
					<ButtonGroup
						enableSelectNone
						onChange={handleOnChange}
						value={value}
					>
						{options.map((option) => (
							<Button
								key={option.value}
								{...option}
								iconSize={20}
							/>
						))}
					</ButtonGroup>
				</HStack>
			</FormGroup>
		);
	},
);

export const PresetControl = React.memo(({ label = 'Style' }) => {
	const [value, presets, applyPresets] = typographyStore(
		(state) => [state.getCurrentPreset(), state.presets, state.applyPreset],
		shallowCompare,
	);
	const isCustom = value === 'custom';

	return (
		<FormGroup>
			<HStack>
				<ControlLabel>{label}</ControlLabel>
				<Text variant="muted">Template (Sidebar)</Text>
			</HStack>
			<Select onChange={applyPresets} value={value}>
				{presets.map((preset) => (
					<option key={preset.value} {...preset} />
				))}
				{isCustom && <option label="Custom" value="custom" />}
			</Select>
		</FormGroup>
	);
});
