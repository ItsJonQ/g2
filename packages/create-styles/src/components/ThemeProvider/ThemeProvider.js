import { ThemeProvider as BaseThemeProvider } from 'emotion-theming';
import React, { useRef } from 'react';

import {
	useColorBlindMode,
	useDarkMode,
	useHighContrastMode,
	useReducedMotionMode,
	useThemeStyles,
} from './ThemeProvider.utils';

function ThemeProvider({
	children,
	isGlobal = false,
	isDark,
	isColorBlind,
	isReducedMotion,
	isHighContrast,
	theme = {},
	...props
}) {
	const nodeRef = useRef();
	const themeStyles = useThemeStyles({ isGlobal, theme });

	useColorBlindMode({ isColorBlind, isGlobal, ref: nodeRef });
	useDarkMode({ isDark, isGlobal, ref: nodeRef });
	useHighContrastMode({ isGlobal, isHighContrast, ref: nodeRef });
	useReducedMotionMode({ isGlobal, isReducedMotion, ref: nodeRef });

	return (
		<BaseThemeProvider theme={theme}>
			<div
				{...props}
				data-system-theme-provider
				ref={nodeRef}
				style={themeStyles}
			>
				{children}
			</div>
		</BaseThemeProvider>
	);
}

export default ThemeProvider;
