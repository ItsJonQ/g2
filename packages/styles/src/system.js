import { createSystem, createSystemElement, tags } from './create-system';

export const system = createSystem();

for (const tagName of tags) {
	system[tagName] = createSystemElement(tagName);
}

export const { get } = system;

export default system;
