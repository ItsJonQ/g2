import React, { useState } from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@wp-g2/styles';
import {
	Button,
	Card,
	CardBody,
	Separator,
	ControlLabel,
	Flex,
	Grid,
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

const ControlGroup = ({ children, ...props }) => {
	return (
		<Spacer>
			<Grid templateColumns="1fr 1fr" {...props}>
				{children}
			</Grid>
		</Spacer>
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
	const [isDark, setIsDark] = useState(false);
	const [isHighContrast, setIsHighContast] = useState(false);
	const [themeConfig, setThemeConfig] = useState(defaultThemeConfig);

	const update = (key) => (value) => {
		setThemeConfig({ ...themeConfig, [key]: value });
	};

	const reset = () => {
		setThemeConfig(defaultThemeConfig);
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

	const controlBorderColor = isHighContrast
		? isDark
			? '#ddd'
			: '#444'
		: null;

	const theme = {
		colorAdmin,
		colorText,
		controlBorderRadius,
		controlBorderColor,
		controlHeight,
		surfaceColor: !isDark ? surfaceColor : null,
		controlSurfaceColor,
		fontFamily,
		fontSize,
		colorDivider: controlBorderColor,
		surfaceBorderColor: controlBorderColor,
	};

	return (
		<>
			<ThemeProvider isDark={isDark} theme={theme} />
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
											<ControlGroup>
												<ControlLabel>
													Admin
												</ControlLabel>
												<ColorInput
													value={colorAdmin}
													onChange={update(
														'colorAdmin',
													)}
												/>
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Text
												</ControlLabel>
												<ColorInput
													value={colorText}
													fallback="#000000"
													onChange={update(
														'colorText',
													)}
												/>
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Surface
												</ControlLabel>
												<ColorInput
													value={surfaceColor}
													onChange={update(
														'surfaceColor',
													)}
												/>
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Control Surface
												</ControlLabel>
												<ColorInput
													value={controlSurfaceColor}
													fallback="#ffffff"
													onChange={update(
														'controlSurfaceColor',
													)}
												/>
											</ControlGroup>
										</Spacer>
										<Spacer mb={4}>
											<Subheading>Controls</Subheading>
											<Separator />
											<ControlGroup>
												<ControlLabel>
													Border Radius
												</ControlLabel>
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
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Height
												</ControlLabel>
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
											</ControlGroup>
										</Spacer>
										<Spacer mb={4}>
											<Subheading>Font</Subheading>
											<Separator />
											<ControlGroup>
												<ControlLabel>
													Family
												</ControlLabel>
												<TextField
													value={fontFamily}
													onChange={update(
														'fontFamily',
													)}
												/>
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Size
												</ControlLabel>
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
											</ControlGroup>
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
									value={isDark}
									onChange={(next) => {
										setIsDark(next);
									}}
								/>
							</Flex>
							<Flex>
								<ControlLabel>High Contrast</ControlLabel>
								<Switch
									value={isHighContrast}
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
