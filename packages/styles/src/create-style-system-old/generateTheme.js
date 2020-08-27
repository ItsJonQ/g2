import {
	DARK_HIGH_CONTRAST_MODE_MODE_ATTR,
	DARK_MODE_ATTR,
	HIGH_CONTRAST_MODE_MODE_ATTR,
} from './constants';
import {
	transformValuesToReferences,
	transformValuesToVariables,
	transformValuesToVariablesString,
} from './utils';

export function generateTheme({
	config = {},
	darkModeConfig = {},
	highContrastModeConfig = {},
	darkHighContrastModeConfig = {},
}) {
	const theme = transformValuesToReferences(config);
	const globalVariables = transformValuesToVariables(config);
	const globalCSSVariables = transformValuesToVariablesString(
		':root',
		config,
	);

	const darkModeCSSVariables = transformValuesToVariablesString(
		DARK_MODE_ATTR,
		darkModeConfig,
	);

	const highContrastModeCSSVariables = transformValuesToVariablesString(
		HIGH_CONTRAST_MODE_MODE_ATTR,
		highContrastModeConfig,
	);

	const darkHighContrastModeCSSVariables = transformValuesToVariablesString(
		DARK_HIGH_CONTRAST_MODE_MODE_ATTR,
		darkHighContrastModeConfig,
	);

	return {
		theme,
		globalVariables,
		globalCSSVariables,
		darkModeCSSVariables,
		highContrastModeCSSVariables,
		darkHighContrastModeCSSVariables,
	};
}
