import { createCoreElement } from './createCoreElement';
import { tags } from './tags';

/**
 * @typedef CreateCoreElementProps
 * @property {object} baseStyles Base styles for the coreElements.
 * @property {function} injectGlobal The injectGlobal from the Style system's compiler.
 * @property {object} globalStyles Global styles for the coreElements.
 */

/**
 * Generates a set of coreElements based on React supported HTML tags.
 *
 * @param {CreateCoreElementProps} props Properties to create coreElements with.
 * @returns {object} A set of coreElements.
 */
export function createCoreElements({ baseStyles, compiler, globalStyles }) {
	const core = {};

	const _createStyledElement = (tagName) =>
		createCoreElement(tagName, { baseStyles, compiler, globalStyles });

	for (const tagName of tags) {
		core[tagName] = _createStyledElement(tagName);
	}

	return core;
}
