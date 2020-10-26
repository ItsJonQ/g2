import {
	Card,
	CardBody,
	Grid,
	Heading,
	HStack,
	ListGroup,
	ListGroupHeader,
	ListGroups,
	Panel,
	PanelBody,
	PanelHeader,
	Select,
	Text,
	UnitInput,
	View,
} from '@wp-g2/components';
import { ContextSystemProvider } from '@wp-g2/context';
import { FiMoreHorizontal, FiPlus } from '@wp-g2/icons';
import { createTheme, ThemeProvider, ui } from '@wp-g2/styles';
import React from 'react';

import { Wrapper } from './components';
import {
	ColorPanel,
	ColorPanelContent,
	CombinedFormGroup,
	CombinedFormGroupInputSlider,
	CombinedFormGroupInputStepper,
	CombinedFormGroupSwitch,
	CombinedFormGroupSwitchAlt,
	CombinedFormGroupSwitchLeft,
	DimensionsOptions,
	DimensionsPanel,
	DimensionsPanelContent,
	FontFamilyControl,
	FontStyleControl,
	PanelOverlay,
	PresetControl,
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
						step={0.1}
						truncate={false}
						type="number"
					/>
					<CombinedFormGroupInputSlider
						Component={UnitInput}
						label="Letter Spacing"
						min={-10}
						prop="letterSpacing"
						step={0.1}
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
						step={0.1}
						truncate={false}
						type="number"
					/>
					<CombinedFormGroupInputStepper
						Component={UnitInput}
						label="Letter Spacing"
						min={-10}
						prop="letterSpacing"
						step={0.1}
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
							format="text"
							label="Font"
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
							Component={UnitInput}
							cssProp="fontSize"
							label="Size"
							min={0}
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
							step={0.1}
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
							step={0.1}
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
							format="text"
							label="Font"
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
							Component={UnitInput}
							cssProp="fontSize"
							label="Size"
							min={0}
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
							step={0.1}
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
							step={0.1}
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

const ExampleSeven = () => {
	return (
		<Card>
			<PanelOverlay />
			<CardBody>
				<ListGroups>
					<ListGroup>
						<ListGroupHeader>
							Typography
							<TypographyOptions
								addIcon={<FiMoreHorizontal />}
								exclude={['dropCap']}
								showActiveOnly
							/>
						</ListGroupHeader>
						<PresetControl />
						<CombinedFormGroup
							format="text"
							label="Font"
							prop="fontFamily"
							showRemove={false}
						/>
						<Grid>
							<CombinedFormGroup
								Component={UnitInput}
								cssProp="fontSize"
								label="Size"
								min={0}
								prop="fontSize"
								showRemove={false}
								truncate={false}
							/>
							<CombinedFormGroup
								Component={Select}
								label="Appearance"
								prop="fontWeight"
								showRemove={false}
							>
								<option value="Lighter">Light</option>
								<option value="Normal">Regular</option>
								<option value="Bold">Bold</option>
								<option value="Bolder">Bolder</option>
							</CombinedFormGroup>
							<CombinedFormGroupInputStepper
								cssProp="lineHeight"
								label="Line Height"
								min={0}
								prop="lineHeight"
								showRemove={false}
								step={0.1}
								truncate={false}
								type="number"
							/>
							<CombinedFormGroup
								Component={UnitInput}
								cssProp="letterSpacing"
								label="Letter Spacing"
								min={-10}
								prop="letterSpacing"
								showRemove={false}
								step={0.1}
								truncate={false}
								type="number"
							/>
						</Grid>
					</ListGroup>
					<ColorPanel />
					<DimensionsPanel />
				</ListGroups>
			</CardBody>
		</Card>
	);
};

const ExampleEight = () => {
	return (
		<Card>
			<CardBody>
				<ListGroups>
					<ListGroup>
						<ListGroupHeader>
							Typography
							<TypographyOptions
								addIcon={<FiMoreHorizontal />}
								exclude={['dropCap']}
								showActiveOnly
							/>
						</ListGroupHeader>
						<PresetControl />
						<CombinedFormGroup
							format="text"
							label="Font"
							prop="fontFamily"
							showRemove={false}
						/>
						<Grid>
							<CombinedFormGroup
								Component={UnitInput}
								cssProp="fontSize"
								label="Size"
								min={0}
								prop="fontSize"
								showRemove={false}
								truncate={false}
							/>
							<CombinedFormGroup
								Component={Select}
								label="Appearance"
								prop="fontWeight"
								showRemove={false}
							>
								<option value="Lighter">Light</option>
								<option value="Normal">Regular</option>
								<option value="Bold">Bold</option>
								<option value="Bolder">Bolder</option>
							</CombinedFormGroup>
							<CombinedFormGroupInputStepper
								cssProp="lineHeight"
								label="Line Height"
								min={0}
								prop="lineHeight"
								showRemove={false}
								step={0.1}
								truncate={false}
								type="number"
							/>
							<CombinedFormGroup
								Component={UnitInput}
								cssProp="letterSpacing"
								label="Letter Spacing"
								min={-10}
								prop="letterSpacing"
								showRemove={false}
								step={0.1}
								truncate={false}
								type="number"
							/>
						</Grid>
					</ListGroup>
					<ColorPanel selectUI />
					<DimensionsPanel />
				</ListGroups>
			</CardBody>
		</Card>
	);
};

const ExampleNine = () => {
	return (
		<Card>
			<CardBody
				css={`
					padding: 0;
				`}
			>
				<Panel visible>
					<PanelHeader>
						<HStack>
							<Heading size={5}>Typography</Heading>
							<View
								css={`
									margin: -8px 0;
								`}
							>
								<TypographyOptions
									addIcon={<FiMoreHorizontal />}
									exclude={['dropCap']}
									showActiveOnly
								/>
							</View>
						</HStack>
					</PanelHeader>
					<PanelBody
						css={`
							padding-top: 0;
						`}
					>
						<PresetControl />
						<CombinedFormGroup
							format="text"
							label="Font"
							prop="fontFamily"
							showRemove={false}
						/>
						<Grid>
							<CombinedFormGroup
								Component={UnitInput}
								cssProp="fontSize"
								label="Size"
								min={0}
								prop="fontSize"
								showRemove={false}
								truncate={false}
							/>
							<CombinedFormGroup
								Component={Select}
								label="Appearance"
								prop="fontWeight"
								showRemove={false}
							>
								<option value="Lighter">Light</option>
								<option value="Normal">Regular</option>
								<option value="Bold">Bold</option>
								<option value="Bolder">Bolder</option>
							</CombinedFormGroup>
							<CombinedFormGroupInputStepper
								cssProp="lineHeight"
								label="Line Height"
								min={0}
								prop="lineHeight"
								showRemove={false}
								step={0.1}
								truncate={false}
								type="number"
							/>
							<CombinedFormGroup
								Component={UnitInput}
								cssProp="letterSpacing"
								label="Letter Spacing"
								min={-10}
								prop="letterSpacing"
								showRemove={false}
								step={0.1}
								truncate={false}
								type="number"
							/>
						</Grid>
					</PanelBody>
				</Panel>
				<Panel>
					<PanelHeader>
						<Heading size={5}>Color</Heading>
					</PanelHeader>
					<PanelBody
						css={`
							padding-top: 0;
						`}
					>
						<ColorPanelContent selectUI />
					</PanelBody>
				</Panel>
				<Panel>
					<PanelHeader>
						<HStack>
							<Heading size={5}>Dimensions</Heading>
							<View
								css={`
									margin: -8px 0;
								`}
							>
								<DimensionsOptions />
							</View>
						</HStack>
					</PanelHeader>
					<PanelBody
						css={`
							padding-top: 0;
						`}
					>
						<DimensionsPanelContent />
					</PanelBody>
				</Panel>
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
	sliderThumbBackgroundColor: ui.get('colorAdmin'),
	switchBackdropBackgroundColor: 'transparent',
	switchBackdropBackgroundColorActive: ui.get('colorText'),
	switchBackdropBorderColor: ui.get('colorText'),
	switchToggleBackgroundColor: ui.get('colorText'),
	switchToggleBackgroundColorActive: ui.get('colorTextInverted'),
	switchToggleBoxShadow: 'none',
};

const baseLineThemeNext = createTheme(() => ({
	cardBorderRadius: '4px',
	controlBackgroundColor: 'transparent',
	controlBorderColor: ui.get('colorText'),
	controlBorderColorSubtle: 'transparent',
	controlBorderColorHover: ui.get('colorText'),
	controlHeight: '40px',
	controlBorderRadius: '2px',
	sliderThumbBorderColor: 'transparent',
	sliderThumbBoxShadow: 'none',
	sliderThumbBackgroundColor: ui.get('colorAdmin'),
	switchBackdropBackgroundColor: 'transparent',
	switchBackdropBackgroundColorActive: ui.get('colorText'),
	switchBackdropBorderColor: ui.get('colorText'),
	switchToggleBackgroundColor: ui.get('colorText'),
	switchToggleBackgroundColorActive: ui.get('colorTextInverted'),
	switchToggleBoxShadow: 'none',
}));

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

export const _ellipsisWithColor = () => {
	return (
		<ThemeProvider theme={baseLineTheme}>
			<Wrapper>
				<ContextSystemProvider
					value={{
						ListGroups: { spacing: 8 },
						FormGroup: { horizontal: false },
					}}
				>
					<ExampleSeven truncate />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};

export const _ellipsisWithColorAltTheme = () => {
	return (
		<ThemeProvider isGlobal theme={baseLineThemeNext}>
			<Wrapper>
				<ContextSystemProvider
					value={{
						ListGroups: { spacing: 8 },
						FormGroup: { horizontal: false },
					}}
				>
					<ExampleSeven truncate />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};

export const _altThemeWithPaletteDropdown = () => {
	return (
		<ThemeProvider isGlobal theme={baseLineThemeNext}>
			<Wrapper>
				<ContextSystemProvider
					value={{
						ListGroups: { spacing: 8 },
						FormGroup: { horizontal: false },
					}}
				>
					<ExampleEight truncate />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};

export const _altThemeWithPanels = () => {
	return (
		<ThemeProvider isGlobal theme={baseLineThemeNext}>
			<Wrapper>
				<ContextSystemProvider
					value={{
						ListGroups: { spacing: 8 },
						FormGroup: { horizontal: false },
					}}
				>
					<ExampleNine truncate />
				</ContextSystemProvider>
			</Wrapper>
		</ThemeProvider>
	);
};
