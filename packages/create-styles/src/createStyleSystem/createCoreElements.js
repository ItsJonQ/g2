import { createCoreElement } from './createCoreElement';
import { tags } from './tags';

/**
 * @typedef CreateCoreElementProps
 * @property {import('create-emotion').Interpolation[]} baseStyles Base styles for the coreElements.
 * @property {import('../createCompiler').Compiler} compiler The injectGlobal from the Style system's compiler.
 * @property {object} globalStyles Global styles for the coreElements.
 */

/** @typedef {Record<string, ReturnType<createCoreElement>>} CoreElements */

/**
 * Generates a set of coreElements based on React supported HTML tags.
 *
 * @param {CreateCoreElementProps} props Properties to create coreElements with.
 * @returns {CoreElements} A set of coreElements.
 */
export function createCoreElements({ baseStyles, compiler, globalStyles }) {
	/** @type {CoreElements} */
	const core = {};

	const _createStyledElement = (
		/** @type {string|React.Component} */ tagName) =>
		createCoreElement(tagName, { baseStyles, compiler, globalStyles });

	for (const tagName of tags) {
		core[tagName] = _createStyledElement(tagName);
	}

	return core;
}
