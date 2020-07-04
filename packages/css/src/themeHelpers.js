import colorize from 'tinycolor2';

import { getThemeValueForKey } from './hooks/theme';
import { baseTheme } from './theme';
import { toPx } from './utils';

export function rgba(hexValue = '', alpha = 1) {
	const { b, g, r } = colorize(hexValue).toRgb();
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function createSpace(theme = baseTheme, gridBase = 4) {
	return (value = 0) => {
		const themeValue = getThemeValueForKey(theme, 'space', value);
		return themeValue ? toPx(themeValue) : toPx(value * gridBase);
	};
}

export function createFontSizes(theme = baseTheme) {
	return (value = 0) => {
		const themeValue = getThemeValueForKey(theme, 'fontSizes', value);
		return themeValue ? toPx(themeValue) : toPx(value);
	};
}
