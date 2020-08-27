import * as compiler from '../style-system';
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

	for (const tagName of tags) {
		core[tagName] = createStyleSystemElement(tagName, {
			baseStyles,
			globalStyles,
		});
	}

	return { core, compiler, get };
}

export default createStyleSystem;
