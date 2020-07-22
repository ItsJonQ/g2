import React, { useEffect } from 'react';
import { ThemeProvider as BaseThemeProvider } from 'theme-ui';

import { useThemeContext } from '../hooks';

function useDarkMode(isDark = false) {
	useEffect(() => {
		const html = document.documentElement;
		if (isDark) {
			html.setAttribute('data-system-ui-mode', 'dark');
		} else {
			html.setAttribute('data-system-ui-mode', 'light');
		}
	}, [isDark]);
}

export function ThemeProvider({ children, theme = {} }) {
	const mergedThemeProps = { ...useThemeContext().theme, ...theme };
	useDarkMode(mergedThemeProps.isDark);

	return (
		<BaseThemeProvider theme={mergedThemeProps}>
			{children}
		</BaseThemeProvider>
	);
}

export default ThemeProvider;
