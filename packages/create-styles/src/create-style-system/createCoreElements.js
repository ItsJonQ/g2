import { createCoreElement } from './createCoreElement';
import { tags } from './tags';

export function createCoreElements({ baseStyles, globalStyles }) {
	const core = {};

	const _createStyledElement = (tagName) =>
		createCoreElement(tagName, { baseStyles, globalStyles });

	for (const tagName of tags) {
		core[tagName] = _createStyledElement(tagName);
	}

	return core;
}
