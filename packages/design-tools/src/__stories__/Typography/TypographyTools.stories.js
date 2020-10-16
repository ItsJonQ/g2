import {
	Card,
	CardBody,
	Grid,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	PresetInput,
	Select,
	UnitInput,
} from '@wp-g2/components';
import { ContextSystemProvider } from '@wp-g2/context';
import { FiMoreHorizontal, FiPlus } from '@wp-g2/icons';
import { ThemeProvider, ui } from '@wp-g2/styles';
import React from 'react';

import { fontFamilyPresets, presets, Wrapper } from './components';
import {
	CombinedFormGroup,
	CombinedFormGroupInputSlider,
	CombinedFormGroupInputStepper,
	CombinedFormGroupSwitch,
	CombinedFormGroupSwitchAlt,
	CombinedFormGroupSwitchLeft,
	DimensionsPanel,
	FontFamilyControl,
	FontStyleControl,
	TypographyOptions,
} from './controls';

export default {
	title: 'DesignTools/TypographyTools',
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

const ExampleFive = ({ truncate = false }) => {
	return (
		<Card>
			<CardBody>
				<ListGroups>
					<ListGroup>
						<ListGroupHeader>
							Typography
							<TypographyOptions
								addIcon={<FiPlus />}
								showActiveOnly
							/>
						</ListGroupHeader>
						<CombinedFormGroup
							Component={PresetInput}
							format="text"
							label="Font"
							presets={fontFamilyPresets}
							prop="fontFamily"
							showRemove={false}
							showRemoveRight
						/>
						<CombinedFormGroup
							Component={Select}
							label="Weight"
							prop="fontWeight"
							showRemove={false}
							showRemoveRight
						>
							<option value="Lighter">Light</option>
							<option value="Normal">Regular</option>
							<option value="Bold">Bold</option>
							<option value="Bolder">Bolder</option>
						</CombinedFormGroup>
						<CombinedFormGroup
							Component={PresetInput}
							cssProp="fontSize"
							label="Size"
							min={0}
							presets={presets}
							prop="fontSize"
							showRemove={false}
							showRemoveRight
							truncate={truncate}
						/>
						<CombinedFormGroupInputSlider
							Component={UnitInput}
							cssProp="lineHeight"
							label="Line Height"
							min={0}
							prop="lineHeight"
							showRemove={false}
							showRemoveRight
							step={0.5}
							truncate={truncate}
							type="number"
						/>
						<CombinedFormGroupInputStepper
							Component={UnitInput}
							cssProp="letterSpacing"
							label="Letter Spacing"
							min={-10}
							prop="letterSpacing"
							showRemove={false}
							showRemoveRight
							step={0.5}
							truncate={truncate}
							type="number"
						/>
						<CombinedFormGroupSwitchLeft
							label="Drop Cap"
							prop="dropCap"
							showRemove={false}
							showRemoveRight
						/>
					</ListGroup>
					<DimensionsPanel />
				</ListGroups>
			</CardBody>
		</Card>
	);
};

const ExampleSix = () => {
	return (
		<Card>
			<CardBody>
				<ListGroups>
					<ListGroup>
						<ListGroupHeader>
							Typography
							<TypographyOptions
								addIcon={<FiPlus />}
								showActiveOnly
							/>
						</ListGroupHeader>
						<CombinedFormGroup
							Component={PresetInput}
							format="text"
							label="Font"
							presets={fontFamilyPresets}
							prop="fontFamily"
							showRemove={false}
							showResetRight
						/>
						<CombinedFormGroup
							Component={Select}
							label="Weight"
							prop="fontWeight"
							showRemove={false}
							showResetRight
						>
							<option value="Lighter">Light</option>
							<option value="Normal">Regular</option>
							<option value="Bold">Bold</option>
							<option value="Bolder">Bolder</option>
						</CombinedFormGroup>
						<CombinedFormGroup
							Component={PresetInput}
							cssProp="fontSize"
							label="Size"
							min={0}
							presets={presets}
							prop="fontSize"
							showRemove={false}
							showResetRight
							truncate={false}
						/>
						<CombinedFormGroupInputSlider
							Component={UnitInput}
							cssProp="lineHeight"
							label="Line Height"
							min={0}
							prop="lineHeight"
							showRemove={false}
							showResetRight
							step={0.5}
							truncate={false}
							type="number"
						/>
						<CombinedFormGroupInputStepper
							Component={UnitInput}
							cssProp="letterSpacing"
							label="Letter Spacing"
							min={-10}
							prop="letterSpacing"
							showRemove={false}
							showResetRight
							step={0.5}
							truncate={false}
							type="number"
						/>
						<CombinedFormGroupSwitchLeft
							label="Drop Cap"
							prop="dropCap"
							showRemove={false}
							showResetRight
						/>
					</ListGroup>
					<DimensionsPanel />
				</ListGroups>
			</CardBody>
		</Card>
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

export const _plusMinusInline = () => {
	return (
		<ThemeProvider theme={baseLineTheme}>
			<Wrapper>
				<ContextSystemProvider
					value={{
						ListGroups: { spacing: 8 },
						FormGroup: { horizontal: true },
					}}
				>
					<ExampleFive />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};

export const _plusResetInput = () => {
	return (
		<ThemeProvider theme={baseLineTheme}>
			<Wrapper>
				<ContextSystemProvider
					value={{
						ListGroups: { spacing: 8 },
						FormGroup: { horizontal: true },
					}}
				>
					<ExampleSix />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};

export const _plusMinusInlineTruncate = () => {
	return (
		<ThemeProvider theme={baseLineTheme}>
			<Wrapper>
				<ContextSystemProvider
					value={{
						ListGroups: { spacing: 8 },
						FormGroup: { horizontal: true },
					}}
				>
					<ExampleFive truncate />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};
