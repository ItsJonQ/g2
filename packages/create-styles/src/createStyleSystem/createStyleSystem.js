import React from 'react';

import { ThemeProvider as BaseThemeProvider } from '../components/ThemeProvider';
import { createCompiler } from '../createCompiler';
import { createCoreElement } from './createCoreElement';
import { createCoreElements } from './createCoreElements';
import { createStyledComponents } from './createStyledComponents';
import { generateTheme } from './generateTheme';
import { createToken, DEFAULT_STYLE_SYSTEM_OPTIONS, get } from './utils';

const defaultOptions = DEFAULT_STYLE_SYSTEM_OPTIONS;

/** @typedef {Record<string, string>} StyleConfiguration */

/**
 * @typedef CreateStyleSystemOptions
 * @property {any} [baseStyles] Base styles for the Style system.
 * @property {StyleConfiguration} config Default variables for the Style system.
 * @property {StyleConfiguration} darkModeConfig Dark mode variables for the Style system.
 * @property {StyleConfiguration} highContrastModeConfig High contrast mode variables for the Style system.
 * @property {StyleConfiguration} darkHighContrastModeConfig Dark high contrast variables for the Style system.
 * @property {object} [compilerOptions] Options for the compiler (Emotion).
 */

/**
 * @typedef CreateStyleSystemObjects
 * @property {import('./createCoreElements').CoreElements} core A set of coreElements.
 * @property {import('../createCompiler').Compiler} compiler The Style system compiler (a custom Emotion instance).
 * @property {typeof import('./createCoreElement').createCoreElement} createCoreElement A function to create a coreElement (with settings from the Style system).
 * @property {import('create-emotion').Emotion['css']} css A function to compile CSS styles.
 * @property {import('create-emotion').Emotion['cx']} cx A function to resolve + combine classNames.
 * @property {(tokenName: string) => string} createToken A function to generate a design token (CSS variable) used by the system.
 * @property {(value: string) => string} get The primary function to retrieve Style system variables.
 * @property {import('@emotion/styled').CreateStyled} styled A set of styled components.
 * @property {React.Component} View The base <View /> component.
 * @property {React.Component} ThemeProvider The component (Provider) used to adjust design tokens.
 */

/**
 * Creates a Style system using a set of baseStyles and configs.
 *
 * @example
 * ```js
 * const baseStyles = { background: 'blue' };
 * const blueStyleSystem = createStyleSystem({ baseStyles });
 * ```
 *
 * @param {CreateStyleSystemOptions} options Options to create a Style system with.
 * @returns {CreateStyleSystemObjects} A collection of functions and elements from the generated Style system.
 */
export function createStyleSystem(options = defaultOptions) {
	const {
		baseStyles,
		compilerOptions,
		config,
		darkHighContrastModeConfig,
		darkModeConfig,
		highContrastModeConfig,
	} = {
		...defaultOptions,
		...options,
	};

	const globalStyles = generateTheme({
		config,
		darkHighContrastModeConfig,
		darkModeConfig,
		highContrastModeConfig,
	});

	/**
	 * Compiler (Custom Emotion instance).
	 */

	const compiler = createCompiler(compilerOptions);
	const { css, cx } = compiler;

	/**
	 * Core elements.
	 *
	 * @example
	 * ```jsx
	 * <core.div />
	 * ```
	 */
	const core = createCoreElements({ baseStyles, compiler, globalStyles });

	/**
	 * Styled components.
	 *
	 * @example
	 * ```jsx
	 * const StyledDiv = styled.div``
	 *
	 * <StyledDiv />
	 * ```
	 */
	const styled = createStyledComponents({ compiler, core });

	/**
	 * Export prebound createCoreElement factory.
	 */
	const _createCoreElement = (/** @type {string|React.Component} */ tagName) =>
		createCoreElement(tagName, { baseStyles, compiler, globalStyles });

	const View = core.div;

	/**
	 * An enhanced (base) ThemeProvider with injectGlobal from the custom Emotion instance.
	 */
	const ThemeProvider = (/** @type {import('react').ComponentProps<BaseThemeProvider>} */ props) => (
		<BaseThemeProvider
			{...props}
			compiler={compiler}
			globalStyles={globalStyles}
		/>
	);

	const styleSystem = {
		compiler,
		core,
		createCoreElement: _createCoreElement,
		createToken,
		css,
		cx,
		get,
		styled,
		View,
		ThemeProvider,
	};

	return styleSystem;
}

export default createStyleSystem;
