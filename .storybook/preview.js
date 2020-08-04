import React, { useState } from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@wp-g2/styles';
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
	TextField,
	Subheading,
	View,
} from '@wp-g2/components';
import { useLocalStorage } from '@wp-g2/utils';

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

function Themer() {
	const [themeConfig, setThemeConfig] = useLocalStorage(
		'themeConfig',
		defaultThemeConfig,
	);
	const [isDark, setIsDark] = useLocalStorage('darkMode', false);
	const [isHighContrast, setIsHighContast] = useLocalStorage(
		'highContrastMode',
		false,
	);

	const update = (key) => (value) => {
		setThemeConfig((prev) => ({ ...prev, [key]: value }));
	};

	const reset = () => {
		setThemeConfig((prev) => ({ ...prev, ...defaultThemeConfig }));
		setColorAdmin(defaultThemeConfig.colorAdmin);
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
		<>
			<ThemeProvider
				isDark={isDark}
				isHighContrast={isHighContrast}
				theme={theme}
			/>
			<Spacer css={{ padding: 8 }} mb={5}>
				<Card css={{ display: 'inline-flex' }}>
					<CardBody>
						<Flex justify="left" gap={4}>
							<Popover placement="bottom-start">
								<PopoverTrigger as={Button}>
									Customize Theme
								</PopoverTrigger>
								<PopoverContent
									maxWidth={240}
									hideOnClickOutside={false}
								>
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
												<TextField
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
												<TextField
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
												<TextField
													value={fontFamily}
													onChange={update(
														'fontFamily',
													)}
												/>
											</FormGroup>
											<FormGroup label="Size">
												<TextField
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
							<Flex>
								<ControlLabel>Dark Mode</ControlLabel>
								<Switch
									checked={!!isDark}
									onChange={(next) => {
										setIsDark(next);
									}}
								/>
							</Flex>
							<Flex>
								<ControlLabel>High Contrast</ControlLabel>
								<Switch
									checked={!!isHighContrast}
									onChange={(next) => {
										setIsHighContast(next);
									}}
								/>
							</Flex>
						</Flex>
					</CardBody>
				</Card>
			</Spacer>
		</>
	);
}

function StoryDecorator(storyFn) {
	return (
		<>
			<Themer />
			<View css={{ padding: 16 }}>{storyFn()}</View>
			<Surface
				isBackground
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
