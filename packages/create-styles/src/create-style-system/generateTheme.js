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

/**
 * @typedef GenerateThemeProps
 * @property {object} config Default theme config.
 * @property {object} darkModeConfig Dark mode theme config.
 * @property {object} highContrastModeConfig High contrast mode theme config.
 * @property {object} darkHighContrastModeConfig Dark high contrast mode theme config.
 */

/**
 * @typedef GenerateThemeResults
 * @property {object} theme A set of theme style references.
 * @property {object} globalVariables A set of global variables.
 * @property {string} globalCSSVariables The compiled CSS string for global variables.
 * @property {string} darkModeCSSVariables The compiled CSS string for global dark variables.
 * @property {string} highContrastModeCSSVariables The compiled CSS string for global high contrast variables.
 * @property {string} darkHighContrastModeCSSVariables The compiled CSS string for global dark high contrast variables.
 */

/**
 * Generates theme references and compiles CSS variables to be used by the Style System.
 *
 * @param {GenerateThemeProps} props Props to generate a Style system theme with.
 * @returns {GenerateThemeResults} A set of variables and content for the System.
 */
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
