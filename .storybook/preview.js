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

function Themer() {
	const [isDark, setIsDark] = useState(false);
	const [isHighContrast, setIsHighContast] = useState(false);
	const [colorAdmin, setColorAdmin] = useState('#3858E9');
	const [surfaceColor, setSurfaceColor] = useState('#ffffff');
	const [controlSurfaceColor, setControlSurfaceColor] = useState(null);
	const [colorText, setColorText] = useState(null);
	const [controlBorderRadius, setControlBorderRadius] = useState('4px');
	const [controlHeight, setControlHeight] = useState('30px');
	const [fontFamily, setFontFamily] = useState('');
	const [fontSize, setFontSize] = useState('13px');

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
													onChange={setColorAdmin}
												/>
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Text
												</ControlLabel>
												<ColorInput
													value={colorText}
													fallback="#000000"
													onChange={setColorText}
												/>
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Surface
												</ControlLabel>
												<ColorInput
													value={surfaceColor}
													onChange={setSurfaceColor}
												/>
											</ControlGroup>
											<ControlGroup>
												<ControlLabel>
													Control Surface
												</ControlLabel>
												<ColorInput
													value={controlSurfaceColor}
													fallback="#ffffff"
													onChange={
														setControlSurfaceColor
													}
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
														setControlBorderRadius(
															`${value}px`,
														)
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
														setControlHeight(
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
													onChange={setFontFamily}
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
														setFontSize(
															`${value}px`,
														)
													}
												/>
											</ControlGroup>
										</Spacer>
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
