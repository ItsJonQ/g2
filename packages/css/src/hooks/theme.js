import { useResponsiveValue as useBaseResponsiveValue } from '@theme-ui/match-media';
import { useThemeUI } from 'theme-ui';
import { is } from '@g2/utils';
import { toPx } from '../utils';
import { baseTheme } from '../theme';

export function useThemeContext() {
	const themeContext = useThemeUI() || {};

	return {
		...themeContext,
		theme: {
			...baseTheme,
			...themeContext.theme,
		},
	};
}

export function useTheme() {
	return useThemeContext().theme;
}

export function useResponsiveValue(values = 0) {
	const responsiveValues = useBaseResponsiveValue(values);
	return is.array(values) ? responsiveValues : values;
}

export function useSpacing(value) {
	const themeSpace = useThemeContext()?.theme?.space;
	const baseValue = useResponsiveValue(value);

	const values = is.array(themeSpace) ? themeSpace : [];
	const valuesEntry = values[baseValue];

	if (!is.defined(valuesEntry)) {
		return toPx(baseValue);
	}

	return valuesEntry;
}
