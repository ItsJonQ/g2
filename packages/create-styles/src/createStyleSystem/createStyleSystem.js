import React from 'react';

import { ThemeProvider as BaseThemeProvider } from '../components/ThemeProvider';
import { createCompiler } from '../createCompiler';
import { createRootStore } from '../cssCustomProperties';
import { createCoreElement } from './createCoreElement';
import { createCoreElements } from './createCoreElements';
import { createStyledComponents } from './createStyledComponents';
import { generateTheme } from './generateTheme';
import { createToken, DEFAULT_STYLE_SYSTEM_OPTIONS, get } from './utils';

const defaultOptions = DEFAULT_STYLE_SYSTEM_OPTIONS;

/**
 * @template {Record<string, string | number>} TConfig
 * @template {Record<string, string | number>} TDarkConfig
 * @template {Record<string, string | number>} THCConfig
 * @template {Record<string, string | number>} TDarkHCConfig
 * @template {string} TGeneratedTokens
 * @typedef CreateStyleSystemObjects
 * @property {ReturnType<createCoreElements>} core A set of coreElements.
 * @property {ReturnType<createCompiler>} compiler The Style system compiler (a custom Emotion instance).
 * @property {(tagName: import('react').ComponentType) => ReturnType<createCoreElement>} createCoreElement A function to create a coreElement (with settings from the Style system).
 * @property {ReturnType<createCompiler>['css']} css A function to compile CSS styles.
 * @property {ReturnType<createCompiler>['cx']} cx A function to resolve + combine classNames.
 * @property {(tokenName: string) => string} createToken A function to generate a design token (CSS variable) used by the system.
 * @property {(value: keyof (TConfig & TDarkConfig & THCConfig & TDarkHCConfig) | TGeneratedTokens) => string} get The primary function to retrieve Style system variables.
 * @property {import('./createStyledComponents').CreateStyled} styled A set of styled components.
 * @property {import('react').ComponentType} View The base <View /> component.
 * @property {import('react').ComponentType<import('react').ComponentProps<BaseThemeProvider>>} ThemeProvider The component (Provider) used to adjust design tokens.
 * @property {import('../cssCustomProperties').RootStore} rootStore
 */

/**
 * @template {Record<string, string | number>} TConfig
 * @template {Record<string, string | number>} TDarkConfig
 * @template {Record<string, string | number>} THCConfig
 * @template {Record<string, string | number>} TDarkHCConfig
 * @template {string} TGeneratedTokens
 * @typedef CreateStyleSystemOptions
 * @property {import('create-emotion').ObjectInterpolation<any>} baseStyles
 * @property {TConfig} config
 * @property {TDarkConfig} darkModeConfig
 * @property {THCConfig} highContrastModeConfig
 * @property {TDarkHCConfig} darkHighContrastModeConfig
 * @property {import('../createCompiler').CreateCompilerOptions} [compilerOptions]

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
 * @template {Record<string, string | number>} TConfig
 * @template {Record<string, string | number>} TDarkConfig
 * @template {Record<string, string | number>} THCConfig
 * @template {Record<string, string | number>} TDarkHCConfig
 * @template {string} TGeneratedTokens
 * @param {CreateStyleSystemOptions<TConfig, TDarkConfig, THCConfig, TDarkHCConfig, TGeneratedTokens>} options Options to create a Style system with.
 * @returns {CreateStyleSystemObjects<TConfig, TDarkConfig, THCConfig, TDarkHCConfig, TGeneratedTokens>} A collection of functions and elements from the generated Style system.
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

	const rootStore = createRootStore(globalStyles.globalVariables);
	rootStore.setState(globalStyles.globalVariables);

	/**
	 * Compiler (Custom Emotion instance).
	 */
	const compiler = createCompiler({
		...compilerOptions,
		rootStore,
	});
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
	const _createCoreElement = (tagName) =>
		createCoreElement(tagName, { baseStyles, compiler, globalStyles });

	const View = core.div;

	/**
	 * An enhanced (base) ThemeProvider with injectGlobal from the custom Emotion instance.
	 */
	const ThemeProvider = (
		/** @type {import('react').ComponentProps<BaseThemeProvider>} */ props,
	) => (
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
		rootStore,
	};

	// @ts-ignore
	return styleSystem;
}

export default createStyleSystem;
