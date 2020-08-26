import React from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider, ui } from '@wp-g2/styles';
import {
	Button,
	Card,
	CardBody,
	Separator,
	ControlLabel,
	FormGroup as BaseFormGroup,
	Flex,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Spacer,
	Surface,
	Switch,
	TextInput,
	Subheading,
	ComponentInspector,
	View,
} from '@wp-g2/components';
import { Hint } from '@wp-g2/hint';
import { useLocalState } from '@wp-g2/utils';

const __EXPERIMENTAL_SHOW_HINT = true;

const FormGroup = ({ children, ...props }) => {
	return (
		<BaseFormGroup templateColumns="1fr 1fr" {...props}>
			{children}
		</BaseFormGroup>
	);
};

const ColorInput = ({ value, onChange, fallback = '' }) => {
	return (
		<input
			type="color"
			value={value || fallback}
			onChange={(e) => onChange(e.target.value)}
			style={{ marginLeft: 'auto' }}
		/>
	);
};

const defaultThemeConfig = {
	colorAdmin: '#3858E9',
	surfaceColor: '#ffffff',
	controlSurfaceColor: null,
	colorText: null,
	controlBorderRadius: '4px',
	controlHeight: '30px',
	fontFamily: '',
	fontSize: '13px',
};

function Themer({ inspector, setInspector }) {
	const [themeConfig, setThemeConfig] = useLocalState(
		'themeConfig',
		defaultThemeConfig,
	);

	const [isDark, setIsDark] = useLocalState('darkMode', false);
	const [isHighContrast, setIsHighContast] = useLocalState(
		'highContrastMode',
		false,
	);
	const [isColorBlind, setIsColorBlind] = useLocalState(
		'colorBlindMode',
		false,
	);
	const [isReducedMotion, setIsReducedMotion] = useLocalState(
		'reducedMotionMode',
		false,
	);

	const update = (key) => (value) => {
		setThemeConfig((prev) => ({ ...prev, [key]: value }));
	};

	const reset = () => {
		setThemeConfig((prev) => ({ ...prev, ...defaultThemeConfig }));
	};

	const {
		colorAdmin,
		surfaceColor,
		controlSurfaceColor,
		colorText,
		controlBorderRadius,
		controlHeight,
		fontFamily,
		fontSize,
	} = themeConfig;

	const theme = {
		colorAdmin,
		colorText,
		controlBorderRadius,
		controlHeight,
		surfaceColor: !isDark ? surfaceColor : null,
		controlSurfaceColor,
		fontFamily,
		fontSize,
	};

	return (
		<View
			css={[
				{
					position: 'fixed',
					left: '50%',
					bottom: 8,
					zIndex: 10,
				},
				ui.offset.x('-50%'),
			]}
		>
			<ThemeProvider
				isDark={isDark}
				isGlobal
				isHighContrast={isHighContrast}
				isColorBlind={isColorBlind}
				isReducedMotion={isReducedMotion}
				theme={theme}
			/>
			<View css={{ padding: 8 }}>
				<Card css={{ display: 'inline-flex' }}>
					<CardBody css={{ padding: 4 }}>
						<Flex justify="left" gap={2}>
							<Popover placement="top-start">
								<PopoverTrigger as={Button} variant="primary">
									Customize Theme
								</PopoverTrigger>
								<PopoverContent maxWidth={240}>
									<CardBody>
										<Subheading>Colors</Subheading>
										<Separator />
										<Spacer mb={4}>
											<FormGroup label="Admin">
												<ColorInput
													value={colorAdmin}
													onChange={update(
														'colorAdmin',
													)}
												/>
											</FormGroup>
											<FormGroup label="Text">
												<ColorInput
													value={colorText}
													fallback="#000000"
													onChange={update(
														'colorText',
													)}
												/>
											</FormGroup>
											<FormGroup label="Surface">
												<ColorInput
													value={surfaceColor}
													onChange={update(
														'surfaceColor',
													)}
												/>
											</FormGroup>
											<FormGroup label="Control Surface">
												<ColorInput
													value={controlSurfaceColor}
													fallback="#ffffff"
													onChange={update(
														'controlSurfaceColor',
													)}
												/>
											</FormGroup>
										</Spacer>
										<Spacer mb={4}>
											<Subheading>Controls</Subheading>
											<Separator />
											<FormGroup label="Border Radius">
												<TextInput
													type="number"
													value={parseInt(
														controlBorderRadius,
														10,
													)}
													onChange={(value) =>
														update(
															'controlBorderRadius',
														)(`${value}px`)
													}
												/>
											</FormGroup>
											<FormGroup label="Height">
												<TextInput
													type="number"
													value={parseInt(
														controlHeight,
														10,
													)}
													onChange={(value) =>
														update('controlHeight')(
															`${value}px`,
														)
													}
												/>
											</FormGroup>
										</Spacer>
										<Spacer mb={4}>
											<Subheading>Font</Subheading>
											<Separator />
											<FormGroup label="Family">
												<TextInput
													value={fontFamily}
													onChange={update(
														'fontFamily',
													)}
												/>
											</FormGroup>
											<FormGroup label="Size">
												<TextInput
													type="number"
													value={parseInt(
														fontSize,
														10,
													)}
													onChange={(value) =>
														update('fontSize')(
															`${value}px`,
														)
													}
												/>
											</FormGroup>
										</Spacer>
										<Separator />
										<Button
											isBlock
											onClick={reset}
											variant="tertiary"
										>
											Reset
										</Button>
									</CardBody>
								</PopoverContent>
							</Popover>
							<Popover placement="top-start">
								<PopoverTrigger as={Button} variant="tertiary">
									Configure
								</PopoverTrigger>
								<PopoverContent
									maxWidth={200}
									hideOnClickOutside={false}
								>
									<CardBody>
										<FormGroup>
											<ControlLabel>
												Dark Mode
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isDark}
													onChange={(next) => {
														setIsDark(next);
													}}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												High Contrast
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isHighContrast}
													onChange={(next) => {
														setIsHighContast(next);
													}}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Color Blind
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isColorBlind}
													onChange={(next) => {
														setIsColorBlind(next);
													}}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Reduced Motion
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!isReducedMotion}
													onChange={(next) => {
														setIsReducedMotion(
															next,
														);
													}}
												/>
											</Flex>
										</FormGroup>
										<FormGroup>
											<ControlLabel>
												Inspector
											</ControlLabel>
											<Flex justify="flex-end">
												<Switch
													checked={!!inspector}
													onChange={(next) => {
														setInspector(next);
													}}
												/>
											</Flex>
										</FormGroup>
									</CardBody>
								</PopoverContent>
							</Popover>
						</Flex>
					</CardBody>
				</Card>
			</View>
		</View>
	);
}

function StoryDecorator(storyFn) {
	const [inspector, setInspector] = useLocalState('inspector', false);

	return (
		<>
			<Themer inspector={inspector} setInspector={setInspector} />
			<View css={{ padding: 16 }}>
				<ComponentInspector visible={inspector}>
					{storyFn()}
				</ComponentInspector>
			</View>
			{__EXPERIMENTAL_SHOW_HINT && <Hint />}
			<Surface
				variant="tertiary"
				css={{
					position: 'fixed',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: -1,
				}}
			/>
		</>
	);
}

addDecorator(StoryDecorator);
