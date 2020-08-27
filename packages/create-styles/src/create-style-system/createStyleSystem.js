import * as compiler from '../compiler';
import { createStyleSystemElement } from './createStyleSystemElement';
import { generateTheme } from './generateTheme';
import { tags } from './tags';
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

	const core = {};
	const createStyledElement = (tagName) =>
		createStyleSystemElement(tagName, { baseStyles, globalStyles });

	for (const tagName of tags) {
		core[tagName] = createStyledElement(tagName);
	}

	return {
		core,
		compiler,
		get,
		createStyledElement: createStyledElement,
	};
}

export default createStyleSystem;
