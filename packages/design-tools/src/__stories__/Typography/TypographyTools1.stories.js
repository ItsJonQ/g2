import {
	Card,
	CardBody,
	Container,
	Dropdown,
	DropdownMenu,
	DropdownMenuItem,
	DropdownTrigger,
	FormGroup,
	Grid,
	ListGroup,
	ListGroupHeader,
	Select,
	Surface,
	TextInput,
	UnitInput,
	View,
} from '@wp-g2/components';
import { ContextSystemProvider } from '@wp-g2/context';
import { FiMoreHorizontal } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import { createStore, shallowCompare } from '@wp-g2/substate';
import React from 'react';

export default {
	title: 'DesignTools/TypographyTools',
};

const typographyStore = createStore((set) => ({
	fontFamily: 'Inter',
	fontWeight: 'Normal',
	fontSize: '13px',
	lineHeight: '1.5',
	letterSpacing: '1',
	setState: (next) => set(next),
}));
const useTypography = typographyStore;

const typographyOptionKeys = {
	fontSize: {
		label: 'Font Size',
		value: '13px',
	},
	fontFamily: {
		label: 'Font Family',
		value: 'Inter',
	},
	fontWeight: {
		label: 'Font Weight',
		value: 'Normal',
	},
	lineHeight: {
		label: 'Line Height',
		value: '1.5',
	},
	letterSpacing: {
		label: 'Letter Spacing',
		value: '1',
	},
};
const TypographyOptions = React.memo(() => {
	const { setState, ...settings } = useTypography();
	const optionsEntries = Object.entries(typographyOptionKeys);

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
				icon={<FiMoreHorizontal />}
				isControl
				isSubtle
			/>
			<DropdownMenu maxWidth={160} minWidth={120}>
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

const Preview = React.memo(() => {
	const {
		fontFamily,
		fontSize,
		fontWeight,
		letterSpacing,
		lineHeight,
	} = useTypography();

	return (
		<ListGroup>
			<ListGroupHeader>Preview</ListGroupHeader>
			<View css={{ padding: ui.space(5) }}>
				<div
					style={{
						fontSize: ui.value.px(fontSize),
						fontFamily,
						fontWeight,
						letterSpacing: ui.value.px(letterSpacing),
						lineHeight,
					}}
				>
					Gutenberg
				</div>
			</View>
		</ListGroup>
	);
});

const Example = () => {
	return (
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
			<View>
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
			</View>
		</Grid>
	);
};

export const _one = () => {
	return (
		<>
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
					<Example />
				</Container>
			</ContextSystemProvider>
		</>
	);
};
