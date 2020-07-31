import React, { useState } from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '@wp-g2/styles';
import {
	Button,
	ControlLabel,
	Flex,
	SegmentedControl,
	Spacer,
	Surface,
	Switch,
} from '@wp-g2/components';

function StoryDecorator(storyFn) {
	const [isDark, setIsDark] = useState(false);
	const [isHighContrast, setIsHighContast] = useState(false);

	const controlBorderColor = isHighContrast
		? isDark
			? '#ddd'
			: '#444'
		: null;

	const colorDivider = isHighContrast ? (isDark ? '#ddd' : '#444') : null;

	const theme = {
		controlBorderColor,
		colorDivider,
	};

	return (
		<ThemeProvider isDark={isDark} theme={theme}>
			<Spacer css={{ padding: 8 }}>
				<Flex justify="left" gap={12}>
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
			</Spacer>
			{storyFn()}
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
		</ThemeProvider>
	);
}

addDecorator(StoryDecorator);
