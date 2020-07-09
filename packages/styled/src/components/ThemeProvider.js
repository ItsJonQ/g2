import React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'theme-ui';

import { useThemeContext } from '../hooks';

export function ThemeProvider({ children, theme = {} }) {
	const mergedThemeProps = { ...useThemeContext().theme, ...theme };
	if (theme.isDark) {
		mergedThemeProps.config.isDark = theme.isDark;
	}

	return (
		<BaseThemeProvider theme={mergedThemeProps}>
			{children}
		</BaseThemeProvider>
	);
}

export default ThemeProvider;
