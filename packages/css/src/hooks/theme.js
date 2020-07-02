import { is } from '@g2/utils';
import { useResponsiveValue as useBaseResponsiveValue } from '@theme-ui/match-media';
import { useThemeUI } from 'theme-ui';

import { enhanceThemeWithMixins } from '../styled/utils';
import { baseTheme } from '../theme';
import { toPx } from '../utils';

export function useThemeContext() {
	const themeContext = useThemeUI() || {};
	const enhancedThemeContext = {
		...themeContext,
		theme: {
			...baseTheme,
			...themeContext.theme,
		},
	};

	enhancedThemeContext.theme = enhanceThemeWithMixins(
		enhancedThemeContext.theme,
	);

	return enhancedThemeContext;
}

export function useTheme() {
	return useThemeContext().theme;
}

export function useResponsiveValue(values = 0) {
	const responsiveValues = useBaseResponsiveValue(values);
	return is.array(values) ? responsiveValues : values;
}

export function useResponsiveValueForKey(key, value) {
	const themeKeys = useThemeContext()?.theme[key];
	const baseValue = useResponsiveValue(value);

	if (is.undefined(value)) {
		return value;
	}

	const values = is.array(themeKeys) ? themeKeys : [];
	const valuesEntry = values[baseValue];

	if (!is.defined(valuesEntry)) {
		return toPx(baseValue);
	}

	return valuesEntry;
}

export function useFontSize(value) {
	return useResponsiveValueForKey('fontSizes', value);
}

export function useSpacing(value) {
	return useResponsiveValueForKey('space', value);
}
