import { createCoreElement } from './createCoreElement';
import { tags } from './tags';

/**
 * @typedef CreateCoreElementProps
 * @property {Parameters<import('create-emotion').Emotion['css']>} baseStyles Base styles for the coreElements.
 * @property {import('../createCompiler').Compiler} compiler The injectGlobal from the Style system's compiler.
 * @property {import('./generateTheme').GenerateThemeResults} globalStyles Global styles for the coreElements.
 */

/**
 * Generates a set of coreElements based on React supported HTML tags.
 *
 * @param {CreateCoreElementProps} props Properties to create coreElements with.
 * @returns {object} A set of coreElements.
 */
export function createCoreElements({ baseStyles, compiler, globalStyles }) {
	const core = {};

	const _createStyledElement = (
		/** @type {string | import('react').ComponentType} */ tagName,
	) => createCoreElement(tagName, { baseStyles, compiler, globalStyles });

	for (const tagName of tags) {
		core[tagName] = _createStyledElement(tagName);
	}

	return core;
}
