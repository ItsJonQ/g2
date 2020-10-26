import { GetInterface, DesignTokens } from '../core';
import { ColorFunctionInterface } from '../presets/colors';
import { SpaceInterface } from '../presets/space';

/**
 * The default thme configuration for the Style system.
 */
type ThemeConfig = {
	[K in DesignTokens]: string;
};

/**
 * The custom theme config (`object`).
 */
type CreateThemeConfig = {
	[K in DesignTokens]?: string;
};

/**
 * Helper functions from the Style system.
 */
type CreateThemeProps = {
	/**
	 * Retrives a design token value from the style configuration.
	 */
	get: GetInterface;
	/**
	 * Creates a color value.
	 */
	color: ColorFunctionInterface;
	/**
	 * The default thme configuration for the Style system.
	 */
	theme: ThemeConfig;
	/**
	 * Calculates a value based on the grid system.
	 */
	space: SpaceInterface;
};

type CreateThemeFunction = (props: CreateThemeProps) => CreateThemeConfig;

/**
 * Creates a custom theme configuration for the Style System.
 * This configuration is to be passed into the `<ThemeProvider />`.
 *
 * To create a theme, pass in a (callback) function, which returns an `object`.
 * The callback function will be provided with several theme helpers.
 *
 * @example
 * ```jsx
 * import { createTheme, ThemeProvider } from `@wp-g2/styles`;
 *
 * const customTheme = createTheme((props) => {
 *  const {
 * 	get, // Variable getter
 * 	color, // Color utility
 * 	theme, // Default theme config
 * 	space // Space utility
 * } = props
 *
 *  return {
 *    colorAdmin: get('blueberry')
 *  }
 * })
 *
 * const Example = ({ children }) => {
 *  return (
 *    <>
 *      <ThemeProvider theme={customTheme} />
 *      {children}
 *    </>
 *   )
 * }
 * ```
 */
export const createTheme: (callback: CreateThemeFunction) => CreateThemeConfig;
