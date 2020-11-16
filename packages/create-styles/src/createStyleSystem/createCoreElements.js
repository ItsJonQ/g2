import { createCoreElement } from './createCoreElement';
import { tags } from './tags';

/** @typedef {Record<keyof JSX.IntrinsicElements, import('./createCoreElement').PolymorphicComponent<{}, any>>} CoreElements */

/**
 * @typedef CreateCoreElementProps
 * @property {import('create-emotion').ObjectInterpolation<any>} baseStyles Base styles for the coreElements.
 * @property {import('../createCompiler').Compiler} compiler The injectGlobal from the Style system's compiler.
 * @property {import('./generateTheme').GenerateThemeResults} globalStyles Global styles for the coreElements.
 */

/**
 * Generates a set of coreElements based on React supported HTML tags.
 *
 * @param {CreateCoreElementProps} props Properties to create coreElements with.
 * @returns {CoreElements} A set of coreElements.
 */
export function createCoreElements({ baseStyles, compiler, globalStyles }) {
	/** @type {CoreElements} */
	// @ts-ignore We fill in the missing properties in the loop below
	const core = {};

	const _createStyledElement = (
		/** @type {keyof JSX.IntrinsicElements} */ tagName,
	) => createCoreElement(tagName, { baseStyles, compiler, globalStyles });

	for (const tagName of tags) {
		core[tagName] = _createStyledElement(tagName);
	}

	return core;
}
