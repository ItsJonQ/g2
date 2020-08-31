import { ThemeProvider as BaseThemeProvider } from 'emotion-theming';
import React, { useRef } from 'react';

import {
	useColorBlindMode,
	useDarkMode,
	useHighContrastMode,
	useReducedMotionMode,
	useThemeStyles,
} from './ThemeProvider.utils';

/**
 * @typedef ThemeProviderProps
 * @property {any} children Children to render.
 * @property {boolean} isGlobal Determines if the theme styles are rendered globally or scoped locally.
 * @property {boolean} isDark Determines if dark-mode styles should be rendered.
 * @property {boolean} isColorBlind Determines if color-blind-mode styles should be rendered.
 * @property {boolean} isReducedMotion Determines if reduced-motion-mode styles should be rendered.
 * @property {boolean} isHighContrast Determines if high-contrast-mode styles should be rendered.
 * @property {object} theme Custom theme properties.
 */

/**
 * The ThemeProvider for the Style system. This ThemeProvider uses Emotion's
 * ThemeProvider as a foundation, but enhances it with features provided by
 * the Style system, such as dark mode, high contrast mode, etc...
 *
 * An important feature this ThemeProvider accounts for is the ability to render
 * styles either globally (at the document/html level) or scoped.
 *
 * @example
 * ```jsx
 * <ThemeProvider isGlobal theme={{...}}>
 *   <Button>...</Button>
 * </ThemeProvider>
 * ```
 *
 * @param {ThemeProviderProps} props Props for the ThemeProvider.
 * @returns {React.Component} Children content wrapped with the <ThemeProvider />.
 */
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
