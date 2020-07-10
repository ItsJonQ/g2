import React, { useState } from 'react';
import { addDecorator } from '@storybook/react';
import { ThemeProvider } from '../packages/styled';
import { Button, Spacer, Surface } from '../packages/components';

function StoryDecorator(storyFn) {
	const [isDark, setIsDark] = useState(false);

	return (
		<ThemeProvider theme={{ isDark }}>
			<Spacer m={0} p={2}>
				<Button size="small" onClick={() => setIsDark(!isDark)}>
					{isDark ? 'Set Light' : 'Set Dark'}
				</Button>
			</Spacer>
			{storyFn()}
			<Surface
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
