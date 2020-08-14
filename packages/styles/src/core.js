import {
	createStyleSystem,
	createStyleSystemElement,
	tags,
} from './create-style-system';

export const core = createStyleSystem();

for (const tagName of tags) {
	core[tagName] = createStyleSystemElement(tagName);
}

export const { get } = core;

export default core;
