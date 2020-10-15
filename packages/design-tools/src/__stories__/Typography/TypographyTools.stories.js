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
	Select,
	Surface,
	TextInput,
	UnitInput,
	View,
	VStack,
} from '@wp-g2/components';
import { ContextSystemProvider } from '@wp-g2/context';
import { FiMinus, FiMoreHorizontal, FiPlus } from '@wp-g2/icons';
import { shallowCompare } from '@wp-g2/substate';
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
					const isSelected = !!settings[key];

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
	({ Component = TextInput, label, prop, ...otherProps }) => {
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

		if (!value) return null;

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
							Component={UnitInput}
							label="Size"
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
			<ContextSystemProvider value={{ FormGroup: { horizontal: false } }}>
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
			</ContextSystemProvider>
		</>
	);
};

export const _options = () => {
	return (
		<Wrapper>
			<ExampleOne />
		</Wrapper>
	);
};

export const _plusMinus = () => {
	return (
		<Wrapper>
			<ExampleTwo />
		</Wrapper>
	);
};
