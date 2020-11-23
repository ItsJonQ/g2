import { is } from '@wp-g2/utils';
import { createContext, useContext, useRef } from 'react';

import {
	COLOR_BLIND_MODE_ATTR_PROP,
	DARK_MODE_ATTR_PROP,
	HIGH_CONTRAST_MODE_ATTR_PROP,
	REDUCED_MOTION_MODE_ATTR_PROP,
} from '../../create-style-system/constants';

export const ThemeProviderContext = createContext({
	isDark: null,
	isColorBlind: null,
	isReducedMotion: null,
	isHighContrast: null,
});

export const useThemeProviderContext = () => useContext(ThemeProviderContext);

/**
 * Combines parent ThemeProvider context values with the current ThemeProvider
 * context values. This mechanism allows for "mode" settings to cascade
 * throughout the React component render tree.
 */
export function useThemeProviderContextBridge(currentContextState = {}) {
	const parentThemeProviderContextState = useThemeProviderContext();
	const nextContextState = useRef({
		...parentThemeProviderContextState,
	}).current;

	for (const [key, value] of Object.entries(currentContextState)) {
		if (is.defined(value)) {
			nextContextState[key] = value;
		}
	}

	return nextContextState;
}

/**
 * Creates HTML attributes corresponding to ThemeProvider modes.
 */
export function useThemeProviderModeHtmlAttributes(currentContextState = {}) {
	const {
		isColorBlind,
		isDark,
		isHighContrast,
		isReducedMotion,
	} = currentContextState;

	const htmlAttrs = {};

	if (isDark) {
		htmlAttrs[DARK_MODE_ATTR_PROP] = 'dark';
	}
	if (isHighContrast) {
		htmlAttrs[HIGH_CONTRAST_MODE_ATTR_PROP] = true;
	}
	if (isColorBlind) {
		htmlAttrs[COLOR_BLIND_MODE_ATTR_PROP] = true;
	}
	if (isReducedMotion) {
		htmlAttrs[REDUCED_MOTION_MODE_ATTR_PROP] = true;
	}

	return htmlAttrs;
}
