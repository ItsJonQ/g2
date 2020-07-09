import React, { useState } from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '../packages/styled';
import { Spacer, Surface } from '../packages/components';

function StoryDecorator(storyFn) {
	const [isDark, setIsDark] = useState(false);

	return <ThemeProvider theme={{ isDark }}>{storyFn()}</ThemeProvider>;
}

addDecorator(StoryDecorator);
