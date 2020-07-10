import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'theme-ui';

import { useThemeContext } from '../hooks';

export function ThemeProvider({ children, theme = {} }) {
	const mergedThemeProps = { ...useThemeContext().theme, ...theme };

	return (
		<BaseThemeProvider theme={mergedThemeProps}>
			{children}
		</BaseThemeProvider>
	);
}

export default ThemeProvider;
