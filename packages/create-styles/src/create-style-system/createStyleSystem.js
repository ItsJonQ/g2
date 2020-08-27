import * as compiler from '../compiler';
import { createCoreElement } from './createCoreElement';
import { createCoreElements } from './createCoreElements';
import { createStyledComponents } from './createStyledComponents';
import { generateTheme } from './generateTheme';
import { DEFAULT_STYLE_SYSTEM_OPTIONS, get } from './utils';

const defaultOptions = DEFAULT_STYLE_SYSTEM_OPTIONS;

export function createStyleSystem(options = defaultOptions) {
	const {
		baseStyles,
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
	 * Core elements.
	 * core.div
	 */
	const core = createCoreElements({ baseStyles, globalStyles });

	/**
	 * Styled elements.
	 * styled.div
	 */
	const styled = createStyledComponents({ compiler, core });

	/**
	 * Export prebound createCoreElement factory.
	 */
	const _createCoreElement = (tagName) =>
		createCoreElement(tagName, { baseStyles, globalStyles });

	const View = core.div;

	return {
		View,
		core,
		compiler,
		styled,
		get,
		createCoreElement: _createCoreElement,
	};
}

export default createStyleSystem;
